import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { captureVtigerLead, isVtigerConfigured } from "@/lib/vtiger";
import { buyerToVtigerFields } from "@/lib/vtiger-buyer";

export const dynamic = "force-dynamic";

function isAdminAuthorized(req: Request): boolean {
  const expected = process.env.ADMIN_TOKEN ?? "admin-dev-token";
  const cookie = cookies().get("admin-auth")?.value;
  if (cookie === expected) return true;

  const auth = req.headers.get("authorization");
  if (auth === `Bearer ${expected}`) return true;

  return false;
}

/**
 * Simulate a buyer → Vtiger webhook call (admin only).
 * POST /api/admin/test-vtiger
 * Optional JSON body overrides sample fields.
 */
export async function POST(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const configured = isVtigerConfigured();
  const webhookHost = process.env.VTIGER_WEBHOOK_URL?.trim()
    ? new URL(process.env.VTIGER_WEBHOOK_URL.trim()).host
    : null;

  let overrides: Record<string, string> = {};
  try {
    const json = await req.json();
    if (json && typeof json === "object") {
      overrides = json as Record<string, string>;
    }
  } catch {
    /* use sample payload */
  }

  const sample = buyerToVtigerFields({
    fullName: overrides.fullName ?? "Vtiger Test User",
    email: overrides.email ?? `vtiger-admin-test-${Date.now()}@example.com`,
    company: overrides.company ?? "Test Company",
    role: overrides.role ?? "Founder / CXO",
    lookingFor: overrides.lookingFor ?? "CRM",
    companySize: overrides.companySize ?? "1–10",
    decisionTimeline: overrides.decisionTimeline ?? "0–30 days",
    phoneNumber: overrides.phoneNumber ?? "9876543210",
    stateName: overrides.stateName ?? "Karnataka",
    cityName: overrides.cityName ?? "Bengaluru",
  });

  if (!configured) {
    return NextResponse.json({
      configured: false,
      message: "VTIGER_WEBHOOK_URL or VTIGER_WEBHOOK_TOKEN missing in server .env",
      payload: sample,
    });
  }

  const result = await captureVtigerLead(sample);

  return NextResponse.json({
    configured: true,
    webhookHost,
    payload: sample,
    vtiger: result,
  });
}
