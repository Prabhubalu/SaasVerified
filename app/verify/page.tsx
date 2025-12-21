import { VerifyHero } from "@/components/verify/VerifyHero";
import { WhyVerificationExists } from "@/components/verify/WhyVerificationExists";
import { VerificationProcess } from "@/components/verify/VerificationProcess";
import { WhatWeAuditVerify } from "@/components/verify/WhatWeAuditVerify";
import { ScoringSection } from "@/components/verify/ScoringSection";
import { VerifyFinalCTA } from "@/components/verify/VerifyFinalCTA";
import { VendorModal } from "@/components/modals/VendorModal";

export default function VerifyPage() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <VerifyHero />
      </div>
      <WhyVerificationExists />
      <VerificationProcess />
      <WhatWeAuditVerify />
      <ScoringSection />
      <VerifyFinalCTA />
      <VendorModal />
    </>
  );
}

