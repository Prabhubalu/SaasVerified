import type { Metadata } from "next";
import { TermsTableOfContents } from "@/components/common/TermsTableOfContents";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund & Buyer Protection Policy for SaaS Verify - Learn about our assurance program and refund terms.",
  openGraph: {
    title: "Refund Policy | SaaS Verify",
    description: "Refund & Buyer Protection Policy for SaaS Verify",
  },
};

export default function RefundPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    { id: "eligibility", title: "1. Eligibility Criteria" },
    { id: "non-eligibility", title: "2. Non-Eligibility" },
    { id: "claim-submission", title: "3. Claim Submission Process" },
    { id: "investigation", title: "4. Investigation and Decision" },
    { id: "limitations", title: "5. Refund Limitations" },
    { id: "governing-law", title: "6. Governing Law" },
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
              Refund & Buyer Protection Policy
            </h1>
            <p className="text-sm text-gray-600">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Refund Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-8">
              <p className="text-base leading-7">
                This Refund & Buyer Protection Policy ("Policy") governs the terms of the "Assurance Program" offered by SaaS Verify to Users seeking protection from misrepresentation, non-delivery, or failed implementation by SaaS vendors.
              </p>

              {/* Section 1 */}
              <section id="eligibility" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. ELIGIBILITY CRITERIA</h2>
                <p className="text-base leading-7 mb-4">A Buyer shall be eligible for claim under the Assurance Program only if:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>The software was purchased through a process facilitated by SaaS Verify;</li>
                  <li>The Buyer provided accurate and complete information during assessment;</li>
                  <li>The Vendor materially deviated from verified commitments;</li>
                  <li>The Buyer has complied with the Vendor's onboarding and implementation requirements.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="non-eligibility" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. NON-ELIGIBILITY</h2>
                <p className="text-base leading-7 mb-4">The following events shall not constitute grounds for refund:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Changes in Buyer's internal strategy, staffing, or priorities;</li>
                  <li>Failure to use the software as instructed;</li>
                  <li>Issues arising from Buyer's IT infrastructure;</li>
                  <li>Delays attributable to Buyer;</li>
                  <li>Situations beyond reasonable control of the Vendor.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="claim-submission" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. CLAIM SUBMISSION PROCESS</h2>
                <p className="text-base leading-7 mb-4">A Buyer shall:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Submit a written claim to <a href="mailto:support@saasverify.com" className="text-[#12b76a] hover:underline">support@saasverify.com</a>;</li>
                  <li>Furnish all evidence supporting the claim;</li>
                  <li>Cooperate during the review and investigation process.</li>
                </ul>
              </section>

              {/* Section 4 */}
              <section id="investigation" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. INVESTIGATION AND DECISION</h2>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>SaaS Verify shall evaluate the claim within 7–14 business days.</li>
                  <li>Vendors shall be given reasonable opportunity to respond.</li>
                  <li>The Company's decision shall be final and binding.</li>
                </ul>
              </section>

              {/* Section 5 */}
              <section id="limitations" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. REFUND LIMITATIONS</h2>
                <p className="text-base leading-7">
                  Refund amounts shall not exceed the limits defined under the Assurance Program or the amount payable by the Vendor under contract.
                </p>
              </section>

              {/* Section 6 */}
              <section id="governing-law" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. GOVERNING LAW</h2>
                <p className="text-base leading-7">
                  This Policy shall be governed by the laws of India.
                </p>
                <p className="text-base leading-7 mt-4">
                  All disputes shall be subject to the exclusive jurisdiction of Bengaluru, Karnataka.
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

