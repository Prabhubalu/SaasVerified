import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin-auth", "", {
    httpOnly: true,
    path: "/admin",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0, // Expire immediately
  });
  return response;
}
