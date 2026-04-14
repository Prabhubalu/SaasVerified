import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";
import {
  captureLeadSquaredLead,
  isLeadSquaredConfigured,
  splitFullName,
  type LeadSquaredAttribute,
} from "@/lib/leadsquared";
import { digitsOnlyPhoneLast10, isValidIndiaPhone } from "@/lib/phone-in";

const applySchema = z.object({
  productName: z.string().min(1),
  websiteUrl: z.string().min(1),
  category: z.string().min(1),
  targetAudience: z.string().min(1),
  contactName: z.string().min(1),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(1),
  pricingModel: z.string().min(1),
});

/** LeadSquared `Source` — fixed value for CRM picklists / reporting. */
const VENDOR_LEAD_SOURCE = "Vendor Website";

function phoneForLeadSquared(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (isValidIndiaPhone(phone)) {
    return digitsOnlyPhoneLast10(phone);
  }
  return digits.slice(0, 20);
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = applySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    const {
      productName,
      websiteUrl,
      category,
      targetAudience,
      contactName,
      emailAddress,
      phoneNumber,
      pricingModel,
    } = parsed.data;

    const vendorApplication = await prisma.vendorApplication.create({
      data: {
        productName,
        websiteUrl,
        category,
        targetAudience,
        contactName,
        emailAddress,
        phoneNumber,
        pricingModel,
      },
    });

    await sendFormNotification({
      title: "New Vendor Application",
      subject: `Vendor Application: ${productName}`,
      fields: [
        { label: "Application ID", value: vendorApplication.id },
        { label: "Product name", value: productName },
        { label: "Website URL", value: websiteUrl },
        { label: "Category", value: category },
        { label: "Target audience", value: targetAudience },
        { label: "Contact name", value: contactName },
        { label: "Email address", value: emailAddress },
        { label: "Phone number", value: phoneNumber },
        { label: "Pricing model", value: pricingModel },
      ],
    });

    if (isLeadSquaredConfigured()) {
      const { firstName, lastName } = splitFullName(contactName);
      const phoneLsq = phoneForLeadSquared(phoneNumber);

      const fullAttributes: LeadSquaredAttribute[] = [
        { Attribute: "FirstName", Value: firstName },
        { Attribute: "LastName", Value: lastName },
        { Attribute: "EmailAddress", Value: emailAddress },
        { Attribute: "Phone", Value: phoneLsq },
        { Attribute: "Company", Value: productName },
        { Attribute: "Website", Value: websiteUrl },
        { Attribute: "mx_Vendor_Category", Value: category },
        { Attribute: "mx_Vendor_Target_Audience", Value: targetAudience },
        { Attribute: "mx_Vendor_Pricing_Model", Value: pricingModel },
        { Attribute: "Source", Value: VENDOR_LEAD_SOURCE },
      ];

      const skipCustom = process.env.LEADSQUARED_SKIP_CUSTOM_FIELDS === "true";
      const attributes: LeadSquaredAttribute[] = skipCustom
        ? fullAttributes.filter(
            (a) => !a.Attribute.startsWith("mx_") && a.Attribute !== "Source"
          )
        : fullAttributes;

      const lsq = await captureLeadSquaredLead(attributes);
      if (!lsq.ok) {
        console.error("LeadSquared capture failed:", lsq.message);
      }
    } else {
      console.warn("LeadSquared: skipping capture (LEADSQUARED_HOST / keys not set)");
    }

    return NextResponse.json(
      { message: "Application submitted successfully", id: vendorApplication.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to submit vendor application", error);
    return NextResponse.json(
      { error: "Unable to submit application right now. Please try again." },
      { status: 500 }
    );
  }
}
