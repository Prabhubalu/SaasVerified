"use client";

import Link from "next/link";
import Image from "next/image";

export function AboutHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Bringing Transparency to Software Procurement
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              We help businesses make informed decisions by providing comprehensive verification and transparency in the SaaS marketplace.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/marketplace"
                className="bg-[#12b76a] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors text-center"
              >
                View Our Solutions
              </Link>
              <Link
                href="/contact"
                className="bg-white border-2 border-[#12b76a] text-[#12b76a] px-6 py-3 rounded-lg font-medium hover:bg-[#12b76a] hover:text-white transition-colors text-center"
              >
                Contact Sales
              </Link>
            </div>
          </div>

          {/* Right Content - About Image */}
          <div className="hidden lg:block relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <Image
                src="/assets/About.svg"
                alt="About SaaS Verify"
                width={600}
                height={600}
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

