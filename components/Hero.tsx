"use client";

import { useState } from "react";
import Image from "next/image";

export function Hero() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["CRM", "Project Management", "Marketing Automation", "HR Software"];

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden pt-32 md:pt-40">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Find the Right SaaS, Verified for You
          </h1>
          
          {/* Subheading */}
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            We independently vet SaaS vendors, validate real-world performance, and ensure you make a safe, confident purchase.
          </p>

          {/* Hero Image */}
          <div className="mb-8 flex items-center justify-center">
            <div className="relative w-full max-w-2xl h-auto">
              <Image
                src="/assets/hero-image.png"
                alt="Hero illustration"
                width={800}
                height={400}
                className="w-full h-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="bg-white rounded-full border border-gray-300 shadow-lg flex items-center px-6 py-4 max-w-2xl mx-auto">
              <svg className="w-6 h-6 text-gray-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search categories or vendors..."
                className="flex-1 outline-none text-gray-700 placeholder-gray-400"
              />
              <button className="bg-blue-50 text-blue-900 px-6 py-2 rounded-full font-medium hover:bg-blue-100 transition-colors">
                Search
              </button>
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition-colors"
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
