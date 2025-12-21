"use client";

import { useVendorModal } from "@/contexts/VendorModalContext";

export function VendorFinalCTA() {
  const { openModal } = useVendorModal();

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#12b76a] to-green-600 rounded-2xl p-12 text-center text-white" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to become a Verified SaaS Vendor?
          </h2>
          <p className="text-lg text-green-50 mb-8 max-w-2xl mx-auto">
            Join trusted vendors who are converting more leads and building buyer confidence through independent verification.
          </p>
          <button
            onClick={openModal}
            className="inline-block bg-white text-[#12b76a] px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Become a Verified Vendor
          </button>
        </div>
      </div>
    </section>
  );
}

