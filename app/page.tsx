import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { SectionDivider } from "@/components/SectionDivider";
import { WhyVerification } from "@/components/WhyVerification";
import { WhatMembersGet } from "@/components/WhatMembersGet";
import { TopVendors } from "@/components/TopVendors";
import { TopCategories } from "@/components/TopCategories";
import { Testimonials } from "@/components/Testimonials";
import { FAQs } from "@/components/FAQs";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Hero />
        <TrustBar />
        <SectionDivider />
      </div>
      <WhyVerification />
      <WhatMembersGet />
      <TopVendors />
      <TopCategories />
      <Testimonials />
      <FAQs />
    </>
  );
}
