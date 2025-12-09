"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isAdminRoute = pathname?.startsWith("/admin");
  const isAdminLoginPage = pathname === "/admin";
  const showLogout = isAdminRoute && !isAdminLoginPage;

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="fixed top-[5%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[85%] lg:w-[75%] xl:w-[70%] z-50">
      <div className="bg-white/30 backdrop-blur-xl border border-white/20 rounded-full shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-3 md:px-4 lg:px-6 py-2">
          <div className="flex justify-between items-center gap-2 lg:gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center h-10 flex-shrink-0">
              <div className="relative w-28 md:w-32 h-10">
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
            {!showLogout && (
              <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-shrink-0">
                <div className="flex items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer whitespace-nowrap">
                  <span className="text-sm lg:text-base">Buyers</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-gray-800 hover:text-gray-900 cursor-pointer whitespace-nowrap">
                  <span className="text-sm lg:text-base">Vendors</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <Link href="/marketplace" className="text-gray-800 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">
                  Marketplace
                </Link>
                <Link href="/resources" className="text-gray-800 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">
                  Resources
                </Link>
                <Link href="/contact" className="text-gray-800 hover:text-gray-900 text-sm lg:text-base whitespace-nowrap">
                  Contact
                </Link>
              </div>
            )}

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center gap-1.5 lg:gap-2 flex-shrink-0">
              {showLogout ? (
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-normal hover:bg-red-700 transition-colors flex items-center gap-1 lg:gap-1.5 shadow-lg whitespace-nowrap"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <button className="text-[#12b76a] px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 text-xs md:text-sm lg:text-base font-normal hover:text-[#12b76a] hover:bg-[#12b76a]/10 hover:underline transition-all rounded-full whitespace-nowrap">
                    Become a Verified Vendor
                  </button>
                  <button className="bg-[#12b76a] text-white px-3 md:px-4 lg:px-6 py-2 md:py-2.5 lg:py-3 rounded-full text-xs md:text-sm lg:text-base font-normal hover:bg-green-700 transition-colors flex items-center gap-1 lg:gap-1.5 shadow-lg whitespace-nowrap">
                    <span>Find Your SaaS</span>
                    <svg className="w-4 h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button / Logout Button */}
            {showLogout ? (
              <button
                onClick={handleLogout}
                className="md:hidden bg-red-600 text-white px-4 py-2 rounded-full text-sm font-normal hover:bg-red-700 transition-colors flex items-center gap-1.5 shadow-lg whitespace-nowrap"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            ) : (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100/50 flex-shrink-0"
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
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden mt-2 bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-lg">
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
              {showLogout ? (
                <button
                  onClick={handleLogout}
                  className="w-full bg-red-600 text-white px-4 py-3 rounded-full text-sm font-normal flex items-center justify-center gap-1.5 shadow-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              ) : (
                <>
                  <button className="w-full text-[#12b76a] px-4 py-3 text-sm font-normal hover:text-[#12b76a] hover:bg-[#12b76a]/10 hover:underline transition-all rounded-full">
                    Become a Verified Vendor
                  </button>
                  <button className="w-full bg-[#12b76a] text-white px-4 py-3 rounded-full text-sm font-normal flex items-center justify-center gap-1.5 shadow-lg">
                    <span>Find Your SaaS</span>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
