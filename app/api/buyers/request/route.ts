import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";

export async function POST(req: Request) {
  try {
    const {
      fullName,
      email,
      company,
      role,
      lookingFor,
      companySize,
      decisionTimeline,
      phoneNumber,
      cityState,
    } = await req.json();

    if (!fullName || !email || !company || !role) {
      return NextResponse.json(
        { error: "Full name, email, company, and role are required." },
        { status: 400 }
      );
    }

    const buyerRequest = await prisma.buyerRequest.create({
      data: {
        fullName,
        email,
        company,
        role,
        lookingFor: lookingFor || null,
        companySize: companySize || null,
        decisionTimeline: decisionTimeline || null,
        phoneNumber: phoneNumber || null,
        cityState: cityState || null,
      },
    });

    await sendFormNotification({
      title: "New Buyer Request",
      subject: `Buyer Request: ${fullName}`,
      fields: [
        { label: "Request ID", value: buyerRequest.id },
        { label: "Full name", value: fullName },
        { label: "Email", value: email },
        { label: "Company", value: company },
        { label: "Role", value: role },
        { label: "Looking for", value: lookingFor },
        { label: "Company size", value: companySize },
        { label: "Decision timeline", value: decisionTimeline },
        { label: "Phone number", value: phoneNumber },
        { label: "City/State", value: cityState },
      ],
    });

    return NextResponse.json(
      { message: "Request submitted successfully", id: buyerRequest.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to submit buyer request", error);
    return NextResponse.json(
      { error: "Unable to submit request right now. Please try again." },
      { status: 500 }
    );
  }
}
