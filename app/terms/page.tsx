import type { Metadata } from "next";
import { TermsTableOfContents } from "@/components/common/TermsTableOfContents";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and Conditions for SaaS Verify - Read our terms of service and legal agreements.",
  openGraph: {
    title: "Terms of Service | SaaS Verify",
    description: "Terms and Conditions for SaaS Verify",
  },
};

export default function TermsPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    { id: "definitions", title: "1. Definitions" },
    { id: "acceptance", title: "2. Acceptance of Terms" },
    { id: "eligibility", title: "3. Eligibility" },
    { id: "scope", title: "4. Scope of Services" },
    { id: "user-obligations", title: "5. User Obligations" },
    { id: "vendor-obligations", title: "6. Vendor Obligations" },
    { id: "intellectual-property", title: "7. Intellectual Property" },
    { id: "limitation", title: "8. Limitation of Liability" },
    { id: "indemnification", title: "9. Indemnification" },
    { id: "suspension", title: "10. Suspension and Termination" },
    { id: "governing-law", title: "11. Governing Law and Jurisdiction" },
    { id: "contact", title: "12. Contact Information" },
  ];

  return (
    <>
      <div className="pt-40 pb-16 min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
          <div className="flex gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl pb-32">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Terms & Conditions
            </h1>
            <p className="text-sm text-gray-600">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Terms Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-8">
              <p className="text-base leading-7">
                These Terms and Conditions ("Terms") constitute a legally binding agreement between SaaS Verify ("Company", "we", "us", or "our") and any person or entity ("User", "you", or "your") accessing or using our website, services, verification programs, or buyer assurance offerings (collectively, "Services").
              </p>
              <p className="text-base leading-7">
                By accessing, browsing, or using the Services, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree to these Terms, you are not permitted to use the Services.
              </p>

              {/* Section 1 */}
              <section id="definitions" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. DEFINITIONS</h2>
                <p className="text-base leading-7 mb-4">For the purposes of these Terms:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li><strong>"Platform"</strong> refers to all websites, applications, tools, and digital assets operated by SaaS Verify.</li>
                  <li><strong>"Buyer"</strong> refers to any person or entity seeking software recommendations, verification reports, or buyer protection services.</li>
                  <li><strong>"Vendor"</strong> refers to any SaaS company whose product or service is assessed, verified, or listed on the Platform.</li>
                  <li><strong>"Verification"</strong> refers to the assessment, due diligence, or evaluation conducted by SaaS Verify on SaaS vendors or products.</li>
                  <li><strong>"Assurance Program"</strong> refers to refund protection, buyer protection, or any guarantee program facilitated by the Company.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="acceptance" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. ACCEPTANCE OF TERMS</h2>
                <p className="text-base leading-7">
                  Use of the Services constitutes acceptance of these Terms. These Terms may be amended at any time without prior notice, and continued use of the Platform shall be deemed acceptance of such changes.
                </p>
              </section>

              {/* Section 3 */}
              <section id="eligibility" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. ELIGIBILITY</h2>
                <p className="text-base leading-7 mb-4">The Services are intended solely for persons who:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Are at least 18 years of age; and</li>
                  <li>Possess the legal capacity to enter into binding agreements.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  By using the Platform, you represent and warrant that you satisfy these eligibility requirements.
                </p>
              </section>

              {/* Section 4 */}
              <section id="scope" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. SCOPE OF SERVICES</h2>
                <p className="text-base leading-7 mb-4">SaaS Verify operates as an independent evaluator of SaaS products and vendors.</p>
                <p className="text-base leading-7 mb-4">We:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Conduct assessments of vendor claims,</li>
                  <li>Provide verification reports, and</li>
                  <li>Facilitate buyer protection processes.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  We do not sell software, and we do not act as an agent, representative, or partner of the vendors listed unless expressly stated.
                </p>
              </section>

              {/* Section 5 */}
              <section id="user-obligations" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. USER OBLIGATIONS</h2>
                <p className="text-base leading-7 mb-4">Users agree to:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Provide accurate and complete information;</li>
                  <li>Not misuse or manipulate verification systems;</li>
                  <li>Refrain from infringing upon intellectual property;</li>
                  <li>Abide by all applicable laws and regulations.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Any false or misleading information may result in immediate termination of access.
                </p>
              </section>

              {/* Section 6 */}
              <section id="vendor-obligations" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. VENDOR OBLIGATIONS</h2>
                <p className="text-base leading-7 mb-4">Vendors must:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Furnish truthful and verifiable documentation;</li>
                  <li>Not misrepresent any product features, pricing, support levels, or service terms;</li>
                  <li>Cooperate with the Company during verification or dispute resolution processes.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Submission of falsified or misleading information shall result in delisting and may give rise to legal action.
                </p>
              </section>

              {/* Section 7 */}
              <section id="intellectual-property" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. INTELLECTUAL PROPERTY</h2>
                <p className="text-base leading-7">
                  All content, trademarks, verification seals, reports, logos, methods, and proprietary information on the Platform are the exclusive property of the Company.
                </p>
                <p className="text-base leading-7 mt-4">
                  Unauthorized reproduction, distribution, modification, reverse engineering, scraping, or commercial exploitation is strictly prohibited.
                </p>
              </section>

              {/* Section 8 */}
              <section id="limitation" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. LIMITATION OF LIABILITY</h2>
                <p className="text-base leading-7 mb-4">To the maximum extent permitted by law, the Company shall not be liable for:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Any purchasing decision made by the Buyer;</li>
                  <li>Vendor performance, delivery delays, non-performance, or misconduct;</li>
                  <li>Loss of business, revenue, goodwill, or data;</li>
                  <li>Any indirect, incidental, consequential, or punitive damages.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  The Company's total liability shall be limited solely to the amount paid by the User to SaaS Verify for the specific service rendered, if any.
                </p>
              </section>

              {/* Section 9 */}
              <section id="indemnification" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. INDEMNIFICATION</h2>
                <p className="text-base leading-7 mb-4">You agree to indemnify and hold the Company harmless from any claims, damages, losses, liabilities, or expenses arising from:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Your use of the Services;</li>
                  <li>Violation of these Terms; or</li>
                  <li>Misrepresentation or misconduct by you.</li>
                </ul>
              </section>

              {/* Section 10 */}
              <section id="suspension" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. SUSPENSION AND TERMINATION</h2>
                <p className="text-base leading-7 mb-4">We may suspend or terminate access to the Platform if you:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Violate any of these Terms;</li>
                  <li>Provide false or misleading information;</li>
                  <li>Engage in fraudulent or harmful activities.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Termination shall not affect any rights or obligations accrued prior to the effective date.
                </p>
              </section>

              {/* Section 11 */}
              <section id="governing-law" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. GOVERNING LAW AND JURISDICTION</h2>
                <p className="text-base leading-7">
                  These Terms shall be governed by and construed in accordance with the laws of India.
                </p>
                <p className="text-base leading-7 mt-4">
                  All disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts situated in Bengaluru, Karnataka.
                </p>
              </section>

              {/* Section 12 */}
              <section id="contact" className="mt-12 scroll-mt-24">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. CONTACT INFORMATION</h2>
                <div className="text-base leading-7 space-y-2">
                  <p><strong>SaaS Verify</strong></p>
                  <p>33, 14th Cross, 9th Main Rd,</p>
                  <p>Sector 6, HSR Layout,</p>
                  <p>Bengaluru, Karnataka – 560102</p>
                  <p className="mt-4">
                    Email: <a href="mailto:hello@saasverify.com" className="text-[#12b76a] hover:underline">hello@saasverify.com</a>
                  </p>
                </div>
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

