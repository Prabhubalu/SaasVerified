/**
 * Byte-for-byte same request as the working browser snippet (API Designer example).
 * Run on server: node scripts/test-vtiger-exact-browser.mjs
 */
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();
if (!token) {
  console.error("Missing VTIGER_WEBHOOK_TOKEN in .env");
  process.exit(1);
}

const email = `test-${Date.now()}@test.com`;

const res = await fetch(
  "https://saasverify.od2.vtiger.com/restapi/vtap/webhook/createleads",
  {
    method: "POST",
    headers: {
      Token: token,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      lastname: "Test",
      email,
      designation: "Other",
      mobile: "9999900000",
      state: "Karnataka",
      city: "Bengaluru",
      cf_leads_whatareyoulookingfor: "Accounting",
      cf_leads_companysize: "1–10",
      cf_leads_decisiontimeline: "0–30 days",
      cf_leads_websiteformsource: "Buyer",
    }),
  }
);

const text = await res.text();

console.log("HTTP", res.status, res.statusText);
console.log("Body:", text || "(empty)");

if (!res.ok) {
  console.log(
    "\nFix in Vtiger: API Designer → createleads → Security — remove IP/domain restrictions, Save, Publish. See docs/VTIGER_WEBHOOK.md"
  );
  process.exit(1);
}

console.log("\nSuccess — app code uses the same fetch shape.");
