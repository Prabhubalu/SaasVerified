"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  HomeIcon,
  BeakerIcon,
  EnvelopeIcon,
  ShoppingBagIcon,
  UserGroupIcon,
  BoltIcon,
  CloudIcon,
  CreditCardIcon,
  TruckIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  AcademicCapIcon,
  ScaleIcon,
  UsersIcon,
  ChatBubbleLeftRightIcon,
  BoltSlashIcon,
  BuildingOfficeIcon,
  ComputerDesktopIcon,
  BuildingLibraryIcon,
  ChartBarIcon,
  HeartIcon,
  CubeIcon,
  CurrencyDollarIcon,
  LockClosedIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  BuildingStorefrontIcon,
  DocumentTextIcon,
  ChartBarSquareIcon,
  VideoCameraIcon,
  ShieldCheckIcon,
  ChartPieIcon,
  FilmIcon,
  PaintBrushIcon,
  GlobeAltIcon,
  SignalIcon,
  ShoppingCartIcon,
  CubeTransparentIcon,
  FireIcon,
  PaperAirplaneIcon,
  MusicalNoteIcon,
  SparklesIcon,
  SwatchIcon,
  ClipboardDocumentListIcon,
  PresentationChartBarIcon,
  PhoneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export function TopCategories() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Categories matching the design - 50 items in 10x5 grid
  const allCategories = [
    // Row 1
    { name: "Real Estate", icon: HomeIcon },
    { name: "Biotech", icon: BeakerIcon },
    { name: "Email Marketing", icon: EnvelopeIcon },
    { name: "E-commerce", icon: ShoppingBagIcon },
    { name: "Collaboration", icon: UserGroupIcon },
    { name: "Productivity", icon: BoltIcon },
    { name: "Cloud Storage", icon: CloudIcon },
    { name: "Payments", icon: CreditCardIcon },
    { name: "Transportation", icon: TruckIcon },
    { name: "Project Management", icon: ClipboardDocumentListIcon },
    // Row 2
    { name: "Consulting", icon: BriefcaseIcon },
    { name: "Construction", icon: BuildingOffice2Icon },
    { name: "Education", icon: AcademicCapIcon },
    { name: "LegalTech", icon: ScaleIcon },
    { name: "HR Software", icon: UsersIcon },
    { name: "Communication", icon: ChatBubbleLeftRightIcon },
    { name: "Energy", icon: BoltSlashIcon },
    { name: "Healthcare", icon: BuildingOfficeIcon },
    { name: "IT Management", icon: ComputerDesktopIcon },
    { name: "Banking", icon: BuildingLibraryIcon },
    // Row 3
    { name: "Automotive", icon: TruckIcon },
    { name: "Nonprofit", icon: HeartIcon },
    { name: "Inventory", icon: CubeIcon },
    { name: "Accounting", icon: CurrencyDollarIcon },
    { name: "Marketing", icon: ChartBarSquareIcon },
    { name: "Cybersecurity", icon: LockClosedIcon },
    { name: "Development Tools", icon: WrenchScrewdriverIcon },
    { name: "Operations", icon: Cog6ToothIcon },
    { name: "Finance", icon: PresentationChartBarIcon },
    { name: "Hospitality", icon: BuildingStorefrontIcon },
    // Row 4
    { name: "Conferencing", icon: VideoCameraIcon },
    { name: "Manufacturing", icon: BuildingOffice2Icon },
    { name: "Sales", icon: ChartBarSquareIcon },
    { name: "CMS Platforms", icon: DocumentTextIcon },
    { name: "Insurance", icon: ShieldCheckIcon },
    { name: "Data Analytics", icon: ChartPieIcon },
    { name: "Media", icon: FilmIcon },
    { name: "Design Tools", icon: PaintBrushIcon },
    { name: "Website Builders", icon: GlobeAltIcon },
    { name: "CRM", icon: PhoneIcon },
  ];

  // Filter categories based on search query
  const filteredCategories = allCategories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Categories
          </h2>
          {/* Gradient underline - pink, orange, yellow, light green */}
          <div className="w-48 h-1 mx-auto mb-8 bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        {/* Search Section with Image */}
        <div className="max-w-[501px] mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          {/* Image above search bar */}
          <div className="relative w-full h-[153px] mb-2 rounded-lg overflow-hidden">
            <Image
              src="/assets/hero-image.png"
              alt="Categories illustration"
              fill
              className="object-cover"
            />
          </div>
          
          {/* Search Bar */}
          <div className="bg-white border border-gray-300 rounded-full shadow-sm flex items-center px-6 py-3">
            <svg className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                }
              }}
              placeholder="Search categories..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-lg"
            />
            {searchQuery.trim() && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="ml-3 p-1 text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
                aria-label="Clear search"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Grid Layout - Simple 10x5 grid */}
        <div className="relative w-full">
          <div className="relative w-full">
            <div 
              className="rounded-lg overflow-visible bg-transparent relative"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%), linear-gradient(to bottom, transparent 0%, black 8%, black 92%, transparent 100%)',
                WebkitMaskComposite: 'source-in',
              }}
            >
              
              <div className={`relative z-10 ${searchQuery.trim() ? 'flex flex-wrap justify-center gap-0' : 'grid grid-cols-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-10 gap-0'}`}>
              {/* Top dummy row for fade effect */}
              {!searchQuery.trim() && Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={`top-dummy-${i}`}
                  className={`w-full h-[45px] sm:h-[50px] md:h-[55px] lg:h-[64px] border-r border-b border-[#e4e7ec] bg-transparent
                    ${i >= 4 ? 'hidden md:block' : ''}
                    ${i >= 5 ? 'md:hidden lg:block' : ''}
                    ${i >= 6 ? 'lg:hidden xl:block' : ''}
                    ${i === 9 ? 'border-r-0' : ''}
                    ${i === 3 ? 'border-r-0 md:border-r' : ''}
                    ${i === 4 ? 'md:border-r-0 lg:border-r' : ''}
                    ${i === 5 ? 'lg:border-r-0 xl:border-r' : ''}
                  `}
                />
              ))}
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => {
                  const IconComponent = category.icon;
                  const totalCols = 10;
                  const row = Math.floor(index / totalCols) + 1;
                  const col = (index % totalCols) + 1;
                  const isLastInRow = col === totalCols;
                  const totalRows = Math.ceil(filteredCategories.length / totalCols);
                  const isLastRow = row === totalRows;
                  
                  // For flexbox (when searching), use calculated width. For grid (no search), use full width
                  const widthClass = searchQuery.trim() 
                    ? 'w-[calc(50%-1px)] sm:w-[calc(33.333%-1px)] md:w-[calc(25%-1px)] lg:w-[calc(20%-1px)] xl:w-[120px]'
                    : 'w-full';
                  
                  const isSearching = searchQuery.trim();

                return (
                  <button
                    key={category.name}
                    onClick={() => {
                      router.push(`/marketplace?category=${encodeURIComponent(category.name)}`);
                    }}
                    className={`
                      ${widthClass}
                      h-[90px] sm:h-[100px] md:h-[110px] lg:h-[128px]
                      ${isSearching ? 'border-r border-b border-[#e4e7ec]' : 'border-r border-b border-[#e4e7ec]'}
                      bg-transparent hover:bg-white/50 
                      transition-colors 
                      px-2 sm:px-3 py-4 sm:py-6 md:py-8 
                      flex flex-col items-center justify-center gap-1 sm:gap-2
                      group
                      ${!isSearching && isLastInRow ? 'border-r-0' : ''}
                    `}
                    data-aos={!isSearching ? "zoom-in" : undefined}
                    data-aos-delay={!isSearching ? 40 * (index % 10) : undefined}
                  >
                    <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 text-gray-400 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] sm:text-[11px] md:text-xs text-gray-400 text-center font-normal leading-4 sm:leading-5">
                      {category.name}
                    </span>
                  </button>
                );
                })
              ) : (
                <div className={`${searchQuery.trim() ? 'w-full' : 'col-span-full'} py-16 px-8 md:px-12 lg:px-16 text-center`}>
                  <div className="max-w-2xl mx-auto">
                    <div className="mb-4 flex justify-center">
                      <svg 
                        className="w-16 h-16 text-gray-300" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={1.5} 
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      No categories found
                    </h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any categories matching <span className="font-medium text-gray-900">"{searchQuery}"</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Try searching with different keywords or browse all categories
                    </p>
                  </div>
                </div>
              )}
              {/* Bottom dummy row for fade effect */}
              {!searchQuery.trim() && Array.from({ length: 10 }).map((_, i) => (
                <div 
                  key={`bottom-dummy-${i}`}
                  className={`w-full h-[45px] sm:h-[50px] md:h-[55px] lg:h-[64px] border-r border-[#e4e7ec] bg-transparent
                    ${i >= 4 ? 'hidden md:block' : ''}
                    ${i >= 5 ? 'md:hidden lg:block' : ''}
                    ${i >= 6 ? 'lg:hidden xl:block' : ''}
                    ${i === 9 ? 'border-r-0' : ''}
                    ${i === 3 ? 'border-r-0 md:border-r' : ''}
                    ${i === 4 ? 'md:border-r-0 lg:border-r' : ''}
                    ${i === 5 ? 'lg:border-r-0 xl:border-r' : ''}
                  `}
                />
              ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
