"use client";

import Image from "next/image";

export function OurMission() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left - Image */}
          <div className="relative" data-aos="fade-right">
            <div className="relative w-full h-[500px] flex items-center justify-center">
              <Image
                src="/assets/mission.svg"
                alt="Our Mission"
                width={600}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>

          {/* Right - Content */}
          <div className="max-w-xl" data-aos="fade-left">
            <div className="text-sm font-semibold text-[#12b76a] uppercase tracking-wider mb-4">
              OUR MISSION
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Empowering businesses with verified, trustworthy SaaS solutions
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Our mission is to transform software procurement from a risky guessing game into a confident, data-driven decision. We believe every business deserves access to transparent, verified information about the SaaS tools they rely on.
            </p>
            <p className="text-lg text-gray-600">
              Through rigorous verification processes, comprehensive audits, and continuous monitoring, we ensure that the vendors in our marketplace meet the highest standards of security, performance, and reliability.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

