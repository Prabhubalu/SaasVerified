import type { Metadata } from "next";
import { TermsTableOfContents } from "@/components/common/TermsTableOfContents";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for SaaS Verify - Learn how we collect, use, and protect your personal data in accordance with DPDP Act.",
  openGraph: {
    title: "Privacy Policy | SaaS Verify",
    description: "Privacy Policy for SaaS Verify",
  },
};

export default function PrivacyPage() {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const sections = [
    { id: "personal-data", title: "1. Personal Data Collected" },
    { id: "purposes", title: "2. Purposes of Data Collection" },
    { id: "legal-basis", title: "3. Legal Basis Under DPDP Act" },
    { id: "storage", title: "4. Data Storage and Security" },
    { id: "sharing", title: "5. Data Sharing" },
    { id: "retention", title: "6. Retention of Data" },
    { id: "rights", title: "7. Rights of Data Principals" },
    { id: "cookies", title: "8. Cookies and Tracking Technologies" },
    { id: "grievance", title: "9. Grievance Officer" },
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
              Privacy Policy
            </h1>
            <p className="text-sm text-gray-600">
              Last Updated: {currentDate}
            </p>
          </div>

          {/* Privacy Content */}
          <div className="prose prose-lg max-w-none">
            <div className="text-gray-800 leading-relaxed space-y-8">
              <p className="text-base leading-7">
                This Privacy Policy ("Policy") describes how SaaS Verify ("Company", "we", "us", "our") collects, uses, processes, stores, and safeguards personal data in accordance with applicable Indian laws including, without limitation, the Information Technology Act, 2000, and the Digital Personal Data Protection Act, 2023 ("DPDP Act").
              </p>
              <p className="text-base leading-7">
                By using our Platform, you consent to the practices described in this Policy.
              </p>

              {/* Section 1 */}
              <section id="personal-data" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. PERSONAL DATA COLLECTED</h2>
                <p className="text-base leading-7 mb-4">We may collect and process the following categories of personal data:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li><strong>Identifiers:</strong> Name, email address, phone number.</li>
                  <li><strong>Business information:</strong> Company name, designation, company size, location.</li>
                  <li><strong>Transactional information:</strong> Verification requests, purchase history, interactions with vendors.</li>
                  <li><strong>Technical data:</strong> IP address, device identifiers, browser information, usage metadata.</li>
                  <li>Any documents voluntarily submitted for verification or assurance.</li>
                </ul>
              </section>

              {/* Section 2 */}
              <section id="purposes" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. PURPOSES OF DATA COLLECTION</h2>
                <p className="text-base leading-7 mb-4">We collect and process personal data for the following lawful purposes:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Evaluating software requirements and providing recommendations.</li>
                  <li>Conducting vendor assessments and generating verification reports.</li>
                  <li>Administering buyer assurance or refund programs.</li>
                  <li>Communicating via email, SMS, WhatsApp, or phone.</li>
                  <li>Performing analytics, fraud detection, and service improvement.</li>
                  <li>Complying with legal obligations or responding to lawful requests.</li>
                </ul>
              </section>

              {/* Section 3 */}
              <section id="legal-basis" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. LEGAL BASIS UNDER DPDP ACT</h2>
                <p className="text-base leading-7 mb-4">Processing of personal data is carried out on the basis of:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Explicit consent,</li>
                  <li>Performance of service,</li>
                  <li>Legitimate business interest, and</li>
                  <li>Compliance with applicable laws.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  You may withdraw consent at any time, subject to the consequences of such withdrawal.
                </p>
              </section>

              {/* Section 4 */}
              <section id="storage" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. DATA STORAGE AND SECURITY</h2>
                <p className="text-base leading-7 mb-4">We implement commercially reasonable security measures including:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Encryption and pseudonymization;</li>
                  <li>Firewalls and access control;</li>
                  <li>Regular vulnerability assessments;</li>
                  <li>Restricted employee access.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Despite robust practices, no system is entirely immune to breaches.
                </p>
              </section>

              {/* Section 5 */}
              <section id="sharing" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. DATA SHARING</h2>
                <p className="text-base leading-7 mb-4">We may share personal data with:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>SaaS vendors (subject to your authorization);</li>
                  <li>Payment, refund, or assurance partners;</li>
                  <li>Technology and cloud service providers;</li>
                  <li>Regulatory or legal authorities when required.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  We do not sell personal data under any circumstances.
                </p>
              </section>

              {/* Section 6 */}
              <section id="retention" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. RETENTION OF DATA</h2>
                <p className="text-base leading-7 mb-4">Personal data shall be retained only for:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>As long as required to fulfil the purpose of collection; or</li>
                  <li>As mandated by applicable law;</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Upon request, data shall be deleted or anonymized in accordance with the DPDP Act.
                </p>
              </section>

              {/* Section 7 */}
              <section id="rights" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. RIGHTS OF DATA PRINCIPALS</h2>
                <p className="text-base leading-7 mb-4">You are entitled to the following rights:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Right to access your data;</li>
                  <li>Right to correction and updating;</li>
                  <li>Right to withdraw consent;</li>
                  <li>Right to erasure (subject to legal hold requirements);</li>
                  <li>Right to lodge a grievance.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  Requests may be submitted to the Grievance Officer listed below.
                </p>
              </section>

              {/* Section 8 */}
              <section id="cookies" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. COOKIES AND TRACKING TECHNOLOGIES</h2>
                <p className="text-base leading-7 mb-4">We use cookies, tags, pixels, and other technologies for:</p>
                <ul className="list-disc pl-6 space-y-2 text-base leading-7">
                  <li>Analytics and performance monitoring;</li>
                  <li>Personalization;</li>
                  <li>Session management;</li>
                  <li>Marketing and retargeting.</li>
                </ul>
                <p className="text-base leading-7 mt-4">
                  You may disable cookies through your browser settings.
                </p>
              </section>

              {/* Section 9 */}
              <section id="grievance" className="mt-12 scroll-mt-32">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. GRIEVANCE OFFICER</h2>
                <p className="text-base leading-7 mb-4">In accordance with the DPDP Act, the designated Grievance Officer is:</p>
                <div className="text-base leading-7 space-y-2">
                  <p><strong>To,</strong></p>
                  <p><strong>Grievance Officer</strong></p>
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

