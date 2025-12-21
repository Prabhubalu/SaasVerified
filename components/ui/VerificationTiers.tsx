"use client";

export function VerificationTiers() {
  const tiers = [
    {
      name: "Silver",
      description: "Foundational readiness",
      features: [
        "Basic feature verification",
        "Pricing transparency check",
        "Initial onboarding review",
        "Silver badge display",
      ],
      color: "from-gray-400 to-gray-600",
    },
    {
      name: "Gold",
      description: "Proven onboarding & customer satisfaction",
      features: [
        "Comprehensive feature audit",
        "Onboarding maturity assessment",
        "Support & SLA verification",
        "Customer satisfaction review",
        "Gold badge display",
      ],
      color: "from-yellow-400 to-yellow-600",
    },
    {
      name: "Platinum",
      description: "Sustained performance + outcomes",
      features: [
        "Full audit suite",
        "Outcome verification",
        "Security & compliance check",
        "Integration validation",
        "Performance metrics review",
        "Platinum badge display",
      ],
      color: "from-[#12b76a] to-green-600",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Verification Tiers
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className={`bg-gradient-to-r ${tier.color} text-white rounded-lg px-6 py-3 mb-6 text-center`}>
                <h3 className="text-2xl font-bold">{tier.name}</h3>
              </div>
              <p className="text-gray-600 mb-6 text-center">{tier.description}</p>
              <ul className="space-y-3">
                {tier.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#12b76a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

