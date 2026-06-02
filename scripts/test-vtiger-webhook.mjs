/**
 * Run from project root: node scripts/test-vtiger-webhook.mjs
 * Matches VTAP API Designer fetch example (JSON + Token header).
 */
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const url = process.env.VTIGER_WEBHOOK_URL?.trim();
const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
const headerName = process.env.VTIGER_WEBHOOK_TOKEN_HEADER?.trim() || "Token";

if (!url || !token) {
  console.error("Set VTIGER_WEBHOOK_URL and VTIGER_WEBHOOK_TOKEN in .env");
  process.exit(1);
}

const email = `vtiger-script-test-${Date.now()}@example.com`;
const body = JSON.stringify({
  lastname: "Test",
  firstname: "Script",
  email,
  designation: "Other",
  mobile: "9999900000",
  state: "Karnataka",
  city: "Bengaluru",
  cf_leads_whatareyoulookingfor: "Accounting",
  cf_leads_companysize: "1–10",
  cf_leads_decisiontimeline: "0–30 days",
  cf_leads_websiteformsource: "Buyer",
});

async function tryPost(label, targetUrl, headers) {
  const res = await fetch(targetUrl, {
    method: "POST",
    headers,
    body,
  });
  const text = await res.text();
  console.log(
    `${label}: HTTP ${res.status} ${res.statusText}${text ? ` — ${text.slice(0, 200)}` : " (empty body)"}`
  );
  return res.ok;
}

async function main() {
  console.log("Webhook URL:", url);
  console.log("Testing email:", email);

  const ok = await tryPost("JSON + Token header", url, {
    "Content-Type": "application/json; charset=UTF-8",
    [headerName]: token,
  });

  if (!ok) {
    console.log(
      "\nIf this fails: Vtiger → API Designer → createleads → Security — clear IP/domain restrictions, Regenerate token, Save, Publish. See docs/VTIGER_WEBHOOK.md"
    );
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
