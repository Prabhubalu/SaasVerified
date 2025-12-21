"use client";

import Link from "next/link";

export function VerifyHero() {
  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden min-h-screen pt-40 md:pt-48 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center" data-aos="fade-up">
          <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-4">
            VERIFICATION & TRUST
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Independent, Transparent
            <br />
            SaaS Verification
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-8">
            We don't just list vendors — we verify them through a structured,
            evidence-based process designed to protect buyers and reward trustworthy
            vendors.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full mb-10"></div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center" data-aos="fade-up" data-aos-delay="200">
            <Link
              href="/marketplace"
              className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Explore Verified SaaS
            </Link>
            <Link
              href="/vendors"
              className="inline-block bg-white border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              Apply for Verification
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

