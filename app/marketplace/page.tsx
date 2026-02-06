"use client";

import { useState, useMemo, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MarketplaceHero } from "@/components/marketplace/MarketplaceHero";
import { MarketplaceFilters } from "@/components/marketplace/MarketplaceFilters";
import { MarketplaceGrid } from "@/components/marketplace/MarketplaceGrid";
import { getAllVendorsWithCategory, getCategories, catalogData } from "@/data/catalog";

// Helper function to get vendor logo filename (capitalize first letter, remove spaces)
const getVendorLogoFilename = (name: string): string => {
  const cleanName = name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '');
  return cleanName.charAt(0).toUpperCase() + cleanName.slice(1).toLowerCase();
};

// Transform catalog vendors to match MarketplaceCard format
const allVendors = getAllVendorsWithCategory().map((vendor, index) => ({
  id: vendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
  name: vendor.name,
  description: vendor.description,
  category: vendor.category,
  logo: `/assets/vendor_logos/${getVendorLogoFilename(vendor.name)}.png`,
  rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
  verified: true,
  pricing: "Contact for pricing",
  features: ["Cloud-based", "API Access"],
  website: vendor.url
}));

function MarketplaceContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    categories: [] as string[],
    pricing: [] as string[],
    features: [] as string[],
  });
  const hasInitializedFromUrl = useRef(false);

  // Debounce search query for better performance
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 150); // 150ms debounce

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Read category from URL query params and apply it (only once on initial load)
  useEffect(() => {
    // Only apply category from URL on initial load, not when filters change
    if (hasInitializedFromUrl.current) return;

    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      hasInitializedFromUrl.current = true;
      const decodedCategory = decodeURIComponent(categoryParam);
      // Check if the category exists in the marketplace filter options
      const categoryOptions = getCategories();
      
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
    // Use vendors from catalog
    let result = [...allVendors];

    // Search filter
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
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
  }, [debouncedSearchQuery, filters]);

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