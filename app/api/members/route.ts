import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  captureLeadSquaredLead,
  isLeadSquaredConfigured,
  splitFullName,
  type LeadSquaredAttribute,
} from "@/lib/leadsquared";

/**
 * LeadSquared `Source` — must match an allowed picklist value.
 * (Distinct from buyer `Website` / vendor `Vendor Website`.)
 */
const MEMBERSHIP_LEAD_SOURCE = "Membership Website";

/**
 * Maps the “Get Membership” form to LeadSquared:
 * Full name → FirstName; Company → Company; Role → mx_Role;
 * Your SaaS Need → Requirement → `mx_Requirement` (same schema as buyer “looking for”);
 * Work email → standard `EmailAddress` (what the CRM “Email” column uses) and `mx_EmailAddress` if that custom field exists.
 */
export async function POST(req: Request) {
  try {
    const { fullName, company, role, email, saasNeed } = await req.json();

    if (!fullName || !company || !role || !email) {
      return NextResponse.json(
        { error: "Full name, company, role, and email are required." },
        { status: 400 }
      );
    }

    const member = await prisma.member.upsert({
      where: { email },
      update: { fullName, company, role },
      create: { fullName, company, role, email },
    });

    if (isLeadSquaredConfigured()) {
      const { firstName, lastName } = splitFullName(String(fullName));
      const saasNeedStr =
        typeof saasNeed === "string" ? saasNeed.trim() : "";
      const emailTrimmed = String(email).trim();

      const fullAttributes: LeadSquaredAttribute[] = [
        { Attribute: "FirstName", Value: firstName },
        { Attribute: "LastName", Value: lastName },
        { Attribute: "EmailAddress", Value: emailTrimmed },
        { Attribute: "Company", Value: String(company) },
        { Attribute: "mx_Role", Value: String(role) },
        { Attribute: "mx_Requirement", Value: saasNeedStr },
        { Attribute: "mx_EmailAddress", Value: emailTrimmed },
        { Attribute: "Source", Value: MEMBERSHIP_LEAD_SOURCE },
      ];

      const skipCustom = process.env.LEADSQUARED_SKIP_CUSTOM_FIELDS === "true";
      const attributes: LeadSquaredAttribute[] = skipCustom
        ? [
            { Attribute: "FirstName", Value: firstName },
            { Attribute: "LastName", Value: lastName },
            { Attribute: "Company", Value: String(company) },
            { Attribute: "EmailAddress", Value: String(email).trim() },
          ]
        : fullAttributes;

      const lsq = await captureLeadSquaredLead(attributes);
      if (!lsq.ok) {
        console.error("LeadSquared capture failed:", lsq.message);
      }
    } else {
      console.warn("LeadSquared: skipping capture (LEADSQUARED_HOST / keys not set)");
    }

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("Failed to save member", error);
    return NextResponse.json(
      { error: "Unable to save membership right now. Please try again." },
      { status: 500 }
    );
  }
}
