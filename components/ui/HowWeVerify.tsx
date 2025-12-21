"use client";

export function HowWeVerify() {
  const verificationStages = [
    "Application review",
    "Documentation check",
    "In-depth audit",
    "Scoring & badge",
    "Re-verification",
  ];

  const auditCriteria = [
    { name: "Features", icon: "⚙️" },
    { name: "Pricing transparency", icon: "💰" },
    { name: "Onboarding maturity", icon: "📚" },
    { name: "Support & SLA delivery", icon: "🎧" },
    { name: "Integrations", icon: "🔗" },
    { name: "Security & compliance", icon: "🔒" },
  ];

  const scoreTiers = [
    { range: "70-79", label: "Reliable", color: "bg-blue-100 text-blue-800" },
    { range: "80-89", label: "Trusted", color: "bg-green-100 text-green-800" },
    { range: "90-100", label: "Proven", color: "bg-[#12b76a] text-white" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How We Verify
          </h2>
          <p className="text-xl text-gray-600 mb-4">
            Independent, Transparent SaaS Verification.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            We do not only list vendors — we verify them.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        {/* Verification Stages */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="100">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Verification Stages
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {verificationStages.map((stage, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-12 h-12 bg-[#12b76a] text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {index + 1}
                </div>
                <p className="text-gray-700 font-medium">{stage}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Criteria Grid */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Audit Criteria
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {auditCriteria.map((criterion, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 50}
              >
                <div className="text-3xl mb-3">{criterion.icon}</div>
                <p className="text-gray-700 font-medium text-sm">{criterion.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scoring Tiers */}
        <div className="mb-16" data-aos="fade-up" data-aos-delay="300">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
            Scoring Tiers
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {scoreTiers.map((tier, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className={`${tier.color} rounded-lg px-4 py-2 mb-4 inline-block font-bold text-lg`}>
                  {tier.range}
                </div>
                <p className="text-xl font-semibold text-gray-900">{tier.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Vendor Expectations & Buyer Benefits */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white border border-gray-200 rounded-xl p-8" data-aos="fade-right" data-aos-delay="400">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Vendor Expectations
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#12b76a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Be transparent</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#12b76a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Provide evidence</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-6 h-6 text-[#12b76a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-gray-700">Submit onboarding flows</span>
              </li>
            </ul>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-8" data-aos="fade-left" data-aos-delay="400">
            <h3 className="text-2xl font-semibold text-gray-900 mb-6">
              Buyer Benefits
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#12b76a] rounded-full"></div>
                <span className="text-gray-700 font-medium">Verified SaaS</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#12b76a] rounded-full"></div>
                <span className="text-gray-700 font-medium">→ Lower risk</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#12b76a] rounded-full"></div>
                <span className="text-gray-700 font-medium">→ Faster adoption</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-[#12b76a] rounded-full"></div>
                <span className="text-gray-700 font-medium">→ Real outcomes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

