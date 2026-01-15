"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceGrid } from "@/components/marketplace/MarketplaceGrid";
import { getAllVendors } from "@/data/marketplace-products";

// Get all vendors from products data
const allVendors = getAllVendors();

// Legacy sample vendor data - kept for fallback (can be removed once all categories have products)
const sampleVendors = [
  {
    id: "clickup",
    name: "ClickUp",
    description: "All-in-one productivity platform that combines project management, docs, goals, and time tracking in one unified workspace.",
    category: "Project Management",
    logo: "/assets/marketplace/clickup.png",
    rating: 4.7,
    verified: true,
    pricing: "Free plan available, paid from $7/user/month",
    features: ["Mobile App", "API Access", "Custom Integrations", "Multi-user"],
  },
  {
    id: "monday",
    name: "Monday.com",
    description: "Work operating system that powers teams to run projects and workflows with confidence. Visual and intuitive project management.",
    category: "Project Management",
    logo: "/assets/marketplace/Monday.com.svg",
    rating: 4.6,
    verified: true,
    pricing: "Starting at $8/user/month",
    features: ["Cloud-based", "Mobile App", "24/7 Support", "White-label"],
  },
  {
    id: "asana",
    name: "Asana",
    description: "Work management platform that helps teams orchestrate their work, from daily tasks to strategic initiatives.",
    category: "Project Management",
    logo: "/assets/marketplace/Asana.svg",
    rating: 4.4,
    verified: true,
    pricing: "Free plan available, paid from $10.99/user/month",
    features: ["Cloud-based", "Mobile App", "Custom Integrations", "Multi-user"],
  },
  {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform. Transform your business with AI-powered sales, service, and marketing solutions.",
    category: "CRM",
    logo: "/assets/marketplace/Salesforce.svg",
    rating: 4.5,
    verified: true,
    pricing: "Starting at $25/user/month",
    features: ["Cloud-based", "Mobile App", "API Access", "24/7 Support"],
  },
  {
    id: "jira",
    name: "Jira",
    description: "Plan, track, and release world-class software with the #1 software development tool used by agile teams.",
    category: "Software Development",
    logo: "/assets/marketplace/Jira.svg",
    rating: 4.3,
    verified: true,
    pricing: "Starting at $7.75/user/month",
    features: ["Cloud-based", "API Access", "Custom Integrations", "Multi-user"],
  },
  {
    id: "trello",
    name: "Trello",
    description: "Organize anything with anyone, anywhere. Trello helps teams move work forward with boards, lists, and cards.",
    category: "Project Management",
    logo: "/assets/marketplace/Trello.svg",
    rating: 4.5,
    verified: true,
    pricing: "Free plan available, paid from $5/user/month",
    features: ["Cloud-based", "Mobile App", "Custom Integrations", "Multi-user"],
  },
  {
    id: "slack",
    name: "Slack",
    description: "Where work happens. Connect the right people, find information, and automate your workflows.",
    category: "Communication",
    logo: "/assets/marketplace/Discord.svg",
    rating: 4.5,
    verified: true,
    pricing: "Free plan available, paid from $7.25/user/month",
    features: ["Cloud-based", "Mobile App", "API Access", "24/7 Support"],
  },
  {
    id: "zendesk",
    name: "Zendesk",
    description: "Build better customer relationships with the Zendesk customer service platform. Support, sales, and customer engagement software.",
    category: "Support",
    logo: "/assets/marketplace/Zendesk.svg",
    rating: 4.4,
    verified: true,
    pricing: "Starting at $55/agent/month",
    features: ["Cloud-based", "Mobile App", "API Access", "24/7 Support"],
  },
  {
    id: "airtable",
    name: "Airtable",
    description: "Part spreadsheet, part database, and entirely flexible. Organize anything with Airtable's powerful platform.",
    category: "Productivity",
    logo: "/assets/marketplace/AirTable.svg",
    rating: 4.6,
    verified: true,
    pricing: "Free plan available, paid from $12/user/month",
    features: ["Cloud-based", "Mobile App", "API Access", "Custom Integrations"],
  },
  {
    id: "miro",
    name: "Miro",
    description: "The online collaborative whiteboard platform to bring teams together, anytime, anywhere.",
    category: "Collaboration",
    logo: "/assets/marketplace/Miro.svg",
    rating: 4.7,
    verified: true,
    pricing: "Free plan available, paid from $8/user/month",
    features: ["Cloud-based", "Real-time Collaboration", "Custom Integrations", "Multi-user"],
  },
  {
    id: "calendly",
    name: "Calendly",
    description: "Schedule meetings without the back-and-forth emails. The automated scheduling platform that works for you.",
    category: "Productivity",
    logo: "/assets/marketplace/Calendly.svg",
    rating: 4.6,
    verified: true,
    pricing: "Free plan available, paid from $8/user/month",
    features: ["Cloud-based", "Calendar Integration", "Custom Integrations", "Multi-user"],
  },
  {
    id: "intercom",
    name: "Intercom",
    description: "The complete customer engagement platform. Connect with customers through messaging, email, and more.",
    category: "Support",
    logo: "/assets/marketplace/Intercom.svg",
    rating: 4.5,
    verified: true,
    pricing: "Starting at $74/month",
    features: ["Cloud-based", "Mobile App", "API Access", "24/7 Support"],
  },
];

function MarketplaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    pricing: [] as string[],
    features: [] as string[],
  });
  const hasInitializedFromUrl = useRef(false);

  // Read category from URL query params and apply it (only once on initial load)
  useEffect(() => {
    // Only apply category from URL on initial load, not when filters change
    if (hasInitializedFromUrl.current) return;

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      hasInitializedFromUrl.current = true;
      const decodedCategory = decodeURIComponent(categoryParam);
      // Check if the category exists in the marketplace filter options
      const categoryOptions = [
        "HR Software",
        "CRM Software",
        "Billing & Accounting Software",
        "POS Software",
        "Email Marketing",
        "Real Estate",
        "Design Tools",
        "Collaboration",
        "Productivity",
        "Cloud Storage",
        "Payments",
        "Transportation",
        "Education",
        "Cybersecurity",
        "Development Tools",
        "Hospitality",
        "Consulting",
        "Construction",
        "LegalTech",
        "Energy",
        "IT Management",
        "Banking",
        "Automotive",
        "Nonprofit",
        "Operations",
        "Manufacturing",
        "Insurance",
        "Media",
        "Website Builders",
        "CMS Platforms",
        "Data Analytics",
        "Conferencing",
        "Marketing",
        "Finance",
      ];
      
      // If category matches a filter option, add it to filters
      if (categoryOptions.includes(decodedCategory)) {
        setFilters((prev) => ({
          ...prev,
          categories: [decodedCategory],
        }));
      } else {
        // If category doesn't match filter options, use it as search query
        setSearchQuery(decodedCategory);
      }

      // Clear the URL param after applying it to prevent interference with manual filter changes
      const url = new URL(window.location.href);
      url.searchParams.delete("category");
      router.replace(url.pathname + url.search, { scroll: false });

      // Scroll to search section after a short delay to ensure DOM is ready
      // Scroll just enough so the search section becomes sticky (at top-28 = 112px)
      setTimeout(() => {
        const searchElement = document.getElementById("marketplace-search");
        if (searchElement) {
          const elementTop = searchElement.getBoundingClientRect().top + window.pageYOffset;
          const stickyOffset = 112; // top-28 = 7rem = 112px
          const scrollPosition = elementTop - stickyOffset;
          
          window.scrollTo({
            top: scrollPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    }
  }, [searchParams, router]);

  // Filter and search vendors
  const filteredVendors = useMemo(() => {
    // Use products data first, fallback to sample vendors if needed
    let result = allVendors.length > 0 ? [...allVendors] : [...sampleVendors];

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (vendor) =>
          vendor.name.toLowerCase().includes(query) ||
          vendor.description.toLowerCase().includes(query) ||
          vendor.category.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (filters.categories.length > 0) {
      result = result.filter((vendor) =>
        filters.categories.includes(vendor.category)
      );
    }

    // Pricing filter (simplified - in production, you'd parse pricing strings)
    if (filters.pricing.length > 0) {
      result = result.filter((vendor) => {
        const pricing = vendor.pricing?.toLowerCase() || "";
        return filters.pricing.some((filterPrice) => {
          if (filterPrice === "Free" || filterPrice === "Free Trial") {
            return pricing.includes("free");
          }
          // Add more sophisticated pricing matching logic here
          return true;
        });
      });
    }

    // Features filter
    if (filters.features.length > 0) {
      result = result.filter((vendor) =>
        filters.features.some((feature) =>
          vendor.features?.includes(feature)
        )
      );
    }

    return result;
  }, [searchQuery, filters]);

  return (
    <>
      <div className="flex flex-col">
        <MarketplaceHero />
      </div>

      <MarketplaceFilters
        isOpen={filtersOpen}
        onClose={() => setFiltersOpen(false)}
        filters={filters}
        onFiltersChange={setFilters}
      />

      <MarketplaceGrid 
        vendors={filteredVendors} 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
      />
    </>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading marketplace...</p>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  );
}