import Link from "next/link";
import { ArrowLeftIcon, MagnifyingGlassIcon, SparklesIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 md:p-12 lg:p-16 shadow-2xl border border-gray-100 relative overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#12b76a]/5 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-[#12b76a]/5 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative z-10 text-center">
            {/* Icon */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-[#12b76a]/20 to-green-100 rounded-full blur-xl"></div>
                <div className="relative bg-gradient-to-br from-[#12b76a] to-green-600 rounded-full p-6 shadow-lg">
                  <MagnifyingGlassIcon className="w-12 h-12 text-white" />
                </div>
              </div>
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              Vendor Not Found
            </h1>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-2 max-w-2xl mx-auto">
              We couldn't find the vendor you're looking for.
            </p>
            <p className="text-base md:text-lg text-gray-500 mb-10 max-w-xl mx-auto">
              The vendor may have been removed, or the link might be incorrect. Explore our verified marketplace to discover trusted SaaS solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-[#12b76a] text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Browse Marketplace</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700 px-8 py-3.5 rounded-lg font-semibold hover:border-[#12b76a] hover:text-[#12b76a] transition-all duration-200"
              >
                <SparklesIcon className="w-5 h-5" />
                <span>Go to Homepage</span>
              </Link>
            </div>

            {/* Helpful Links */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">You might also be interested in:</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link href="/marketplace?category=CRM" className="text-sm text-[#12b76a] hover:text-green-700 hover:underline font-medium">
                  CRM Solutions
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/marketplace?category=Project Management" className="text-sm text-[#12b76a] hover:text-green-700 hover:underline font-medium">
                  Project Management
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/marketplace?category=Support" className="text-sm text-[#12b76a] hover:text-green-700 hover:underline font-medium">
                  Support Tools
                </Link>
                <span className="text-gray-300">•</span>
                <Link href="/vendors" className="text-sm text-[#12b76a] hover:text-green-700 hover:underline font-medium">
                  Become a Vendor
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

