"use client";

import Link from "next/link";
import { useVendorModal } from "@/contexts/VendorModalContext";

export function VerifyFinalCTA() {
  const { openModal: openVendorModal } = useVendorModal();

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Trust, Backed by Proof
          </h2>
          <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Whether you're buying or selling SaaS — verification changes the game.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Buyers Card */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center"
            data-aos="fade-right"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Buyers</h3>
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 bg-[#12b76a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              <span>Explore Verified SaaS</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Vendors Card */}
          <div
            className="bg-white border border-gray-200 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow text-center"
            data-aos="fade-left"
          >
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">Vendors</h3>
            <button
              onClick={openVendorModal}
              className="inline-flex items-center gap-2 bg-[#12b76a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
            >
              <span>Apply for Verification</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

