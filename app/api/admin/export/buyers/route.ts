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

    // Fetch all buyer requests
    const buyers = await prisma.buyerRequest.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Prepare data for Excel
    const headers = [
      "Full Name",
      "Email",
      "Company",
      "Role",
      "Looking For",
      "Company Size",
      "Decision Timeline",
      "Phone Number",
      "City/State",
      "Status",
      "Submitted Date",
    ];
    const data = buyers.map((buyer) => [
      buyer.fullName,
      buyer.email,
      buyer.company,
      buyer.role,
      buyer.lookingFor || "",
      buyer.companySize || "",
      buyer.decisionTimeline || "",
      buyer.phoneNumber || "",
      buyer.cityState || "",
      buyer.status,
      new Date(buyer.createdAt).toLocaleString(),
    ]);

    // Create workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Buyer Requests");

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
        "Content-Disposition": `attachment; filename="buyer-requests-export-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting buyer requests:", error);
    return NextResponse.json(
      { error: "Failed to export buyer requests" },
      { status: 500 }
    );
  }
}
