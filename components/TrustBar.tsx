"use client";

import Image from "next/image";

export function TrustBar() {
  const companies = [
    { name: "Booking.com", logo: "/assets/trustbar-logos/booking.svg" },
    { name: "IBM", logo: "/assets/trustbar-logos/ibm.svg" },
    { name: "Logitech", logo: "/assets/trustbar-logos/logitech.svg" },
    { name: "Fortinet", logo: "/assets/trustbar-logos/fortinet.svg" },
    { name: "TIBCO", logo: "/assets/trustbar-logos/tibco.svg" },
    { name: "Spotify", logo: "/assets/trustbar-logos/spotify.svg" },
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-6 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          {/* "Trusted by the best" text on the left */}
          <div className="text-gray-800 font-medium whitespace-nowrap flex-shrink-0">
            Trusted by the best
          </div>
          
          {/* Scrolling container */}
          <div className="flex-1 overflow-hidden">
            <div className="flex animate-scroll gap-12 md:gap-16 items-center">
              {duplicatedCompanies.map((company, index) => (
                <BrandLogo key={index} company={company} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BrandLogo({ company }: { company: { name: string; logo: string } }) {
  return (
    <div className="flex-shrink-0 h-8 flex items-center justify-center grayscale opacity-70">
      <Image
        src={company.logo}
        alt={company.name}
        width={120}
        height={48}
        className="h-6 md:h-8 w-auto object-contain"
      />
    </div>
  );
}
