import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const {
      productName,
      websiteUrl,
      category,
      targetAudience,
      contactName,
      emailAddress,
      phoneNumber,
      pricingModel,
    } = await req.json();

    if (
      !productName ||
      !websiteUrl ||
      !category ||
      !targetAudience ||
      !contactName ||
      !emailAddress ||
      !phoneNumber ||
      !pricingModel
    ) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

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
