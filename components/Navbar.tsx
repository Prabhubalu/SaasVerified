"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-[5%] left-1/2 transform -translate-x-1/2 w-[70%] z-50">
      <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-full shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 py-2">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center h-10">
              <div className="relative w-32 h-10">
                <Image
                  src="/assets/saas-verified-logo.png"
                  alt="SaaS Verify Logo"
                  width={128}
                  height={40}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
            </Link>
            
            {/* Navigation Items */}
            <div className="hidden md:flex items-center gap-5">
              <div className="flex items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer">
                <span className="text-lg">Buyers</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className="flex items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer">
                <span className="text-lg">Vendors</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <Link href="/marketplace" className="text-gray-800 hover:text-gray-900 text-lg">
                Marketplace
              </Link>
              <Link href="/resources" className="text-gray-800 hover:text-gray-900 text-lg">
                Resources
              </Link>
              <Link href="/contact" className="text-gray-800 hover:text-gray-900 text-lg">
                Contact
              </Link>
            </div>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button className="bg-[#eff4ff]/80 backdrop-blur-sm text-[#002a8a] px-6 py-3 rounded-full text-sm font-normal hover:bg-[#eff4ff] transition-colors border border-blue-200/50">
                Become a Verified Vendor
              </button>
              <button className="bg-[#12b76a] text-white px-6 py-3 rounded-full text-sm font-normal hover:bg-green-700 transition-colors flex items-center gap-1.5 shadow-lg">
                <span>Find Your SaaS</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100/50"
            >
              <svg
                className="h-6 w-6"
                stroke="currentColor"
                fill="none"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
          <div className="pt-2 pb-3 space-y-1 px-4">
            <div className="flex items-center gap-1 py-2 text-gray-700">
              <span>Buyers</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div className="flex items-center gap-1 py-2 text-gray-700">
              <span>Vendors</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <Link href="/marketplace" className="block py-2 text-gray-700 hover:text-gray-900">
              Marketplace
            </Link>
            <Link href="/resources" className="block py-2 text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-gray-900">
              Contact
            </Link>
            <div className="pt-4 space-y-2">
              <button className="w-full bg-[#eff4ff]/80 backdrop-blur-sm text-[#002a8a] px-4 py-3 rounded-full text-sm font-normal border border-blue-200/50">
                Become a Verified Vendor
              </button>
              <button className="w-full bg-[#12b76a] text-white px-4 py-3 rounded-full text-sm font-normal flex items-center justify-center gap-1.5 shadow-lg">
                <span>Find Your SaaS</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
