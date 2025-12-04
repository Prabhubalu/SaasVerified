"use client";

import Image from "next/image";
import { useState } from "react";

export function TrustBar() {
  const companies = [
    { name: "Booking.com", logo: "https://logo.clearbit.com/booking.com", fallback: "https://cdn.simpleicons.org/bookingdotcom/003580" },
    { name: "IBM", logo: "https://logo.clearbit.com/ibm.com", fallback: "https://cdn.simpleicons.org/ibm/006699" },
    { name: "Logitech", logo: "https://logo.clearbit.com/logitech.com", fallback: "https://cdn.simpleicons.org/logitech/00B8FC" },
    { name: "Fortinet", logo: "https://logo.clearbit.com/fortinet.com", fallback: "https://cdn.simpleicons.org/fortinet/EE3124" },
    { name: "TIBCO", logo: "https://logo.clearbit.com/tibco.com", fallback: "https://cdn.simpleicons.org/tibco/FF6600" },
    { name: "Spotify", logo: "https://logo.clearbit.com/spotify.com", fallback: "https://cdn.simpleicons.org/spotify/1DB954" },
    { name: "T-Mobile", logo: "https://logo.clearbit.com/t-mobile.com", fallback: "https://cdn.simpleicons.org/tmobile/E20074" },
    { name: "Netflix", logo: "https://logo.clearbit.com/netflix.com", fallback: "https://cdn.simpleicons.org/netflix/E50914" },
    { name: "Microsoft", logo: "https://logo.clearbit.com/microsoft.com", fallback: "https://cdn.simpleicons.org/microsoft/0078D4" },
    { name: "Google", logo: "https://logo.clearbit.com/google.com", fallback: "https://cdn.simpleicons.org/google/4285F4" },
    { name: "Amazon", logo: "https://logo.clearbit.com/amazon.com", fallback: "https://cdn.simpleicons.org/amazon/FF9900" },
    { name: "Apple", logo: "https://logo.clearbit.com/apple.com", fallback: "https://cdn.simpleicons.org/apple/000000" },
    { name: "Salesforce", logo: "https://logo.clearbit.com/salesforce.com", fallback: "https://cdn.simpleicons.org/salesforce/00A1E0" },
    { name: "Adobe", logo: "https://logo.clearbit.com/adobe.com", fallback: "https://cdn.simpleicons.org/adobe/FF0000" },
    { name: "Oracle", logo: "https://logo.clearbit.com/oracle.com", fallback: "https://cdn.simpleicons.org/oracle/F80000" },
    { name: "SAP", logo: "https://logo.clearbit.com/sap.com", fallback: "https://cdn.simpleicons.org/sap/0FAAFF" },
    { name: "Cisco", logo: "https://logo.clearbit.com/cisco.com", fallback: "https://cdn.simpleicons.org/cisco/1BA0D7" },
    { name: "Dell", logo: "https://logo.clearbit.com/dell.com", fallback: "https://cdn.simpleicons.org/dell/007DB8" },
    { name: "HP", logo: "https://logo.clearbit.com/hp.com", fallback: "https://cdn.simpleicons.org/hp/0096D6" },
    { name: "Intel", logo: "https://logo.clearbit.com/intel.com", fallback: "https://cdn.simpleicons.org/intel/0071C5" },
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-6 bg-white/50 backdrop-blur-sm overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 mb-4 text-base md:text-lg font-medium">
          Join 800,000+ Highly Productive Teams
        </p>
        <div className="relative">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white/50 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling container */}
          <div className="flex animate-scroll gap-16 items-center">
            {duplicatedCompanies.map((company, index) => (
              <BrandLogo key={index} company={company} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ company }: { company: { name: string; logo: string; fallback: string } }) {
  const [imgSrc, setImgSrc] = useState(company.logo);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(company.fallback);
    }
  };

  return (
    <div className="flex-shrink-0 h-10 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
      <Image
        src={imgSrc}
        alt={company.name}
        width={120}
        height={48}
        className="h-6 md:h-8 w-auto object-contain"
        unoptimized
        onError={handleError}
      />
    </div>
  );
}
