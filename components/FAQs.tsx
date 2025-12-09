import Link from "next/link";

const learnFAQs = [
  "What is SaaS Verify?",
  "How do I find verified SaaS products?",
  "What does the Trust Seal mean?",
  "What is Refund Assurance?",
  "How much does Refund Assurance cost for buyers?",
  "Can I request a demo through SaaS Verify?",
];

const exploreFAQs = [
  "Who can apply for product verification?",
  "How do I apply for verification?",
  "How long does verification take?",
  "What does the audit evaluate?",
  "Is there a cost to apply?",
  "Can I use the Trust Seal in my marketing?",
];

export function FAQs() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            We'll Help You Get Started
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Learn Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-8" data-aos="fade-right">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Learn</h3>
            <ul className="space-y-4">
              {learnFAQs.map((faq, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="flex items-center justify-between group hover:text-green-600 transition-colors"
                  >
                    <span className="text-gray-700 group-hover:text-green-600">{faq}</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Column */}
          <div className="bg-white border border-gray-200 rounded-lg p-8" data-aos="fade-left" data-aos-delay="150">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Explore</h3>
            <ul className="space-y-4">
              {exploreFAQs.map((faq, index) => (
                <li key={index}>
                  <Link
                    href="#"
                    className="flex items-center justify-between group hover:text-green-600 transition-colors"
                  >
                    <span className="text-gray-700 group-hover:text-green-600">{faq}</span>
                    <svg
                      className="w-4 h-4 text-gray-400 group-hover:text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

