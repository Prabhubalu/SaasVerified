import type { Metadata } from "next";
import { TermsTableOfContents } from "@/components/common/TermsTableOfContents";

export const metadata: Metadata = {
  title: "Other Policies",
  description: "Additional policies for SaaS Verify including Disclaimer, Cookie Policy, Grievance Redressal, and Vendor Verification Terms.",
  openGraph: {
    title: "Other Policies | SaaS Verify",
    description: "Additional policies for SaaS Verify",
  },
};

export default function OtherPolicyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    { id: "disclaimer", title: "Disclaimer Policy" },
    { id: "cookie", title: "Cookie Policy" },
    { id: "grievance", title: "Grievance Redressal Policy" },
    { id: "vendor-verification", title: "Vendor Verification Terms & Conditions" },
    { id: "copyright", title: "Copyright & Intellectual Property Notice" },
  ];

  return (
    <>
      <div className="pt-40 pb-16 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl pb-32">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Other Policies
            </h1>
            <p className="text-sm text-gray-600">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Policy Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-8">
              {/* Disclaimer Policy */}
              <section id="disclaimer" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">DISCLAIMER POLICY</h2>
                <p className="text-sm text-gray-600 mb-6">Last Updated: {currentDate}</p>
                <p className="text-base leading-7 mb-4">
                  The Platform and all Services are provided on an "as is" and "as available" basis without warranties of any kind.
                </p>
                <p className="text-base leading-7 mb-4">
                  SaaS Verify does not guarantee the performance, uptime, delivery, or quality of services offered by SaaS vendors.
                </p>
                <p className="text-base leading-7 mb-4">
                  Verification is based on information furnished at the time of assessment and may be subject to change.
                </p>
                <p className="text-base leading-7 mb-4">
                  The Company disclaims all liability for third-party actions, omissions, representations, or service failures.
                </p>
                <p className="text-base leading-7">
                  Users are advised to conduct their own due diligence before entering into contracts with vendors.
                </p>
              </section>

              {/* Cookie Policy */}
              <section id="cookie" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">COOKIE POLICY</h2>
                <p className="text-sm text-gray-600 mb-6">Last Updated: {currentDate}</p>
                <p className="text-base leading-7 mb-4">
                  This Cookie Policy explains the use of cookies and similar tracking technologies on our Platform.
                </p>
                <p className="text-base leading-7 mb-4">We may use:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Strictly necessary cookies</li>
                  <li>Analytical cookies</li>
                  <li>Functionality cookies</li>
                  <li>Advertising cookies</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Users may block or delete cookies through browser settings; however, certain features may become unavailable.
                </p>
              </section>

              {/* Grievance Redressal Policy */}
              <section id="grievance" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">GRIEVANCE REDRESSAL POLICY</h2>
                <p className="text-sm text-gray-600 mb-6">Last Updated: {currentDate}</p>
                <p className="text-base leading-7 mb-4">
                  Pursuant to the Digital Personal Data Protection Act, 2023
                </p>
                <div className="text-base leading-7 space-y-2 mb-4">
                  <p><strong>Grievance Officer</strong></p>
                  <p><strong>SaaS Verify</strong></p>
                  <p>33, 14th Cross, 9th Main Rd,</p>
                  <p>Sector 6, HSR Layout,</p>
                  <p>Bengaluru, Karnataka – 560102</p>
                  <p className="mt-4">
                    Email: <a href="mailto:hello@saasverify.com" className="text-[#12b76a] hover:underline">hello@saasverify.com</a>
                  </p>
                </div>
                <p className="text-base leading-7">
                  The Grievance Officer shall acknowledge complaints within 48 hours and endeavour to resolve grievances within 7 business days.
                </p>
              </section>

              {/* Vendor Verification Terms & Conditions */}
              <section id="vendor-verification" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">VENDOR VERIFICATION TERMS & CONDITIONS</h2>
                <p className="text-sm text-gray-600 mb-6">Last Updated: {currentDate}</p>
                <p className="text-base leading-7 mb-6">
                  These Terms govern the verification, assessment, and certification of SaaS Vendors by SaaS Verify.
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">1. SUBMISSION OF INFORMATION</h3>
                    <p className="text-base leading-7 mb-4">Vendors must furnish:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                      <li>Accurate product documentation;</li>
                      <li>Proof of features, pricing, and service levels;</li>
                      <li>Valid legal and compliance documents.</li>
                    </ul>
                    <p className="text-base leading-7 mt-4">
                      False submissions shall lead to immediate disqualification.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">2. AUDIT RIGHTS</h3>
                    <p className="text-base leading-7 mb-4">The Company reserves the right to:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                      <li>Conduct audits;</li>
                      <li>Request supporting evidence;</li>
                      <li>Revoke verification at any time.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">3. USE OF VERIFICATION SEAL</h3>
                    <p className="text-base leading-7 mb-4">The SaaS Verify Seal may not be:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                      <li>Altered;</li>
                      <li>Misrepresented;</li>
                      <li>Used on unverified products;</li>
                      <li>Displayed beyond validity.</li>
                    </ul>
                    <p className="text-base leading-7 mt-4">
                      Unauthorized use may invite legal action.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">4. INDEMNIFICATION</h3>
                    <p className="text-base leading-7 mb-4">Vendor agrees to indemnify the Company against:</p>
                    <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                      <li>Losses arising from misrepresentation;</li>
                      <li>Claims raised by Buyers;</li>
                      <li>Violations of law or contract.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Copyright & Intellectual Property Notice */}
              <section id="copyright" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">COPYRIGHT & INTELLECTUAL PROPERTY NOTICE</h2>
                <p className="text-base leading-7">
                  All content, designs, verification seals, methodologies, documentation, and intellectual property present on the Platform are owned exclusively by "SaaS Verify".
                </p>
                <p className="text-base leading-7 mt-4">
                  Unauthorized copying, modification, distribution, or republication is strictly prohibited.
                </p>
              </section>
            </div>
          </div>
            </div>

            {/* Table of Contents - Right Side */}
            <div className="hidden lg:block flex-shrink-0 w-64">
              <TermsTableOfContents sections={sections} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

