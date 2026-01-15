import { NextResponse } from "next/server";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_TOKEN = process.env.ADMIN_TOKEN ?? "admin-dev-token";

export async function POST(req: Request) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD env var is not set." },
      { status: 500 }
    );
  }

  try {
    const { password, username } = await req.json();

    if (ADMIN_USERNAME && username !== ADMIN_USERNAME) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin-auth", ADMIN_TOKEN, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
    });
    return response;
  } catch (error) {
    console.error("Admin login failed", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
