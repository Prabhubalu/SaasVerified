"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSaaSRecommendationsModal } from "@/contexts/SaaSRecommendationsModalContext";

export function BuyersHero() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { openModal } = useSaaSRecommendationsModal();

  // Sample suggestions for typeahead
  const suggestions = [
    { name: "ClickUp", category: "Project Management", score: 92, verified: true },
    { name: "Monday.com", category: "Project Management", score: 89, verified: true },
    { name: "Asana", category: "Project Management", score: 87, verified: true },
    { name: "Salesforce", category: "CRM", score: 95, verified: true },
    { name: "Zendesk", category: "Support", score: 88, verified: true },
  ];

  const filteredSuggestions = searchQuery.trim()
    ? suggestions.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="relative flex-1 flex items-center justify-center overflow-hidden pt-40 md:pt-48 pb-12 md:pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl" data-aos="fade-up">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-[1.25] md:leading-[1.2] lg:leading-[1.15]">
              Find the Right SaaS With <span className="text-[#12b76a]">Confidence</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Independent verification. Zero bias. Real outcomes.
            </p>

            {/* Search Bar with Typeahead */}
            <div className="mb-6 relative" ref={searchRef}>
              <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex items-center px-4 py-3">
                <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  placeholder="Search vendors or categories..."
                  className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-base"
                />
              </div>

              {/* Typeahead Suggestions */}
              {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-64 overflow-y-auto">
                  {filteredSuggestions.map((suggestion, index) => (
                    <Link
                      key={index}
                      href={`/marketplace?search=${encodeURIComponent(suggestion.name)}`}
                      className="block px-4 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-gray-900">{suggestion.name}</span>
                            {suggestion.verified && (
                              <span className="bg-[#12b76a] text-white px-2 py-0.5 rounded text-xs font-semibold">
                                Verified
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{suggestion.category}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">{suggestion.score}</div>
                          <div className="text-xs text-gray-500">Score</div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Primary CTA */}
            <div className="mb-4">
              <button
                onClick={openModal}
                className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
              >
                Get SaaS Recommendations
              </button>
            </div>

            {/* Secondary Text */}
            <p className="text-sm text-gray-500">
              No affiliate bias. Independent audits.
            </p>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full h-[500px]">
              <Image
                src="/assets/image6.svg"
                alt="Buyer journey and verification illustration"
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

