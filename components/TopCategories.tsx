"use client";

import { useState } from "react";
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
} from "@heroicons/react/24/outline";

export function TopCategories() {
  const [searchQuery, setSearchQuery] = useState("");

  // Categories matching the design - 50 items in 10x5 grid
  const categories = [
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

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="bg-white border border-gray-300 rounded-full shadow-sm flex items-center px-8 py-2">
            <svg className="w-6 h-6 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-lg"
            />
            <button className="bg-[#eff4ff] text-[#002a8a] px-6 py-3 rounded-full font-medium hover:bg-blue-100 transition-colors text-base ml-2">
              Search
            </button>
          </div>
        </div>

        {/* Grid Layout - Simple 10x5 grid */}
        <div className="relative w-full flex justify-center">
          <div className="relative max-w-fit">
            <div className="border border-gray-200 rounded-lg overflow-hidden bg-white relative">
              {/* Fade effects on left and right edges - positioned at borders to hide content */}
              <div 
                className="absolute left-0 top-0 bottom-0 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
                  filter: 'blur(27px)',
                  width: '206px'
                }}
              ></div>
              <div 
                className="absolute right-0 top-0 bottom-0 z-20 pointer-events-none"
                style={{
                  background: 'linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.6) 50%, rgba(255,255,255,0.2) 80%, transparent 100%)',
                  filter: 'blur(27px)',
                  width: '212px'
                }}
              ></div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-10 gap-0 relative z-10">
              {categories.map((category, index) => {
                const IconComponent = category.icon;
                const row = Math.floor(index / 10) + 1;
                const col = (index % 10) + 1;
                const isLastInRow = col === 10;
                const isLastRow = row === 5;

                return (
                  <button
                    key={index}
                    className={`
                      w-full h-[128px]
                      border-r border-b border-[#e4e7ec] 
                      bg-white hover:bg-gray-50 
                      transition-colors 
                      px-3 py-8 
                      flex flex-col items-center justify-center gap-2
                      group
                      ${isLastInRow ? 'border-r-0' : ''}
                      ${isLastRow ? 'border-b-0' : ''}
                    `}
                    data-aos="zoom-in"
                    data-aos-delay={40 * (index % 10)}
                  >
                    <IconComponent className="w-8 h-8 text-gray-400 group-hover:scale-110 transition-transform" />
                    <span className="text-xs text-gray-400 text-center font-normal leading-5">
                      {category.name}
                    </span>
                  </button>
                );
              })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
