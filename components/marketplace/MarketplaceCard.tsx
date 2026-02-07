"use client";

import Image from "next/image";
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSaaSRecommendationsModal } from "@/contexts/SaaSRecommendationsModalContext";

interface MarketplaceCardProps {
  vendor: {
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
    website?: string;
  };
  index?: number;
}

export function MarketplaceCard({ vendor, index = 0 }: MarketplaceCardProps) {
  const { openModal } = useSaaSRecommendationsModal();

  const handleGetRecommendation = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    openModal();
  };

  const handleVisitWebsite = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (vendor.website) {
      window.open(vendor.website, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      className="block group"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      {/* Link kept for future use: href={`/marketplace/${vendor.id}`} */}
      <div className="bg-white rounded-xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
        {/* Verified Badge - Absolute positioned at top right edge */}
        {/* {vendor.verified && (
          <div className="absolute top-0 right-0 bg-[#12b76a] text-white px-2.5 py-1 rounded-bl-xl rounded-tr-xl flex items-center gap-1.5 text-xs font-semibold shadow-lg z-10">
            <CheckBadgeIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Verified</span>
          </div>
        )} */}
        
        {/* Content Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col">
          {/* Header with Logo, Name, and Badges */}
          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg border border-gray-200 p-2 flex items-center justify-center">
              {vendor.logo ? (
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  width={40}
                  height={40}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-gray-400 text-lg font-bold">
                  {vendor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold text-gray-900 transition-colors line-clamp-1">
                {vendor.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1 line-clamp-1">
                {vendor.category}
              </p>
              {/* {vendor.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600">{vendor.rating}</span>
                </div>
              )} */}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {vendor.description}
          </p>

          {/* Pricing */}
          {/* {vendor.pricing && (
            <div className="mb-3">
              <span className="text-sm font-semibold text-gray-900">
                {vendor.pricing}
              </span>
            </div>
          )} */}

          {/* Features */}
          {/* {vendor.features && vendor.features.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {vendor.features.slice(0, 3).map((feature, idx) => (
                <span
                  key={idx}
                  className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md"
                >
                  {feature}
                </span>
              ))}
              {vendor.features.length > 3 && (
                <span className="text-xs text-gray-500 px-2.5 py-1">
                  +{vendor.features.length - 3} more
                </span>
              )}
            </div>
          )} */}

          {/* View Details Button */}
          <div className="mt-auto pt-3 border-t border-gray-100 flex items-center gap-1.5 sm:gap-2 md:gap-3">
            <button
              type="button"
              onClick={handleGetRecommendation}
              className="flex-1 px-1.5 sm:px-2 md:px-4 py-2 rounded-lg text-sm sm:text-xs md:text-sm font-semibold border border-green-500 text-[#12b76a] bg-transparent transition-all border border-green-500 hover:text-green-700 group-hover:bg-[#12b76a] group-hover:text-white group-hover:border-[#12b76a] group-hover:hover:bg-green-700 whitespace-nowrap"
            >
              Get Recommendation
            </button>
            {vendor.website && (
              <button
                type="button"
                onClick={handleVisitWebsite}
                className="flex-1 text-sm sm:text-sm md:text-sm font-semibold text-gray-600 border border-gray-200 px-1.5 sm:px-2 md:px-4 py-2 rounded-lg inline-flex items-center justify-center gap-1 md:gap-2 transition-colors whitespace-nowrap hover:text-gray-800 hover:bg-gray-300 group-hover:bg-gray-100 group-hover:text-gray-700"
              >
                Visit Website
                {/* <ArrowTopRightOnSquareIcon className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 flex-shrink-0" aria-hidden="true" /> */}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
