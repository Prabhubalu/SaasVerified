"use client";

import Link from "next/link";
import Image from "next/image";

export function BuyerJourney() {
  const steps = [
    {
      number: 1,
      title: "Submit your requirements",
      description: "We understand your goals, budget, and integrations.",
      icon: "/assets/buyerjourney/6.png",
      accentBg: "bg-emerald-50",
    },
    {
      number: 2,
      title: "We evaluate verified options",
      description: "Independent audit of onboarding, support, compliance & feature maturity.",
      icon: "/assets/buyerjourney/7.png",
      accentBg: "bg-sky-50",
    },
    {
      number: 3,
      title: "Compare verified outcomes",
      description: "No reviews. No sponsorships. Only verified performance.",
      icon: "/assets/buyerjourney/8.png",
      accentBg: "bg-indigo-50",
    },
    {
      number: 4,
      title: "Buy with protection",
      description: "Full buyer protection if claims fail after onboarding.",
      icon: "/assets/buyerjourney/5.png",
      accentBg: "bg-emerald-50",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Your Secured Buyer Journey
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            Choose the right SaaS with independent verification &amp; buyer protection.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full" />
        </div>

        {/* Top numbered journey line */}
        <div className="hidden md:block max-w-7xl mx-auto mb-10 md:mb-12" data-aos="fade-up" data-aos-delay={100}>
          <div className="relative">
            {/* Gradient line behind the steps */}
            <div className="absolute left-[12%] right-[12%] top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-to-r from-emerald-300 via-sky-300 to-emerald-300" />
            {/* Step circles */}
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step) => (
                <div key={step.number} className="flex items-center justify-center">
                  <div
                    className={`w-10 h-10 md:w-11 md:h-11 rounded-full border flex items-center justify-center text-sm md:text-base font-semibold ${step.accentBg} border-emerald-400 text-emerald-700 shadow-sm`}
                  >
                    {step.number}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step cards */}
        <div className="max-w-7xl mx-auto mb-10 md:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg border border-gray-100 transition-shadow px-6 pt-8 pb-6 flex flex-col items-center text-center"
                data-aos="fade-up"
                data-aos-delay={150 + index * 100}
              >
                {/* Illustration icon */}
                <div className="w-32 h-32 flex items-center justify-center mb-5">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={128}
                    height={128}
                    className="w-32 h-32 object-contain"
                  />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="400">
          <Link
            href="/contact?type=buyer"
            className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Start Your Request
          </Link>
          <p className="mt-3 text-xs md:text-sm text-gray-500">
            100% free. No spam. No sponsored bias.
          </p>
        </div>
      </div>
    </section>
  );
}

