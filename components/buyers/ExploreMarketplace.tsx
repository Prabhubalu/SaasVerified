"use client";

import Link from "next/link";
import Image from "next/image";

export function ExploreMarketplace() {
  const categories = [
    { name: "CRM", icon: "/assets/hero-category/crm.svg", count: 24 },
    { name: "HRMS", icon: "/assets/hero-category/hrms.svg", count: 18 },
    { name: "Support", icon: "/assets/hero-category/support.svg", count: 32 },
    { name: "Automation", icon: "/assets/hero-category/automation.svg", count: 28 },
    { name: "Finance", icon: "/assets/hero-category/finance.svg", count: 15 },
    { name: "Billing", icon: "/assets/hero-category/billing.svg", count: 12 },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Explore Marketplace
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            View categories | Filters | Industry matches
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/marketplace?category=${encodeURIComponent(category.name)}`}
              className="group bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-[#12b76a] transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-[#12b76a]/10 transition-colors">
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={40}
                    height={40}
                    className="w-10 h-10"
                  />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-[#12b76a] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {category.count} verified vendors
                </p>
                <span className="text-sm font-medium text-[#12b76a] group-hover:underline">
                  Browse Category →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center" data-aos="fade-up" data-aos-delay="300">
          <Link
            href="/marketplace"
            className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
          >
            Visit Marketplace
          </Link>
        </div>
      </div>
    </section>
  );
}

