"use client";

import { useState } from "react";
import Image from "next/image";

export function Hero() {
  const [email, setEmail] = useState("");

  const categories = ["CRM", "HRMS", "Support", "Automation", "Finance", "Billing"];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-40 md:pt-48 pb-20">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Buy SaaS with High <span className="text-[#12b76a]">Confidence</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join the SaaS Verify Inner Circle. Get access to verified software, vendor truth audits, and buyer protection for your future purchases.
            </p>

            {/* Category Pills - 2 rows of 3 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-3">
                {categories.slice(0, 3).map((category) => (
                  <button
                    key={category}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                  >
                    {category}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.slice(3, 6).map((category) => (
                  <button
                    key={category}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                  >
                    {category}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Email Signup Form */}
            <div className="space-y-4">
              {/* Email Input */}
              <div className="bg-white border border-gray-300 rounded-lg px-4 py-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-base"
                />
              </div>
              
              {/* Button and Text Row */}
              <div className="flex items-start gap-4">
                <button className="bg-[#12b76a] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap">
                  Get Membership. It's FREE!
                </button>
                <div className="text-sm text-gray-600 pt-1">
                  <div>Free forever.</div>
                  <div>No credit card.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[500px]">
              <Image
                src="/assets/Hero-image-1.png"
                alt="Hero illustration"
                width={560}
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
