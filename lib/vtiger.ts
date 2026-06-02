import { digitsOnlyPhoneLast10, isValidIndiaPhone } from "@/lib/phone-in";

export type VtigerWebsiteFormSource = "Buyer" | "Vendors" | "Contact";

export type VtigerCaptureResult =
  | { ok: true; leadId?: string }
  | { ok: false; message: string };

/**
 * Splits full name for Vtiger Leads.
 * Single word → firstname empty, lastname only.
 */
export function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const trimmed = fullName.trim().replace(/\s+/g, " ");
  if (!trimmed) return { firstName: "", lastName: "" };
  const parts = trimmed.split(" ");
  if (parts.length === 1) {
    return { firstName: "", lastName: parts[0] };
  }
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Digits-only phone for Vtiger `mobile` (10-digit Indian numbers when valid). */
export function phoneForVtiger(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (isValidIndiaPhone(phone)) {
    return digitsOnlyPhoneLast10(phone);
  }
  return digits.slice(0, 20);
}

export function buildVtigerLeadPayload(
  fields: Record<string, string | undefined | null>
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(fields)) {
    if (value != null && String(value).trim() !== "") {
      out[key] = String(value).trim();
    }
  }
  return out;
}

export function isVtigerConfigured(): boolean {
  return Boolean(
    process.env.VTIGER_WEBHOOK_URL?.trim() && process.env.VTIGER_WEBHOOK_TOKEN?.trim()
  );
}

/** For health/admin checks — never exposes the token value. */
export function getVtigerEnvStatus(): {
  configured: boolean;
  hasUrl: boolean;
  hasToken: boolean;
} {
  const hasUrl = Boolean(process.env.VTIGER_WEBHOOK_URL?.trim());
  const hasToken = Boolean(process.env.VTIGER_WEBHOOK_TOKEN?.trim());
  return {
    configured: hasUrl && hasToken,
    hasUrl,
    hasToken,
  };
}

function resolveWebhookUrl(): string | null {
  const base = process.env.VTIGER_WEBHOOK_URL?.trim();
  const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
  const queryParam = process.env.VTIGER_WEBHOOK_TOKEN_QUERY_PARAM?.trim();
  if (!base || !token) return null;

  if (!queryParam) return base;

  const url = new URL(base);
  url.searchParams.set(queryParam, token);
  return url.toString();
}

/** Matches VTAP API Designer example (JSON body + Token header). */
export const VTIGER_JSON_CONTENT_TYPE = "application/json; charset=UTF-8";

function buildRequestHeaders(includeToken: boolean): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": VTIGER_JSON_CONTENT_TYPE,
  };

  if (!includeToken) return headers;

  const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
  const queryParam = process.env.VTIGER_WEBHOOK_TOKEN_QUERY_PARAM?.trim();
  const headerName = process.env.VTIGER_WEBHOOK_TOKEN_HEADER?.trim() || "Token";

  if (token && !queryParam) {
    headers[headerName] = token;
  }

  return headers;
}

function encodeVtigerBody(payload: Record<string, string>): string {
  return JSON.stringify(payload);
}

/**
 * POST lead fields to the VTAP incoming webhook (same as API Designer fetch example).
 */
export async function captureVtigerLead(
  fields: Record<string, string | undefined | null>
): Promise<VtigerCaptureResult> {
  const url = resolveWebhookUrl();
  if (!url) {
    return { ok: false, message: "Vtiger is not configured" };
  }

  const payload = buildVtigerLeadPayload(fields);
  if (!payload.email) {
    return { ok: false, message: "Email is required for Vtiger lead capture" };
  }

  const headers = buildRequestHeaders(true);
  const body = encodeVtigerBody(payload);

  if (process.env.DEBUG_VTIGER === "true") {
    console.log("[Vtiger] debug:", {
      url: url.replace(/([?&][^=]+)=([^&]+)/g, "$1=***"),
      headerKeys: Object.keys(headers),
      fieldCount: Object.keys(payload).length,
      keys: Object.keys(payload),
    });
  }

  console.log(
    `[Vtiger] POST ${url.replace(/([?&][^=]+)=([^&]+)/g, "$1=***")} (email: ${payload.email})`
  );

  const res = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  const rawText = await res.text();

  if (!res.ok) {
    return {
      ok: false,
      message: rawText.trim() || res.statusText || `HTTP ${res.status}`,
    };
  }

  if (rawText.trim()) {
    try {
      const json = JSON.parse(rawText) as {
        success?: boolean;
        result?: { id?: string };
        error?: string;
        message?: string;
      };
      if (json.success === false) {
        return { ok: false, message: json.error || json.message || rawText.slice(0, 800) };
      }
      return { ok: true, leadId: json.result?.id };
    } catch {
      // Non-JSON success bodies are OK.
    }
  }

  return { ok: true };
}

export async function syncVtigerLead(
  fields: Record<string, string | undefined | null>
): Promise<VtigerCaptureResult> {
  const status = getVtigerEnvStatus();
  const email = fields.email?.trim() || "(no email)";

  if (!status.configured) {
    const message = "VTIGER_WEBHOOK_URL or VTIGER_WEBHOOK_TOKEN not set in server env";
    console.warn(`[Vtiger] NOT calling webhook for ${email} — ${message}`);
    return { ok: false, message };
  }

  const result = await captureVtigerLead(fields);
  if (result.ok) {
    console.log(
      `[Vtiger] capture ok for ${email}${result.leadId ? ` (id: ${result.leadId})` : ""}`
    );
  } else {
    console.error(`[Vtiger] capture failed for ${email}:`, result.message);
  }
  return result;
}
