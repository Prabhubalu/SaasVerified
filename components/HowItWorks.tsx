"use client";

import { useState } from "react";

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"buyers" | "vendors">("buyers");

  const steps = {
    buyers: [
      {
        step: "Step 1",
        title: "Share your requirements: industry, goals, integrations, and budget.",
      },
      {
        step: "Step 2",
        title: "Get matched with verified SaaS vendors that fit your needs.",
      },
      {
        step: "Step 3",
        title: "Make confident purchasing decisions with verified reviews.",
      },
    ],
    vendors: [
      {
        step: "Step 1",
        title: "Submit your SaaS product for verification.",
      },
      {
        step: "Step 2",
        title: "Our team reviews and validates your product.",
      },
      {
        step: "Step 3",
        title: "Get verified badge and increased visibility.",
      },
    ],
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            How it works?
          </h2>
          
          {/* Tabs */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1 mb-8">
            <button
              onClick={() => setActiveTab("buyers")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "buyers"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Buyers
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`px-6 py-2 rounded-lg font-medium transition-colors ${
                activeTab === "vendors"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Vendors
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          {steps[activeTab].map((step, index) => (
            <div key={index} className="mb-12 flex items-start gap-6">
              <div className="flex-shrink-0">
                <div className="bg-blue-50 text-blue-900 px-6 py-2 rounded-full font-medium shadow-sm">
                  {step.step}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <p className="text-2xl md:text-3xl font-medium text-gray-900 leading-tight">
                  {step.title}
                </p>
              </div>
              {index < steps[activeTab].length - 1 && (
                <div className="absolute left-8 mt-12 h-16 w-0.5 bg-gray-200" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

