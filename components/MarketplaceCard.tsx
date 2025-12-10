"use client";

import Image from "next/image";
import { CheckBadgeIcon, StarIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

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
  };
  index?: number;
}

export function MarketplaceCard({ vendor, index = 0 }: MarketplaceCardProps) {
  return (
    <Link
      href={`/marketplace/${vendor.id}`}
      className="block group"
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col relative">
        {/* Verified Badge - Absolute positioned at top right edge */}
        {vendor.verified && (
          <div className="absolute top-0 right-0 bg-[#12b76a] text-white px-2.5 py-1 rounded-bl-xl rounded-tr-xl flex items-center gap-1.5 text-xs font-semibold shadow-lg z-10">
            <CheckBadgeIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Verified</span>
          </div>
        )}
        
        {/* Content Section */}
        <div className="p-5 flex-1 flex flex-col">
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
              <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#12b76a] transition-colors line-clamp-1">
                {vendor.name}
              </h3>
              {vendor.rating && (
                <div className="flex items-center gap-1 mt-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm text-gray-600">{vendor.rating}</span>
                </div>
              )}
            </div>
          </div>

          {/* Category Badge */}
          <div className="mb-3">
            <span className="inline-block bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md text-xs font-medium">
              {vendor.category}
            </span>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
            {vendor.description}
          </p>

          {/* Pricing */}
          {vendor.pricing && (
            <div className="mb-3">
              <span className="text-sm font-semibold text-gray-900">
                {vendor.pricing}
              </span>
            </div>
          )}

          {/* Features */}
          {vendor.features && vendor.features.length > 0 && (
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
          )}

          {/* View Details Button */}
          <div className="mt-auto pt-3 border-t border-gray-100">
            <span className="text-sm font-medium text-[#12b76a] group-hover:text-green-700 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

