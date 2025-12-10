"use client";

import { MarketplaceCard } from "./MarketplaceCard";
import { useEffect, useRef, useState } from "react";
import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

interface Vendor {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  image?: string;
  rating?: number;
  verified: boolean;
  pricing?: string;
  features?: string[];
}

interface MarketplaceGridProps {
  vendors: Vendor[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

type SortOption = "relevance" | "rating" | "name-asc" | "name-desc";

export function MarketplaceGrid({ vendors, searchQuery, onSearchChange }: MarketplaceGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Discover");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const sortButtonRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  
  // Calculate dropdown position when menu opens
  useEffect(() => {
    if (showSortMenu && sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right,
      });
    }
  }, [showSortMenu]);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "relevance", label: "Most Relevant" },
    { value: "rating", label: "Highest Rated" },
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
  ];

  const tabs = [
    "Discover",
    "Featured",
    "Top 2025 apps",
    "Trending",
    "Editor's choice",
    "New",
    "Solutions",
    "CRM",
    "Integrations",
    "Marketing",
    "Project management",
    "Software development",
  ];

  const updateScrollState = () => {
    const el = tabsRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    const left = el.scrollLeft;
    setCanScrollLeft(left > 1);
    setCanScrollRight(left < maxScroll - 1);
  };

  const scrollTabs = (direction: "left" | "right") => {
    const el = tabsRef.current;
    if (!el) return;
    const amount = 260;
    el.scrollBy({ left: direction === "left" ? -amount : amount, behavior: "smooth" });
    window.requestAnimationFrame(() => {
      setTimeout(updateScrollState, 180);
    });
  };

  useEffect(() => {
    updateScrollState();
    const el = tabsRef.current;
    if (!el) return;
    const handleScroll = () => updateScrollState();
    el.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, []);

  // Filter vendors by active tab category
  const filteredByTab = vendors.filter((vendor) => {
    if (activeTab === "Discover") {
      return true; // Show all vendors for Discover
    }
    
    // Map tab names to categories
    const categoryMap: Record<string, string> = {
      "CRM": "CRM",
      "Marketing": "Marketing",
      "Project management": "Project Management",
      "Software development": "Software Development",
    };
    
    const category = categoryMap[activeTab];
    if (category) {
      return vendor.category === category;
    }
    
    // For other tabs (Featured, Top 2025 apps, Trending, etc.), show all for now
    // In production, you'd have special filtering logic for these
    return true;
  });

  const sortedVendors = [...filteredByTab].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return (b.rating || 0) - (a.rating || 0);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  return (
    <section className="pt-4 pb-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Search Bar */}
        <div className="max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="50">
          <div
            className={`bg-white border-2 rounded-full shadow-lg flex items-center px-6 py-4 transition-all ${
              isSearchFocused ? "border-[#12b76a]" : "border-gray-300"
            }`}
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-gray-400 mr-4 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setIsSearchFocused(false)}
              placeholder="Search for software, vendors, or categories..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-base md:text-lg"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="relative group" data-aos="fade-up" data-aos-delay="100">
          {/* Arrows - aligned with tabs */}
          {canScrollLeft && (
            <div className="absolute left-0 top-[-8px] bottom-0 flex items-center z-20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <button
                onClick={() => scrollTabs("left")}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Scroll tabs left"
                disabled={!canScrollLeft}
              >
                <ChevronLeftIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
          {canScrollRight && (
            <div className="absolute right-0 top-[-8px] bottom-0 flex items-center z-20 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition">
              <button
                onClick={() => scrollTabs("right")}
                className="p-2 rounded-full bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 transition disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Scroll tabs right"
                disabled={!canScrollRight}
              >
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
          <div
            ref={tabsRef}
            className="flex items-center gap-2 overflow-x-auto pb-2 px-10 no-scrollbar min-h-[44px] relative z-0"
            style={{
              maskImage: canScrollLeft && canScrollRight
                ? 'linear-gradient(to right, transparent 0%, transparent 8%, black 20%, black 80%, transparent 92%, transparent 100%)'
                : canScrollLeft
                ? 'linear-gradient(to right, transparent 0%, transparent 8%, black 20%, black 100%)'
                : canScrollRight
                ? 'linear-gradient(to right, black 0%, black 80%, transparent 92%, transparent 100%)'
                : 'none',
              WebkitMaskImage: canScrollLeft && canScrollRight
                ? 'linear-gradient(to right, transparent 0%, transparent 8%, black 20%, black 80%, transparent 92%, transparent 100%)'
                : canScrollLeft
                ? 'linear-gradient(to right, transparent 0%, transparent 8%, black 20%, black 100%)'
                : canScrollRight
                ? 'linear-gradient(to right, black 0%, black 80%, transparent 92%, transparent 100%)'
                : 'none',
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 rounded-lg text-sm whitespace-nowrap border transition-colors bg-white ${
                  activeTab === tab
                    ? "border-[#12b76a] text-[#12b76a]"
                    : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filters + Sort bar */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between relative" data-aos="fade-up" data-aos-delay="150" style={{ zIndex: 40 }}>
          <div className="flex items-center">
            <span className="text-sm text-gray-600">
              Showing <span className="font-semibold text-gray-900">{sortedVendors.length}</span>{" "}
              {sortedVendors.length === 1 ? "result" : "results"}
            </span>
          </div>
          
          <div className="relative" ref={sortButtonRef} style={{ zIndex: 45 }}>
            <button
              onClick={() => {
                setShowSortMenu(!showSortMenu);
              }}
              className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors relative"
            >
              <span>Sort: {sortOptions.find((opt) => opt.value === sortBy)?.label}</span>
              {sortBy === "name-asc" ? (
                <BarsArrowUpIcon className="w-4 h-4" />
              ) : sortBy === "name-desc" ? (
                <BarsArrowDownIcon className="w-4 h-4" />
              ) : null}
            </button>

            {showSortMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowSortMenu(false)}
                />
                <div 
                  className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-1 z-45"
                  style={{ 
                    zIndex: 45,
                    position: 'absolute'
                  }}
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setShowSortMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                        sortBy === option.value
                          ? "text-[#12b76a] font-medium bg-green-50"
                          : "text-gray-700"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
          {/* <div className="flex items-center gap-3 flex-wrap text-sm text-gray-700">
            <span className="font-semibold text-gray-900">Filter by:</span>
            {["Feature/1", "Payment", "Developer"].map((label) => (
              <button
                key={label}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50 transition-colors"
              >
                <span>{label}</span>
                <ChevronDownIcon className="w-4 h-4 text-gray-500" />
              </button>
            ))}
            <button className="text-[#12b76a] hover:text-green-700">Clear all</button>
          </div> */}
        </div>

        {/* Grid */}
        {sortedVendors.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200" style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
            {sortedVendors.map((vendor, index) => (
              <MarketplaceCard key={vendor.id} vendor={vendor} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16" data-aos="fade-up" data-aos-delay="200">
            <div className="text-gray-400 text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No results found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

