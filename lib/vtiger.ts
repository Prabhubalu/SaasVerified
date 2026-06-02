import { digitsOnlyPhoneLast10, isValidIndiaPhone } from "@/lib/phone-in";

export type VtigerWebsiteFormSource = "Buyer" | "Vendors" | "Contact";

export type VtigerCaptureResult =
  | { ok: true }
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

function vtigerAuthMode(): "query" | "header" | "none" {
  const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
  if (!token) return "none";
  if (process.env.VTIGER_WEBHOOK_TOKEN_QUERY_PARAM?.trim()) return "query";
  return "header";
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

function vtigerAuthHint(): string {
  const mode = vtigerAuthMode();
  const headerName = process.env.VTIGER_WEBHOOK_TOKEN_HEADER?.trim() || "Token";
  const queryParam = process.env.VTIGER_WEBHOOK_TOKEN_QUERY_PARAM?.trim() || "token";

  if (mode === "query") {
    return `Token sent as URL query param "${queryParam}". In Vtiger API Designer → createleads → Security, confirm parameter mode and name match.`;
  }
  if (mode === "header") {
    return `Token sent as header "${headerName}" with JSON body. In API Designer → Security: confirm header mode, copy a fresh token after Publish, and clear or update the IP allowlist.`;
  }
  return "Set VTIGER_WEBHOOK_TOKEN in .env.";
}

async function fetchEgressIpForAllowlist(): Promise<string | null> {
  try {
    const res = await fetch("https://api.ipify.org", {
      signal: AbortSignal.timeout(4000),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const ip = (await res.text()).trim();
    return ip || null;
  } catch {
    return null;
  }
}

/** Alternate auth attempts when CRM returns "authentication failed". */
function vtigerAuthAttempts(): { url: string; headers: Record<string, string> }[] {
  const base = process.env.VTIGER_WEBHOOK_URL?.trim();
  const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
  if (!base || !token) return [];

  const headerName = process.env.VTIGER_WEBHOOK_TOKEN_HEADER?.trim() || "Token";
  const queryParam = process.env.VTIGER_WEBHOOK_TOKEN_QUERY_PARAM?.trim();
  const attempts: { url: string; headers: Record<string, string> }[] = [];
  const seen = new Set<string>();

  const add = (url: string, headers: Record<string, string>) => {
    const key = `${url}::${JSON.stringify(headers)}`;
    if (seen.has(key)) return;
    seen.add(key);
    attempts.push({ url, headers });
  };

  add(resolveWebhookUrl()!, buildRequestHeaders(true));

  if (!queryParam) {
    for (const param of ["Token", "token"]) {
      const url = new URL(base);
      url.searchParams.set(param, token);
      add(url.toString(), buildRequestHeaders(false));
    }
  }

  if (queryParam) {
    add(resolveWebhookUrl()!, buildRequestHeaders(true));
  }

  return attempts;
}

/**
 * POST lead fields to the VTAP incoming webhook (create/update by email on CRM side).
 */
export async function captureVtigerLead(
  fields: Record<string, string | undefined | null>
): Promise<VtigerCaptureResult> {
  if (!resolveWebhookUrl()) {
    return { ok: false, message: "Vtiger is not configured" };
  }

  const payload = buildVtigerLeadPayload(fields);
  if (!payload.email) {
    return { ok: false, message: "Email is required for Vtiger lead capture" };
  }

  const body = encodeVtigerBody(payload);
  const attempts = vtigerAuthAttempts();

  if (process.env.DEBUG_VTIGER === "true") {
    console.log("[Vtiger] debug:", {
      authMode: vtigerAuthMode(),
      attemptCount: attempts.length,
      fieldCount: Object.keys(payload).length,
      keys: Object.keys(payload),
    });
  }

  let lastMessage = "";

  for (let i = 0; i < attempts.length; i++) {
    const { url, headers } = attempts[i];

    if (process.env.DEBUG_VTIGER === "true") {
      console.log("[Vtiger] attempt", i + 1, {
        url: url.replace(/([?&][^=]+)=([^&]+)/g, "$1=***"),
        headerKeys: Object.keys(headers),
      });
    }

    const res = await fetch(url, {
      method: "POST",
      headers,
      body,
    });

    const rawText = await res.text();

    if (res.ok) {
      if (rawText.trim()) {
        try {
          const json = JSON.parse(rawText) as {
            success?: boolean;
            error?: string;
            message?: string;
          };
          if (json.success === false) {
            lastMessage = json.error || json.message || rawText.slice(0, 800);
            continue;
          }
        } catch {
          // Non-JSON success bodies are OK.
        }
      }
      if (i > 0) {
        console.log(`[Vtiger] capture succeeded on auth fallback attempt ${i + 1}/${attempts.length}`);
      }
      return { ok: true };
    }

    lastMessage = rawText.trim() || res.statusText || `HTTP ${res.status}`;
    if (!/authentication failed/i.test(lastMessage)) {
      return { ok: false, message: lastMessage };
    }
  }

  return { ok: false, message: lastMessage || "authentication failed" };
}

export async function syncVtigerLead(
  fields: Record<string, string | undefined | null>
): Promise<void> {
  if (!isVtigerConfigured()) {
    console.warn("Vtiger: skipping capture (VTIGER_WEBHOOK_URL / VTIGER_WEBHOOK_TOKEN not set)");
    return;
  }

  const result = await captureVtigerLead(fields);
  if (!result.ok) {
    const authFailed = /authentication failed/i.test(result.message);
    if (authFailed) {
      const ip = await fetchEgressIpForAllowlist();
      console.error(
        "Vtiger capture failed:",
        result.message,
        `(${vtigerAuthHint()}`,
        ip
          ? `Allowlist this public IP in API Designer → Security if restrictions are enabled: ${ip})`
          : "Check API Designer → Security → IP allowlist and use a fresh token from Documentation after Publish.)"
      );
    } else {
      console.error("Vtiger capture failed:", result.message);
    }
  }
}
