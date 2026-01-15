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

    // Fetch all vendor applications
    const vendors = await prisma.vendorApplication.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Prepare data for Excel
    const headers = [
      "Product Name",
      "Website URL",
      "Category",
      "Target Audience",
      "Contact Name",
      "Email Address",
      "Phone Number",
      "Pricing Model",
      "Status",
      "Submitted Date",
    ];
    const data = vendors.map((vendor) => [
      vendor.productName,
      vendor.websiteUrl,
      vendor.category,
      vendor.targetAudience,
      vendor.contactName,
      vendor.emailAddress,
      vendor.phoneNumber,
      vendor.pricingModel,
      vendor.status,
      new Date(vendor.createdAt).toLocaleString(),
    ]);

    // Create workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Requests");

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
        "Content-Disposition": `attachment; filename="vendor-requests-export-${new Date().toISOString().split("T")[0]}.xlsx"`,
      },
    });
  } catch (error) {
    console.error("Error exporting vendor requests:", error);
    return NextResponse.json(
      { error: "Failed to export vendor requests" },
      { status: 500 }
    );
  }
}
