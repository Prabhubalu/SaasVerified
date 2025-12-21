"use client";

import Link from "next/link";

export function BuyerCaseStudies() {
  const caseStudies = [
    {
      company: "TechCorp Inc.",
      role: "CIO",
      need: "Needed a CRM that integrated with their existing stack and had transparent pricing.",
      result: "Found verified CRM with 90-day onboarding guarantee. Saved $45K in hidden costs.",
      timeframe: "60 days",
    },
    {
      company: "StartupXYZ",
      role: "Founder",
      need: "Looking for project management tool with verified onboarding support.",
      result: "Matched with verified vendor. Onboarding completed in 2 weeks vs. promised 4 weeks.",
      timeframe: "90 days",
    },
    {
      company: "Enterprise Solutions",
      role: "IT Head",
      need: "Required HRMS with verified SLA delivery and support metrics.",
      result: "Selected verified HRMS. Support response time matched verified claims (2hr avg).",
      timeframe: "75 days",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Buyer Case Studies
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {caseStudies.map((study, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="mb-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {study.company}
                </h3>
                <p className="text-sm text-gray-500">{study.role}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">What they needed:</p>
                <p className="text-gray-600 text-sm">{study.need}</p>
              </div>
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">Result after {study.timeframe}:</p>
                <p className="text-gray-600 text-sm">{study.result}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link
            href="/case-studies"
            className="inline-block text-[#12b76a] font-semibold text-lg hover:underline"
          >
            View More Case Studies →
          </Link>
        </div>
      </div>
    </section>
  );
}

