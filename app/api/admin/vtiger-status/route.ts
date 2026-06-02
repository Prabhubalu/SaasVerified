import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getVtigerEnvStatus } from "@/lib/vtiger";

export const dynamic = "force-dynamic";

function isAdminAuthorized(req: Request): boolean {
  const expected = process.env.ADMIN_TOKEN ?? "admin-dev-token";
  if (cookies().get("admin-auth")?.value === expected) return true;
  const auth = req.headers.get("authorization");
  return auth === `Bearer ${expected}`;
}

/** GET /api/admin/vtiger-status — is the running app seeing VTIGER_* env? */
export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const status = getVtigerEnvStatus();
  const host = process.env.VTIGER_WEBHOOK_URL?.trim()
    ? new URL(process.env.VTIGER_WEBHOOK_URL.trim()).host
    : null;

  return NextResponse.json({
    ...status,
    webhookHost: host,
    hint: status.configured
      ? "Env OK — submit a form and check logs for [Vtiger] POST"
      : "Set VTIGER_WEBHOOK_URL and VTIGER_WEBHOOK_TOKEN in .env, then: pm2 delete saasverified && pm2 start ecosystem.config.cjs",
  });
}
