import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Minimal .env loader for Node 18 (no --env-file flag). Does not override existing env vars.
 */
export function loadEnvFile(envPath) {
  const resolved = path.resolve(envPath);
  if (!fs.existsSync(resolved)) return false;

  const content = fs.readFileSync(resolved, "utf8");
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (process.env[key] === undefined) {
      process.env[key] = value;
    }
  }

  return true;
}

/** Load project root .env when run from scripts/*.mjs */
export function loadProjectEnv() {
  const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
  loadEnvFile(path.join(root, ".env"));
}
