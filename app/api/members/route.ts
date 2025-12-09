import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { fullName, company, role, email } = await req.json();

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

    return NextResponse.json({ member }, { status: 200 });
  } catch (error) {
    console.error("Failed to save member", error);
    return NextResponse.json(
      { error: "Unable to save membership right now. Please try again." },
      { status: 500 }
    );
  }
}
