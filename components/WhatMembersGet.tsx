import Image from "next/image";

export function WhatMembersGet() {
  const benefits = [
    "Access to audit-verified software vendors",
    "Honest onboarding expectations",
    "Transparent pricing breakdowns",
    "Results from real customer implementations",
    "Vendor accountability — not sales hype",
    "Priority access to dispute support",
    "Member-only comparisons and shortlists",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Members Get?
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div data-aos="fade-right">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your Free Membership Unlocks Real Protection
            </h3>
            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-3" data-aos="fade-right" data-aos-delay={75 * (index + 1)}>
                  <svg className="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-lg text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Image */}
          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assets/what-members-get.png"
                alt="Business illustration"
                width={420}
                height={400}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

