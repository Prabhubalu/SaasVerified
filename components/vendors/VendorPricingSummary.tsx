"use client";

import Link from "next/link";

export function VendorPricingSummary() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-2xl p-12 text-center border border-gray-200" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Vendor Pricing Summary
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Verification tiers vary based on vendor size, complexity, and product maturity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?type=vendor&topic=pricing"
              className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              View Pricing
            </Link>
            <Link
              href="/contact?type=vendor&topic=call"
              className="inline-block bg-white text-[#12b76a] border-2 border-[#12b76a] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-[#12b76a] hover:text-white transition-colors"
            >
              Book a Call
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

