import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { WhyVerification } from "@/components/WhyVerification";
import { HowItWorks } from "@/components/HowItWorks";
import { TopCategories } from "@/components/TopCategories";
import { TopVendors } from "@/components/TopVendors";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <WhyVerification />
      <HowItWorks />
      <TopCategories />
      <TopVendors />
    </>
  );
}
