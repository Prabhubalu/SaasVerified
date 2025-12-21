"use client";

import Image from "next/image";
import { useVendorModal } from "@/contexts/VendorModalContext";

export function VendorsHero() {
  const { openModal } = useVendorModal();

  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-40 md:pt-48 pb-12 md:pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Convert More With <span className="text-[#12b76a]">Verified SaaS Trust</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Increase conversions and buyer confidence with an independently verified audit badge.
            </p>

            {/* Primary CTA */}
            <div className="mb-4">
              <button
                onClick={openModal}
                className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Become a Verified Vendor
              </button>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full h-[500px]">
              <Image
                src="/assets/vendor_hero.svg"
                alt="Vendor verification and trust illustration"
                width={640}
                height={520}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

