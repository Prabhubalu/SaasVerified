const fs = require("fs");
const path = require("path");

/** Load .env into a plain object (for PM2 — Next does not always see .env under pm2). */
function parseEnvFile(filename) {
  const filePath = path.join(__dirname, filename);
  const env = {};
  if (!fs.existsSync(filePath)) return env;

  for (const line of fs.readFileSync(filePath, "utf8").split("\n")) {
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
    env[key] = value;
  }
  return env;
}

const dotenv = {
  ...parseEnvFile(".env"),
  ...parseEnvFile(".env.production"),
  ...parseEnvFile(".env.local"),
  ...parseEnvFile(".env.production.local"),
};

/**
 * PM2 config — injects .env into the Node process so VTIGER_* (and DATABASE_URL, etc.) are available.
 * Start: pm2 start ecosystem.config.cjs
 */
module.exports = {
  apps: [
    {
      name: "saasverified",
      cwd: __dirname,
      script: "node_modules/next/dist/bin/next",
      args: "start",
      interpreter: "none",
      env: {
        NODE_ENV: "production",
        ...dotenv,
      },
    },
  ],
};
