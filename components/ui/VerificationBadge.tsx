"use client";

export function VerificationBadge() {
  const useCases = [
    "Website hero",
    "Sales decks",
    "LinkedIn outreach",
    "Implementation proposals",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Verification Badge
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              A trust symbol proven by independent audits.
            </p>
            <ul className="space-y-4">
              {useCases.map((useCase, index) => (
                <li key={index} className="flex items-start gap-3" data-aos="fade-right" data-aos-delay={75 * (index + 1)}>
                  <svg className="w-6 h-6 text-[#12b76a] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{useCase}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Badge Graphic */}
          <div className="relative" data-aos="fade-left">
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <div className="w-72 h-72 bg-gradient-to-br from-[#12b76a] to-green-600 rounded-3xl shadow-2xl flex flex-col items-center justify-center text-white p-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-2">Verified</h3>
                <p className="text-center text-green-50 text-sm">SaaS Vendor</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

