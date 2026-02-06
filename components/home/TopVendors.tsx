"use client";

import Image from "next/image";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";
import { useSaaSRecommendationsModal } from "@/contexts/SaaSRecommendationsModalContext";

export function TopVendors() {
  const { openModal } = useSaaSRecommendationsModal();
  
  const vendors = [
    {
      id: "clickup",
      name: "ClickUp",
      // description: "WE MISS YOU?",
      image: "/assets/vendors/clickup-screenshot.png",
      logo: "/assets/vendors/clickup.svg",
      website: "https://clickup.com",
    },
    {
      id: "monday",
      name: "Monday.com",
      // description: "PRODUCTIVITY REIMAGINED",
      image: "/assets/vendors/monday-screenshot.avif",
      logo: "/assets/vendors/monday.svg",
      website: "https://monday.com",
    },
    {
      id: "zoho",
      name: "ZOHO",
      // description: "CHEW GUM, HAVE ENERGY, RUN THE DAY!",
      image: "/assets/vendors/zoho_screenshot.jpg",
      logo: "/assets/vendors/zoho.svg",
      website: "https://zoho.com",
    },
    {
      id: "vtiger",
      name: "vtiger",
      // description: "PROJECT OF THE MONTH",
      image: "/assets/vendors/vtiger-screenshot.png",
      logo: "/assets/vendors/vtiger.svg",
      website: "https://vtiger.com",
    },
  ];

  const handleGetRecommendation = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    openModal();
  };

  const handleVisitWebsite = (e: React.MouseEvent, website: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(website, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Top Verified Vendors
          </h2>
          <div className="w-48 h-1 mx-auto mb-4 bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor, index) => (
            <div
              key={vendor.id}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer block relative"
              data-aos="fade-up"
              data-aos-delay={100 * index}
            >
              <div className="relative h-48 overflow-hidden">
                {vendor.image ? (
                  <Image
                    src={vendor.image}
                    alt={`${vendor.name} product`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-100 to-green-100" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-white/85 via-white/30 to-transparent" />
                
                {/* Hover Overlay with Buttons */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
                  <button
                    type="button"
                    onClick={handleGetRecommendation}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-[#12b76a] text-white hover:bg-green-600 transition-colors whitespace-nowrap"
                  >
                    Get Recommendation
                  </button>
                  <button
                    type="button"
                    onClick={(e) => handleVisitWebsite(e, vendor.website)}
                    className="w-full px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap inline-flex items-center justify-center gap-2"
                  >
                    Visit Website
                    <ArrowTopRightOnSquareIcon className="w-4 h-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
              <div className="p-4 text-center">
                <div className="h-8 mb-2 flex items-center justify-center">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

