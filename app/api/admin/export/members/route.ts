import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import * as XLSX from "xlsx";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    // Verify admin authentication
    const token = cookies().get("admin-auth")?.value;
    const expected = process.env.ADMIN_TOKEN ?? "admin-dev-token";
    if (token !== expected) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch all members
    const members = await prisma.member.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Prepare data for Excel
    const headers = ["Name", "Company", "Role", "Email", "Joined Date"];
    const data = members.map((member) => [
      member.fullName,
      member.company,
      member.role,
      member.email,
      new Date(member.createdAt).toLocaleString(),
    ]);

    // Create workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Members");

    // Generate Excel file buffer
    const excelBuffer = XLSX.write(workbook, {
      type: "buffer",
      bookType: "xlsx",
    });

    // Return Excel file
    return new NextResponse(excelBuffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="members-export-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting members:", error);
    return NextResponse.json(
      { error: "Failed to export members" },
      { status: 500 }
    );
  }
}
