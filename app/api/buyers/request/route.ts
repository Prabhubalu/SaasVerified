import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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

