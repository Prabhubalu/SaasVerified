import type { Metadata } from "next";
import { AboutHero } from "@/components/about/AboutHero";
import { WhyWeExist } from "@/components/about/WhyWeExist";
import { OurMission } from "@/components/about/OurMission";
import { FoundingStory } from "@/components/about/FoundingStory";
// import { Leadership } from "@/components/about/Leadership";
// import { TrustedBy } from "@/components/about/TrustedBy";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SaaS Verify and our mission to bring transparency to software procurement through comprehensive verification and trusted insights.",
  openGraph: {
    title: "About Us | SaaS Verify",
    description: "Learn about SaaS Verify and our mission to bring transparency to software procurement.",
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <WhyWeExist />
      <OurMission />
      <FoundingStory />
      {/* <Leadership /> */}
      {/* <TrustedBy /> */}
    </>
  );
}

