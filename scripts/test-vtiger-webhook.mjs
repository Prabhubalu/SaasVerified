/**
 * Run: node --env-file=.env scripts/test-vtiger-webhook.mjs
 * Tests Vtiger createleads webhook auth (header Token + urlencoded) and prints your public IP for allowlisting.
 */

const url = process.env.VTIGER_WEBHOOK_URL?.trim();
const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
const headerName = process.env.VTIGER_WEBHOOK_TOKEN_HEADER?.trim() || "Token";

if (!url || !token) {
  console.error("Set VTIGER_WEBHOOK_URL and VTIGER_WEBHOOK_TOKEN in .env");
  process.exit(1);
}

const email = `vtiger-script-test-${Date.now()}@example.com`;
const body = new URLSearchParams({
  firstname: "Script",
  lastname: "Test",
  email,
  company: "Test Co",
  cf_leads_websiteformsource: "Buyer",
}).toString();

async function tryPost(label, targetUrl, headers) {
  const res = await fetch(targetUrl, { method: "POST", headers, body });
  const text = await res.text();
  const statusLine = res.statusText || "";
  console.log(
    `${label}: HTTP ${res.status} ${statusLine}${text ? ` — ${text.slice(0, 120)}` : " (empty body)"}`
  );
  return res.ok;
}

async function main() {
  let ip = "?";
  try {
    const ipRes = await fetch("https://api.ipify.org");
    ip = (await ipRes.text()).trim();
  } catch {
    /* ignore */
  }
  console.log("Public IP (add to Vtiger Security allowlist if enabled):", ip);
  console.log("Token length in .env:", token.length, "(re-copy from Documentation after Regenerate + Publish)");
  console.log("Webhook URL:", url);
  console.log("Testing email:", email);

  const headerOk = await tryPost("Header auth", url, {
    "Content-Type": "application/x-www-form-urlencoded",
    [headerName]: token,
  });

  if (!headerOk) {
    for (const param of ["Token", "token"]) {
      const u = new URL(url);
      u.searchParams.set(param, token);
      const ok = await tryPost(`Query ?${param}=`, u.toString(), {
        "Content-Type": "application/x-www-form-urlencoded",
      });
      if (ok) break;
    }
  }

  console.log(`
All methods failed — this is a Vtiger Security issue, not the website code.

Checklist (createleads → Security):
  1. IP allowlist: add ${ip} OR remove all IPs for dev
  2. Regenerate token → Save → Publish → paste new token into VTIGER_WEBHOOK_TOKEN
  3. Token mode must match docs: header "Token" OR URL param (try VTIGER_WEBHOOK_TOKEN_QUERY_PARAM=Token)
  4. Playground → Start listening → run this script again; request must appear in Vtiger
`);
  process.exitCode = 1;
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
