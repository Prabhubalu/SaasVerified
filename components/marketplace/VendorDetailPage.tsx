"use client";

import Image from "next/image";
import Link from "next/link";
import { CheckCircleIcon, StarIcon, ShieldCheckIcon } from "@heroicons/react/24/solid";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface VendorDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  image?: string;
  rating?: number;
  verified: boolean;
  pricing?: string;
  features?: string[];
  fullDescription?: string;
  securityScore?: number;
  performanceScore?: number;
  supportScore?: number;
  verificationTier?: "Gold" | "Silver" | "Bronze" | "Platinum";
  verifiedAreas?: string[];
  lastAuditDate?: string;
  detailedFeatures?: Array<{
    title: string;
    description: string;
  }>;
  reviews?: Array<{
    text: string;
    author: string;
    role: string;
    company: string;
  }>;
  bestUseCases?: string[];
  customerTypes?: string[];
  integrations?: Array<{
    name: string;
    logo: string;
  }>;
  alternatives?: Array<{
    id: string;
    name: string;
    logo: string;
    score: number;
  }>;
  website?: string;
}

interface VendorDetailPageProps {
  vendor: VendorDetail;
}

function IntegrationLogo({ name, logo }: { name: string; logo: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError || !logo) {
    return (
      <div className="w-10 h-10 bg-[#12b76a] rounded-full flex items-center justify-center text-xs text-white font-semibold">
        {name.charAt(0)}
      </div>
    );
  }

  return (
    <Image
      src={logo}
      alt={name}
      width={40}
      height={40}
      className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
      onError={() => setImageError(true)}
    />
  );
}

export function VendorDetailPage({ vendor }: VendorDetailPageProps) {
  const getTierBadgeColor = (tier?: string) => {
    switch (tier) {
      case "Platinum":
        return "bg-gradient-to-r from-purple-500 to-indigo-600";
      case "Gold":
        return "bg-yellow-500";
      case "Silver":
        return "bg-gray-400";
      case "Bronze":
        return "bg-orange-500";
      default:
        return "bg-[#12b76a]";
    }
  };

  const getTierText = (tier?: string) => {
    switch (tier) {
      case "Platinum":
        return "Platinum: Enterprise-grade platform with exceptional standards across all areas.";
      case "Gold":
        return "Gold: Vendor meets all critical standards for enterprise-readiness.";
      case "Silver":
        return "Silver: Vendor meets most critical standards for business use.";
      case "Bronze":
        return "Bronze: Vendor meets basic standards for small business use.";
      default:
        return "Verified: Vendor has been independently verified.";
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <span>Back to Marketplace</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Product Overview */}
            <div className="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-up">
              <div className="flex flex-col sm:flex-row items-start sm:items-top gap-6">
                <div className="flex-shrink-0 w-20 h-20 bg-white rounded-xl border border-gray-200 p-2 flex items-center justify-center">
                  {vendor.logo ? (
                    <Image
                      src={vendor.logo}
                      alt={vendor.name}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-gray-400 text-2xl font-bold">
                      {vendor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                      {vendor.name}
                    </h1>
                    {vendor.verified && vendor.verificationTier && (
                      <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-1.5">
                        <ShieldCheckIcon className={`w-5 h-5 ${getTierBadgeColor(vendor.verificationTier)} text-white rounded p-0.5`} />
                        <span className="text-sm font-semibold text-yellow-800">
                          {vendor.verificationTier} Verified
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-2">{vendor.category}</p>
                  {vendor.pricing && (
                    <p className="text-base text-gray-700 mb-4 font-medium">{vendor.pricing}</p>
                  )}
                  <div className="flex flex-wrap gap-3 mt-4">
                    <button className="bg-white border-2 border-[#12b76a] text-[#12b76a] px-6 py-2.5 rounded-lg font-medium hover:bg-[#12b76a] hover:text-white transition-colors">
                      Get Recommendation
                    </button>
                    {vendor.website && (
                      <a
                        href={vendor.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-[#12b76a] text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors shadow-md"
                      >
                        Visit Vendor Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Scorecards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="100">
              {vendor.securityScore && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Security Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{vendor.securityScore}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              )}
              {vendor.performanceScore && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Performance Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{vendor.performanceScore}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              )}
              {vendor.supportScore && (
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-sm font-semibold text-gray-600 mb-3">Support Score</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-bold text-gray-900">{vendor.supportScore}</span>
                    <span className="text-gray-500">/5</span>
                  </div>
                </div>
              )}
            </div>

            {/* Verification Summary */}
            <div className="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Verification Summary</h2>
              <div className="space-y-4">
                {vendor.verifiedAreas && vendor.verifiedAreas.length > 0 && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Verified Areas: </span>
                    <span className="text-gray-900">{vendor.verifiedAreas.join(", ")}</span>
                  </div>
                )}
                {vendor.lastAuditDate && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Last Audit Date: </span>
                    <span className="text-gray-900">{vendor.lastAuditDate}</span>
                  </div>
                )}
                {vendor.verificationTier && (
                  <div>
                    <span className="text-sm font-semibold text-gray-600">Verification Tier: </span>
                    <span className="text-gray-900">{getTierText(vendor.verificationTier)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            {vendor.detailedFeatures && vendor.detailedFeatures.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="300">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Features</h2>
                <div className="space-y-6">
                  {vendor.detailedFeatures.map((feature, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <CheckCircleIcon className="w-6 h-6 text-[#12b76a]" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600">{feature.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reviews */}
            {vendor.reviews && vendor.reviews.length > 0 && (
              <div className="bg-white rounded-2xl p-8 shadow-lg" data-aos="fade-up" data-aos-delay="400">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h2>
                <div className="space-y-6">
                  {vendor.reviews.map((review, index) => (
                    <div key={index} className="border-l-4 border-[#12b76a] pl-6">
                      <p className="text-gray-700 mb-3 italic">&quot;{review.text}&quot;</p>
                      <p className="text-sm font-semibold text-gray-900">
                        {review.author}, {review.role} at {review.company}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Key Highlights */}
            <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-left">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Key Highlights</h3>
              
              {vendor.bestUseCases && vendor.bestUseCases.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">BEST USE CASES</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.bestUseCases.map((useCase, index) => (
                      <span
                        key={index}
                        className="bg-[#dcfce7] text-[#12b76a] px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        {useCase}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {vendor.customerTypes && vendor.customerTypes.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-600 mb-3">CUSTOMER TYPES</h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.customerTypes.map((type, index) => (
                      <span
                        key={index}
                        className="bg-[#dcfce7] text-[#12b76a] px-3 py-1.5 rounded-full text-sm font-medium"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Integrations */}
            {vendor.integrations && vendor.integrations.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-left" data-aos-delay="100">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Integrations</h3>
                <div className="grid grid-cols-4 gap-3">
                  {vendor.integrations.slice(0, 8).map((integration, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-lg p-3 aspect-square flex items-center justify-center border border-gray-200 hover:border-[#12b76a] transition-colors group"
                      title={integration.name}
                    >
                      <IntegrationLogo name={integration.name} logo={integration.logo} />
                    </div>
                  ))}
                  {vendor.integrations.length > 8 && (
                    <div className="bg-gray-50 rounded-lg p-3 aspect-square flex items-center justify-center border border-gray-200">
                      <span className="text-sm font-semibold text-gray-600">
                        +{vendor.integrations.length - 8}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Alternatives */}
            {vendor.alternatives && vendor.alternatives.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-lg" data-aos="fade-left" data-aos-delay="200">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Alternatives</h3>
                <div className="space-y-4">
                  {vendor.alternatives.map((alternative) => (
                    <Link
                      key={alternative.id}
                      href={`/marketplace/${alternative.id}`}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    >
                      <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
                        {alternative.logo ? (
                          <Image
                            src={alternative.logo}
                            alt={alternative.name}
                            width={32}
                            height={32}
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <div className="text-gray-400 text-sm font-bold">
                            {alternative.name.charAt(0)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-[#12b76a] transition-colors">
                          {alternative.name}
                        </h4>
                        <div className="flex items-center gap-1 mt-1">
                          <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                          <span className="text-sm text-gray-600">{alternative.score}/5</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

