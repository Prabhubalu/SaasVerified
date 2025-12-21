"use client";

import { VendorsHero } from "@/components/vendors/VendorsHero";
import { WhyVendorsGetVerified } from "@/components/vendors/WhyVendorsGetVerified";
import { VerificationBadge } from "@/components/ui/VerificationBadge";
import { VerificationTiers } from "@/components/ui/VerificationTiers";
import { WhatWeAudit } from "@/components/home/WhatWeAudit";
import { SuccessMetrics } from "@/components/home/SuccessMetrics";
import { ProcessOverview } from "@/components/home/ProcessOverview";
import { VendorPricingSummary } from "@/components/vendors/VendorPricingSummary";
import { VendorFAQs } from "@/components/vendors/VendorFAQs";
import { VendorFinalCTA } from "@/components/vendors/VendorFinalCTA";
import { VendorModal } from "@/components/modals/VendorModal";

export default function VendorsPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <VendorsHero />
      </div>
      <WhyVendorsGetVerified />
      <VerificationBadge />
      <VerificationTiers />
      <WhatWeAudit />
      <SuccessMetrics />
      <ProcessOverview />
      <VendorPricingSummary />
      <VendorFAQs />
      <VendorFinalCTA />
      <VendorModal />
    </>
  );
}

