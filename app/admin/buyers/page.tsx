import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function BuyersAdminPage() {
  const token = cookies().get("admin-auth")?.value;
  const expected = process.env.ADMIN_TOKEN ?? "admin-dev-token";
  if (token !== expected) {
    redirect("/admin");
  }

  const buyers = await prisma.buyerRequest.findMany({
    orderBy: { createdAt: "desc" },
  });

  const getStatusBadge = (status: string) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    switch (status) {
      case "contacted":
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case "completed":
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-32 lg:pt-40 pb-12 px-4 sm:px-8 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <Link
              href="/admin/dashboard"
              className="text-sm text-gray-600 hover:text-gray-900 mb-2 inline-block"
            >
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Buyer Requests</h1>
            <p className="text-gray-600 mt-2">
              View and manage SaaS recommendation requests from buyers.
            </p>
          </div>
          <a
            href="/api/admin/export/buyers"
            className="px-4 py-2 bg-[#12b76a] text-white rounded-lg hover:bg-[#0ea05a] transition-colors text-sm font-medium flex items-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            Export Excel
          </a>
        </div>

        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#12b76a]" />
              <span className="text-sm text-gray-700">
                Total requests: {buyers.length}
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Company
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Looking For
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Submitted
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {buyers.length === 0 ? (
                  <tr>
                    <td className="px-6 py-8 text-center text-sm text-gray-500" colSpan={6}>
                      No buyer requests yet.
                    </td>
                  </tr>
                ) : (
                  buyers.map((buyer) => (
                    <tr key={buyer.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">
                          {buyer.fullName}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {buyer.role}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{buyer.company}</div>
                        {buyer.companySize && (
                          <div className="text-xs text-gray-500">
                            Size: {buyer.companySize}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {buyer.lookingFor || "Not specified"}
                        </div>
                        {buyer.decisionTimeline && (
                          <div className="text-xs text-gray-500 mt-1">
                            Timeline: {buyer.decisionTimeline}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{buyer.email}</div>
                        {buyer.phoneNumber && (
                          <div className="text-xs text-gray-500">{buyer.phoneNumber}</div>
                        )}
                        {buyer.cityState && (
                          <div className="text-xs text-gray-500">{buyer.cityState}</div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={getStatusBadge(buyer.status)}>
                          {buyer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {new Date(buyer.createdAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-400">
                          {new Date(buyer.createdAt).toLocaleTimeString()}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

