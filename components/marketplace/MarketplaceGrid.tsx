"use client";

import { MarketplaceCard } from "./MarketplaceCard";
import { useEffect, useRef, useState, useMemo } from "react";
import {
  BarsArrowUpIcon,
  BarsArrowDownIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { getCategories } from "@/data/catalog";

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
  website?: string;
}

interface MarketplaceGridProps {
  vendors: Vendor[];
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filters?: {
    categories: string[];
    pricing: string[];
    features: string[];
  };
  onFiltersChange?: (filters: {
    categories: string[];
    pricing: string[];
    features: string[];
  }) => void;
}

type SortOption = "relevance" | "name-asc" | "name-desc";

export function MarketplaceGrid({ 
  vendors, 
  searchQuery, 
  onSearchChange,
  filters,
  onFiltersChange
}: MarketplaceGridProps) {
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [activeTab, setActiveTab] = useState("Discover");

  // Get categories from catalog and add "Discover" as first tab
  const catalogCategories = getCategories();
  const tabs = ["Discover", ...catalogCategories];

  // Sync active tab with category filter
  useEffect(() => {
    if (filters?.categories && filters.categories.length > 0) {
      const category = filters.categories[0];
      // If the category matches a tab name, set it as active
      if (tabs.includes(category)) {
        setActiveTab(category);
      }
    } else if (filters?.categories && filters.categories.length === 0) {
      setActiveTab("Discover");
    }
  }, [filters?.categories]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
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
    { value: "name-asc", label: "Name (A-Z)" },
    { value: "name-desc", label: "Name (Z-A)" },
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

  // Detect when sticky section becomes sticky (at top-40 = 160px)
  useEffect(() => {
    const handleScroll = () => {
      if (stickyRef.current) {
        const rect = stickyRef.current.getBoundingClientRect();
        // Check if element is at or near the sticky position (top-40 = 160px)
        setIsSticky(rect.top <= 160);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle tab click - update parent filters
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    
    // Update parent filters if we have the handler
    if (onFiltersChange && filters) {
      if (tab === "Discover") {
        // Clear category filter for Discover tab
        onFiltersChange({
          ...filters,
          categories: [],
        });
      } else {
        // Set category filter for category tabs (tab name is the category name)
        onFiltersChange({
          ...filters,
          categories: [tab],
        });
      }
    }
  };

  const sortedVendors = useMemo(() => {
    if (sortBy === "name-asc") {
      return [...vendors].sort((a, b) => 
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } else if (sortBy === "name-desc") {
      return [...vendors].sort((a, b) => 
        b.name.toLowerCase().localeCompare(a.name.toLowerCase())
      );
    }
    // "relevance" - keep original order
    return [...vendors];
  }, [vendors, sortBy]);

  return (
    <section className="pt-4 pb-8 relative">
      {/* Sticky Search and Filters Section */}
      <div 
        id="marketplace-search"
        ref={stickyRef}
        className={`sticky top-28 z-40 transition-all duration-200 mb-6 ${
          isSticky 
            ? "bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm pt-8 pb-4" 
            : "pt-6 pb-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full space-y-4">
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto w-full" data-aos="fade-up" data-aos-delay="50">
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
              {searchQuery.trim() && (
                <button
                  type="button"
                  onClick={() => onSearchChange("")}
                  className="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                  aria-label="Clear search"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              )}
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
                onClick={() => handleTabClick(tab)}
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
        <div className="flex flex-row items-center justify-center gap-4 md:justify-between relative" data-aos="fade-up" data-aos-delay="150">
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
        </div>
      </div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        {/* Grid */}
        {sortedVendors.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" data-aos="fade-up" data-aos-delay="200" style={{ position: 'relative', zIndex: 1, isolation: 'isolate' }}>
            {sortedVendors.map((vendor, index) => (
              <MarketplaceCard key={`${vendor.id}-${sortBy}-${index}`} vendor={vendor} index={index} />
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
