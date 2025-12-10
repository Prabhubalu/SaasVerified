"use client";

import Image from "next/image";

interface Vendor {
  name: string;
  logo: string;
}

interface VendorLogoSliderProps {
  vendors: Vendor[];
  centerLogo?: {
    name: string;
    logo: string;
  };
}

export function VendorLogoSlider({ vendors, centerLogo }: VendorLogoSliderProps) {
  // Split vendors into two rows (evens top, odds bottom)
  const row1 = vendors.filter((_, i) => i % 2 === 0);
  const row2 = vendors.filter((_, i) => i % 2 === 1);

  // Duplicate each row for seamless scrolling
  const row1Loop = [...row1, ...row1];
  const row2Loop = [...row2, ...row2];

  return (
    <div className="relative w-full overflow-hidden pb-8 pt-4">
      {/* Two-row grid with central logo - using mask for fade effect */}
      <div 
        className="relative flex flex-col gap-2 md:gap-2 min-h-[100px] md:min-h-[120px]"
        style={{
          maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        {/* Top Row */}
        <div className="flex animate-scroll-slow gap-2 md:gap-2 items-center">
          {row1Loop.map((vendor, index) => (
            <div
              key={`row1-${vendor.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center group"
            >
              <div className="relative w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-xl border border-gray-200 p-2.5 md:p-3 flex items-center justify-center transition-all duration-300 hover:shadow-sm hover:border-gray-200 hover:scale-105">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Central Logo - Overlapping both rows */}
        {/* {centerLogo && (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center pointer-events-none">
            <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 bg-white border border-gray-300 rounded-full p-3 md:p-4 flex items-center justify-center shadow-xl ring-4 ring-white">
              <Image
                src={centerLogo.logo}
                alt={centerLogo.name}
                width={120}
                height={120}
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        )} */}

        {/* Bottom Row */}
        <div className="flex animate-scroll-slow-reverse gap-2 md:gap-2 items-center">
          {row2Loop.map((vendor, index) => (
            <div
              key={`row2-${vendor.name}-${index}`}
              className="flex-shrink-0 flex items-center justify-center group"
            >
              <div className="relative w-14 h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-white rounded-xl border border-gray-200 p-2.5 md:p-3 flex items-center justify-center transition-all duration-300 hover:shadow-sm hover:border-gray-200 hover:scale-105">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

