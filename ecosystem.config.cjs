/**
 * PM2 config — always runs Next from the repo root so `.env` is loaded by Next.js.
 * Start: pm2 start ecosystem.config.cjs
 * Restart: pm2 restart saasverified
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
      },
    },
  ],
};
