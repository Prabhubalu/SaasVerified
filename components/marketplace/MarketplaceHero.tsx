"use client";

import Image from "next/image";
import { VendorLogoSlider } from "@/components/vendors/VendorLogoSlider";

interface MarketplaceHeroProps {
  // Removed search-related props as search is now in MarketplaceGrid
}

export function MarketplaceHero({}: MarketplaceHeroProps) {

  // Vendor logos for the slider - ordered for top/bottom rows
  const vendorLogos = [
    { name: "ClickUp", logo: "/assets/marketplace/clickup.png" },
    { name: "Tableau", logo: "/assets/marketplace/Tableau.svg" },
    { name: "Discord", logo: "/assets/marketplace/Discord.svg" },
    { name: "Miro", logo: "/assets/marketplace/Miro.svg" },
    { name: "Calendly", logo: "/assets/marketplace/Calendly.svg" },
    { name: "Bugsnag", logo: "/assets/marketplace/Bugsnag.svg" },
    { name: "Twilio", logo: "/assets/marketplace/Twilio.svg" },
    { name: "Typeform", logo: "/assets/marketplace/Typeform.svg" },
    { name: "outlook", logo: "/assets/marketplace/outlook.svg" },
    { name: "Savemyleads", logo: "/assets/marketplace/Savemyleads.svg" },
    { name: "Notion", logo: "/assets/marketplace/Make.svg" },
    { name: "Marker.io", logo: "/assets/marketplace/Marker.io.svg" },
    { name: "Google Hangouts", logo: "/assets/marketplace/GoogleHangouts.svg" },
    { name: "Intercom", logo: "/assets/marketplace/Intercom.svg" },
    { name: "Jira", logo: "/assets/marketplace/Jira.svg" },
    { name: "Monday.com", logo: "/assets/marketplace/Monday.com.svg" },
    { name: "Asana", logo: "/assets/marketplace/Asana.svg" },
    { name: "Giphy", logo: "/assets/marketplace/Giphy.svg" },
    { name: "Grammarly", logo: "/assets/marketplace/Grammarly.svg" },
    { name: "Confluence", logo: "/assets/marketplace/Confluence.png" },
    { name: "Box", logo: "/assets/marketplace/Box.svg" },
    { name: "Zendesk", logo: "/assets/marketplace/Zendesk.svg" },
    { name: "Canny", logo: "/assets/marketplace/Canny.svg" },
    { name: "Salesforce", logo: "/assets/marketplace/Salesforce.svg" },
    { name: "MicrosoftTeams", logo: "/assets/marketplace/MicrosoftTeams.svg" },
    { name: "Sunsama", logo: "/assets/marketplace/Sunsama.svg" },
    { name: "SupportBee", logo: "/assets/marketplace/SupportBee.svg" },
    { name: "ClickUp Alt", logo: "/assets/marketplace/clickup.png" },
    { name: "Slab", logo: "/assets/marketplace/Slab.svg" },
    { name: "Trello", logo: "/assets/marketplace/Trello.svg" },
    { name: "Evernote", logo: "/assets/marketplace/Evernote.svg" },
    { name: "Clockify", logo: "/assets/marketplace/Clockify.svg" },
    { name: "AirTable", logo: "/assets/marketplace/AirTable.svg" },
    { name: "Miro 2", logo: "/assets/marketplace/Miro.svg" },
    { name: "Sentry", logo: "/assets/marketplace/Sentry.svg" },
    { name: "Twilio Alt", logo: "/assets/marketplace/Twilio.svg" },
    { name: "LambdaTest", logo: "/assets/marketplace/LambdaTest.svg" },
    { name: "TMetric", logo: "/assets/marketplace/Timely.svg" },
    { name: "Timely", logo: "/assets/marketplace/Timely.svg" },
    { name: "Todoist", logo: "/assets/marketplace/Todoist.svg" },
    { name: "Wrike", logo: "/assets/marketplace/Wrike.svg" },
    { name: "Sunsama 2", logo: "/assets/marketplace/Sunsama.svg" },
    { name: "ClickUp 3", logo: "/assets/marketplace/clickup.png" },
    { name: "Protractor", logo: "/assets/marketplace/Protractor.svg" },
    { name: "Jotform", logo: "/assets/marketplace/jotform.png" },
    { name: "Shift", logo: "/assets/marketplace/Shift.svg" },
    { name: "Front", logo: "/assets/marketplace/Front.svg" },
    { name: "Userback", logo: "/assets/marketplace/Userback.svg" },
    { name: "n8n", logo: "/assets/marketplace/n8n.svg" },
    { name: "WebWork", logo: "/assets/marketplace/WebWork.svg" },
    { name: "Zohoflow", logo: "/assets/marketplace/Zohoflow.svg" },
    { name: "Unito", logo: "/assets/marketplace/Unito.svg" },
    { name: "TimeDoctor", logo: "/assets/marketplace/TimeDoctor.svg" },
    { name: "TestLodge", logo: "/assets/marketplace/TestLodge.svg" },
    { name: "PractiTest", logo: "/assets/marketplace/PractiTest.svg" },
    { name: "Sleekplan", logo: "/assets/marketplace/Sleekplan.svg" },
    { name: "Basecamp", logo: "/assets/marketplace/Basecamp.svg" },
    { name: "Box", logo: "/assets/marketplace/Box.svg" },
    { name: "Make", logo: "/assets/marketplace/Make.svg" },
    { name: "LambdaTest", logo: "/assets/marketplace/LambdaTest.svg" },
  ];

  // Central logo (SaaS Verified logo)
  const centerLogo = {
    name: "SaaS Verified",
    logo: "/assets/saas-verified-logo.png",
  };

  return (
    <section className="relative pt-40 md:pt-48 pb-4 md:pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 leading-tight">
          Find Verified SaaS Tools <br/><span className="text-[#12b76a] leading-tight">You Can Trust</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Browse our curated marketplace of verified software vendors. Every product has been thoroughly audited for your peace of mind.
          </p>
        </div>

        {/* Vendor Logo Slider - Above the fold */}
        <div className="" data-aos="fade-up" data-aos-delay="50">
          <VendorLogoSlider vendors={vendorLogos} centerLogo={centerLogo} />
        </div>


        {/* Results Count */}
        {/* {resultsCount !== undefined && (
          <div className="text-center text-sm text-gray-600" data-aos="fade-up" data-aos-delay="150">
            {resultsCount > 0 ? (
              <span>
                Found <span className="font-semibold text-gray-900">{resultsCount}</span> verified{" "}
                {resultsCount === 1 ? "solution" : "solutions"}
              </span>
            ) : (
              <span>No results found. Try adjusting your filters.</span>
            )}
          </div>
        )} */}


        {/* Quick Category Filters */}
        {/* <div className="flex flex-wrap justify-center gap-3 mt-8" data-aos="fade-up" data-aos-delay="200">
          {[
            "All Categories",
            "CRM",
            "HRMS",
            "Support",
            "Automation",
            "Finance",
            "Billing",
          ].map((category, index) => (
            <button
              key={category}
              className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors"
            >
              {category}
            </button>
          ))}
        </div> */}



      </div>
    </section>
  );
}

