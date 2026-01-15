"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface MarketplaceFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  filters: {
    categories: string[];
    pricing: string[];
    features: string[];
  };
  onFiltersChange: (filters: {
    categories: string[];
    pricing: string[];
    features: string[];
  }) => void;
}

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

const pricingOptions = [
  "Free",
  "Free Trial",
  "$0 - $50/month",
  "$50 - $200/month",
  "$200 - $500/month",
  "$500+/month",
];

const featureOptions = [
  "Mobile App",
  "API Access",
  "24/7 Support",
  "Multi-user",
  "Cloud-based",
  "On-premise",
  "Custom Integrations",
  "White-label",
];

export function MarketplaceFilters({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
}: MarketplaceFiltersProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    pricing: true,
    features: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleFilter = (
    type: "categories" | "pricing" | "features",
    value: string
  ) => {
    const currentFilters = filters[type];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter((f) => f !== value)
      : [...currentFilters, value];

    onFiltersChange({
      ...filters,
      [type]: newFilters,
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      categories: [],
      pricing: [],
      features: [],
    });
  };

  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.pricing.length > 0 ||
    filters.features.length > 0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-white h-full w-full max-w-md shadow-2xl overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
            {hasActiveFilters && (
              <button
                onClick={clearAllFilters}
                className="text-sm text-[#12b76a] hover:text-green-700 mt-1"
              >
                Clear all
              </button>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Close filters"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Filter Sections */}
        <div className="px-6 py-4 space-y-6">
          {/* Categories */}
          <div>
            <button
              onClick={() => toggleSection("categories")}
              className="w-full flex items-center justify-between text-left mb-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">Categories</h3>
              {openSections.categories ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openSections.categories && (
              <div className="space-y-2">
                {categoryOptions.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={() => toggleFilter("categories", category)}
                      className="w-4 h-4 rounded border-gray-300 text-[#12b76a] focus:ring-[#12b76a] focus:ring-2"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {category}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Pricing */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => toggleSection("pricing")}
              className="w-full flex items-center justify-between text-left mb-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">Pricing</h3>
              {openSections.pricing ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openSections.pricing && (
              <div className="space-y-2">
                {pricingOptions.map((price) => (
                  <label
                    key={price}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.pricing.includes(price)}
                      onChange={() => toggleFilter("pricing", price)}
                      className="w-4 h-4 rounded border-gray-300 text-[#12b76a] focus:ring-[#12b76a] focus:ring-2"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {price}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <button
              onClick={() => toggleSection("features")}
              className="w-full flex items-center justify-between text-left mb-3"
            >
              <h3 className="text-lg font-semibold text-gray-900">Features</h3>
              {openSections.features ? (
                <ChevronUpIcon className="w-5 h-5 text-gray-400" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-gray-400" />
              )}
            </button>
            {openSections.features && (
              <div className="space-y-2">
                {featureOptions.map((feature) => (
                  <label
                    key={feature}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="checkbox"
                      checked={filters.features.includes(feature)}
                      onChange={() => toggleFilter("features", feature)}
                      className="w-4 h-4 rounded border-gray-300 text-[#12b76a] focus:ring-[#12b76a] focus:ring-2"
                    />
                    <span className="text-gray-700 group-hover:text-gray-900">
                      {feature}
                    </span>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#12b76a] text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}

