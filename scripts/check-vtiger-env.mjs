/**
 * What does Node see for VTIGER_*? Run: node scripts/check-vtiger-env.mjs
 */
import { loadProjectEnv } from "./load-env.mjs";

loadProjectEnv();

const url = process.env.VTIGER_WEBHOOK_URL?.trim();
const token = process.env.VTIGER_WEBHOOK_TOKEN?.trim();

console.log("VTIGER_WEBHOOK_URL set:", Boolean(url), url ? new URL(url).host : "");
console.log("VTIGER_WEBHOOK_TOKEN set:", Boolean(token), token ? `(length ${token.length})` : "");
console.log(
  url && token
    ? "OK — app should call Vtiger when forms submit (if PM2 uses ecosystem.config.cjs)."
    : "MISSING — add to .env and restart PM2 with ecosystem.config.cjs"
);
