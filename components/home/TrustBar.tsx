"use client";

import Image from "next/image";

export function TrustBar() {
  const companies = [
    { name: "Zoho", logo: "/assets/trustbar-logos/zoho.svg" },
    { name: "Vtiger", logo: "/assets/trustbar-logos/vtiger.svg" },
    { name: "Clickup", logo: "/assets/trustbar-logos/clickup.svg" },
    { name: "Keka", logo: "/assets/trustbar-logos/keka.svg" },
    { name: "Swipe", logo: "/assets/trustbar-logos/swipe.svg" },
    { name: "SAP", logo: "/assets/trustbar-logos/sap.svg" },
    // { name: "Xero", logo: "/assets/trustbar-logos/xero.svg" },
    { name: "Freshbooks", logo: "/assets/trustbar-logos/freshbooks.svg" },
    { name: "Hubspot", logo: "/assets/trustbar-logos/hubspot.svg" },
  ];

  // Duplicate the array to create seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-6 overflow-hidden" data-aos="fade-up">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        {/* Mobile: Text centered above logos */}
        <div className="md:hidden text-center text-gray-800 font-medium text-sm mb-4">
          Trusted by the best
        </div>
        
        <div className="flex items-center gap-8">
          {/* Desktop: Text on the left */}
          <div className="hidden md:block text-gray-800 font-medium whitespace-nowrap flex-shrink-0">
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
