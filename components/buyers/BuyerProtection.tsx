"use client";

import Link from "next/link";

export function BuyerProtection() {
  const whatsCovered = [
    {
      title: "Misleading claims",
      description: "If a vendor's verified claims don't match reality, we step in.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      title: "SLA failure",
      description: "When verified support SLAs aren't met, we help resolve the issue.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Hidden fees",
      description: "If pricing doesn't match verified transparency standards, we intervene.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: "Broken onboarding",
      description: "If verified onboarding processes fail, we ensure you get support or refund.",
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  const claimFlowSteps = [
    {
      number: 1,
      title: "Submit a claim",
      description: "Report the issue through our buyer protection portal.",
    },
    {
      number: 2,
      title: "SaaS Verify review",
      description: "We review your claim against verified vendor documentation.",
    },
    {
      number: 3,
      title: "Vendor contact",
      description: "We contact the vendor to resolve the issue on your behalf.",
    },
    {
      number: 4,
      title: "Resolution or refund",
      description: "Issue is resolved or refund assistance is provided.",
    },
  ];

  const timelines = [
    { label: "Response window", time: "24-48 hours" },
    { label: "Review window", time: "3-5 business days" },
    { label: "Resolution window", time: "7-14 business days" },
  ];

  const limitations = [
    "Protection applies only to verified vendors in our marketplace.",
    "Claims must be submitted within 90 days of purchase or issue discovery.",
    "Refund assistance is subject to vendor terms and our verification records.",
    "Protection does not cover issues outside verified vendor claims.",
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Side - Content */}
          <div data-aos="fade-right">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Your SaaS Purchase, Protected.
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Assurance if a verified vendor fails to deliver what was audited.
            </p>
            <Link
              href="/buyer-protection"
              className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Buyer Protection Policy
            </Link>
          </div>

          {/* Right Side - Shield Illustration */}
          <div className="relative" data-aos="fade-left" data-aos-delay="150">
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <div className="w-64 h-64 bg-[#12b76a]/10 rounded-full flex items-center justify-center">
                <svg className="w-32 h-32 text-[#12b76a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* What's Covered */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">
            What's Covered
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whatsCovered.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="text-[#12b76a] mb-4">
                  {item.icon}
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Claim Flow - Vertical Steps */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-12 text-center">
            Claim Flow
          </h3>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Vertical Line - Full height */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200">
                <div className="h-full bg-[#12b76a] w-full"></div>
              </div>
              
              <div className="space-y-8">
                {claimFlowSteps.map((step, index) => (
                  <div
                    key={index}
                    className="relative flex gap-6"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    {/* Step Number */}
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-12 h-12 bg-[#12b76a] text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.number}
                      </div>
                    </div>
                    
                    {/* Step Content */}
                    <div className="flex-1 bg-white rounded-xl p-6 border border-gray-200 hover:shadow-md transition-all">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timelines - Horizontal Mini Timeline */}
        <div className="mb-16" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8 text-center">
            Timelines
          </h3>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {timelines.map((timeline, index) => (
                  <div
                    key={index}
                    className="text-center"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="text-2xl font-bold text-[#12b76a] mb-2">
                      {timeline.time}
                    </div>
                    <div className="text-gray-700 font-medium">
                      {timeline.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Limitations */}
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <h3 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-6 text-center">
            Limitations
          </h3>
          <div className="bg-white rounded-xl p-8 border border-gray-200">
            <ul className="space-y-3">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-gray-700">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
