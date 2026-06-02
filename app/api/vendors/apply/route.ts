import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";
import { syncVtigerLead } from "@/lib/vtiger";
import { vendorToVtigerFields } from "@/lib/vtiger-vendor";

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

    const vtiger = await syncVtigerLead(
      vendorToVtigerFields({
        contactName,
        emailAddress,
        phoneNumber,
        productName,
        websiteUrl,
        category,
        targetAudience,
        pricingModel,
      })
    );

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
        { label: "Form source", value: "Vendors" },
      ],
    });

    return NextResponse.json(
      {
        message: "Application submitted successfully",
        id: vendorApplication.id,
        vtiger: vtiger.ok
          ? { ok: true as const, leadId: vtiger.leadId }
          : { ok: false as const, message: vtiger.message },
      },
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
