export type LeadSquaredAttribute = {
  Attribute: string;
  Value: string;
};

export type LeadSquaredCaptureResult =
  | { ok: true; leadId?: string }
  | { ok: false; message: string };

function getLeadSquaredBaseUrl(): string | null {
  const raw = process.env.LEADSQUARED_HOST?.trim();
  if (!raw) return null;
  let host = raw.replace(/^https?:\/\//, "").replace(/\/$/, "");
  // Docs often show "https://api-xx.leadsquared.com/v2/" — strip /v2 so we don't duplicate
  // (final URL is always .../v2/LeadManagement.svc/Lead.Capture).
  host = host.replace(/\/v2\/?$/i, "");
  return `https://${host}`;
}

/** LeadSquared access keys are ~30+ chars; shorter values are almost always a broken `$` expansion. */
const MIN_ACCESS_KEY_LENGTH = 20;

/**
 * Next.js expands `$VAR` inside .env — e.g. u$r81540... becomes just "u".
 * Use LEADSQUARED_ACCESS_KEY_B64 (full key, base64) or escape every `$` as `\$` in LEADSQUARED_ACCESS_KEY.
 */
function getLeadSquaredAccessKey(): string | null {
  const b64Raw =
    process.env.LEADSQUARED_ACCESS_KEY_B64?.trim() ||
    process.env.LEADSQUARED_ACCESS_KEY_BASE64?.trim();
  if (b64Raw) {
    try {
      const decoded = Buffer.from(b64Raw, "base64").toString("utf8").trim();
      if (decoded.length >= MIN_ACCESS_KEY_LENGTH) {
        return decoded;
      }
      console.error(
        "[LeadSquared] LEADSQUARED_ACCESS_KEY_B64 decodes to a string that is too short — you likely base64-encoded only part of the key. Encode the full access key from LeadSquared."
      );
      return null;
    } catch {
      console.error("[LeadSquared] LEADSQUARED_ACCESS_KEY_B64 is not valid base64.");
      return null;
    }
  }

  const plain = process.env.LEADSQUARED_ACCESS_KEY?.trim();
  if (!plain) return null;

  if (plain.length < MIN_ACCESS_KEY_LENGTH) {
    console.error(
      "[LeadSquared] LEADSQUARED_ACCESS_KEY is still truncated by Next.js (`$` expansion). " +
        "Remove LEADSQUARED_ACCESS_KEY and add LEADSQUARED_ACCESS_KEY_B64=<base64 of full key>. " +
        'Generate: node -e \'console.log(Buffer.from("PASTE_FULL_KEY_FROM_LEADSQUARED").toString("base64"))\''
    );
    return null;
  }

  return plain;
}

export function leadSquaredAccessKeySource(): "b64" | "plain" | "none" {
  if (process.env.LEADSQUARED_ACCESS_KEY_B64?.trim() || process.env.LEADSQUARED_ACCESS_KEY_BASE64?.trim()) {
    return "b64";
  }
  const plain = process.env.LEADSQUARED_ACCESS_KEY?.trim();
  if (plain && plain.length >= MIN_ACCESS_KEY_LENGTH) return "plain";
  return "none";
}

export function isLeadSquaredConfigured(): boolean {
  return Boolean(
    getLeadSquaredBaseUrl() && getLeadSquaredAccessKey() && process.env.LEADSQUARED_SECRET_KEY?.trim()
  );
}

/**
 * Splits "First Last" → FirstName / LastName for LeadSquared.
 */
export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(" ");
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: "-" };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/**
 * POST Lead.Capture — https://apidocs.leadsquared.com/capture-lead/
 */
export async function captureLeadSquaredLead(
  attributes: LeadSquaredAttribute[]
): Promise<LeadSquaredCaptureResult> {
  const base = getLeadSquaredBaseUrl();
  const accessKey = getLeadSquaredAccessKey();
  const secretKey = process.env.LEADSQUARED_SECRET_KEY?.trim();
  if (!base || !accessKey || !secretKey) {
    return { ok: false, message: "LeadSquared is not configured" };
  }

  const fromB64 = leadSquaredAccessKeySource() === "b64";

  if (process.env.DEBUG_LEADSQUARED === "true") {
    console.log("[LeadSquared] debug (no secrets):", {
      host: base,
      accessKeyFromBase64: fromB64,
      accessKeyLength: accessKey.length,
      secretKeyLength: secretKey.length,
      accessKeyHasDollar: accessKey.includes("$"),
      attributeCount: attributes.length,
    });
  }

  // Send keys in query string (URLSearchParams encodes $, &, =) and in headers (docs recommend headers).
  const url = new URL(`${base}/v2/LeadManagement.svc/Lead.Capture`);
  url.searchParams.set("accessKey", accessKey);
  url.searchParams.set("secretKey", secretKey);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-LSQ-AccessKey": accessKey,
      "x-LSQ-SecretKey": secretKey,
    },
    body: JSON.stringify(attributes),
  });

  const rawText = await res.text();
  let json: {
    Status?: string;
    Message?: { Id?: string; RelatedId?: string; IsCreated?: boolean };
    ExceptionMessage?: string;
    [key: string]: unknown;
  } = {};

  try {
    if (rawText.trim()) {
      json = JSON.parse(rawText) as typeof json;
    }
  } catch {
    return {
      ok: false,
      message: `HTTP ${res.status} — non-JSON body: ${rawText.slice(0, 500)}`,
    };
  }

  const statusOk =
    typeof json.Status === "string" && json.Status.toLowerCase() === "success";

  if (!res.ok) {
    return {
      ok: false,
      message:
        json.ExceptionMessage ||
        (rawText ? rawText.slice(0, 800) : `HTTP ${res.status} ${res.statusText}`),
    };
  }

  if (!statusOk) {
    const detail =
      json.ExceptionMessage ||
      (typeof json.Errors === "object" && json.Errors !== null
        ? JSON.stringify(json.Errors)
        : null) ||
      (rawText ? rawText.slice(0, 1200) : "Empty response from LeadSquared");
    return { ok: false, message: detail };
  }

  return { ok: true, leadId: json.Message?.Id };
}
