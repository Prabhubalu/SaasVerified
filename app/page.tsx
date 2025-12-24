import { Suspense } from "react";
import { Hero } from "@/components/home/Hero";
import { TrustBar } from "@/components/home/TrustBar";
import { SectionDivider } from "@/components/home/SectionDivider";
import { WhyVerification } from "@/components/home/WhyVerification";
import { WhatMembersGet } from "@/components/home/WhatMembersGet";
import { TopVendors } from "@/components/home/TopVendors";
import { TopCategories } from "@/components/home/TopCategories";
import { Testimonials } from "@/components/home/Testimonials";
import { FAQs } from "@/components/home/FAQs";

export default function Home() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-600">Loading...</p>
          </div>
        }>
          <Hero />
        </Suspense>
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
