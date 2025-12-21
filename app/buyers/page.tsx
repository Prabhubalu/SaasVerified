"use client";

import { BuyersHero } from "@/components/buyers/BuyersHero";
import { WhyBuyingIsHard } from "@/components/buyers/WhyBuyingIsHard";
import { BuyerJourney } from "@/components/buyers/BuyerJourney";
import { ExploreMarketplace } from "@/components/buyers/ExploreMarketplace";
import { WhatYouGet } from "@/components/buyers/WhatYouGet";
import { BuyerProtection } from "@/components/buyers/BuyerProtection";
import { BuyerCaseStudies } from "@/components/buyers/BuyerCaseStudies";
import { BuyerFAQs } from "@/components/buyers/BuyerFAQs";
import { FinalCTA } from "@/components/common/FinalCTA";

export default function BuyersPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <BuyersHero />
      </div>
      <WhyBuyingIsHard />
      <BuyerJourney />
      <ExploreMarketplace />
      <WhatYouGet />
      <BuyerProtection />
      <BuyerCaseStudies />
      <BuyerFAQs />
      <FinalCTA />
    </>
  );
}

