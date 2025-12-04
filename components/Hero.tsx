"use client";

import { useState } from "react";
import Image from "next/image";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["CRM", "Project Management", "Marketing Automation", "HR Software"];

  return (
    <section className="relative min-h-[calc(100vh-200px)] flex items-center justify-center overflow-hidden pt-20 md:pt-24">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
            Find the Right SaaS, Verified for You
          </h1>
          
          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We independently vet SaaS vendors, validate real-world performance, and ensure you make a safe, confident purchase.
          </p>

          {/* Hero Image */}
          <div className="mb-6 flex items-center justify-center">
            <div className="relative w-full max-w-xl h-auto">
              <Image
                src="/assets/hero-image.png"
                alt="Hero illustration"
                width={800}
                height={400}
                className="w-full h-auto object-contain max-h-48 md:max-h-64"
                priority
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-4">
            <div className="bg-white rounded-full border border-gray-300 shadow-lg flex items-center px-6 py-3 max-w-2xl mx-auto">
              <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories or vendors..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400 text-sm md:text-base"
              />
              <button className="bg-blue-50 text-blue-900 px-5 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors text-sm md:text-base">
                Search
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full text-xs md:text-sm hover:bg-gray-200 transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
