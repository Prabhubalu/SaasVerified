"use client";

import Link from "next/link";

export function WhatWeAudit() {
  const auditCriteria = [
    {
      title: "Feature accuracy",
      description: "Verify that advertised features match actual functionality",
      icon: "⚙️",
    },
    {
      title: "Pricing clarity",
      description: "Ensure transparent and accurate pricing information",
      icon: "💰",
    },
    {
      title: "Onboarding maturity",
      description: "Evaluate the quality and effectiveness of onboarding processes",
      icon: "📚",
    },
    {
      title: "Support & SLA quality",
      description: "Assess support responsiveness and SLA adherence",
      icon: "🎧",
    },
    {
      title: "Integrations",
      description: "Verify integration capabilities and documentation",
      icon: "🔗",
    },
    {
      title: "Security & compliance",
      description: "Review security measures and compliance certifications",
      icon: "🔒",
    },
    {
      title: "UX and documentation",
      description: "Evaluate user experience and documentation quality",
      icon: "📖",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What We Audit
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {auditCriteria.map((criterion, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg p-6 text-center hover:shadow-md hover:border-[#12b76a] transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="text-4xl mb-4">{criterion.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {criterion.title}
              </h3>
              <p className="text-gray-600 text-sm">{criterion.description}</p>
            </div>
          ))}
        </div>

        {/* Secondary CTA */}
        <div className="text-center" data-aos="fade-up">
          <Link
            href="/how-we-verify"
            className="inline-block text-[#12b76a] font-semibold hover:text-green-700 transition-colors"
          >
            View Full Audit Criteria →
          </Link>
        </div>
      </div>
    </section>
  );
}

