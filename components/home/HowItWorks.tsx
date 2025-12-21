"use client";

import { useState, useEffect } from "react";

export function HowItWorks() {
  const [activeTab, setActiveTab] = useState<"buyers" | "vendors">("buyers");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const steps = {
    buyers: [
      {
        step: "Step 1",
        title: "Share your requirements:",
        description: "industry, goals, integrations, and budget.",
      },
      {
        step: "Step 2",
        title: "We evaluate every option —",
        description: "features, pricing, onboarding, and vendor support.",
      },
      {
        step: "Step 3",
        title: "Get a free consultation —",
        description: "every recommendation is guided by a buyer-first approach.",
      },
    ],
    vendors: [
      {
        step: "Step 1",
        title: "Submit your product",
        description: "Submit your SaaS product for our verification process.",
      },
      {
        step: "Step 2",
        title: "Get reviewed and validated",
        description: "Our team reviews and validates your product thoroughly.",
      },
      {
        step: "Step 3",
        title: "Earn verified badge",
        description: "Get your verified badge and increased visibility in the marketplace.",
      },
    ],
  };

  // Auto-cycle through steps
  useEffect(() => {
    const currentSteps = steps[activeTab];
    const interval = setInterval(() => {
      setIsTransitioning(true);
      
      // Fade out current step
      setTimeout(() => {
        setCurrentStepIndex((prev) => {
          const nextIndex = (prev + 1) % currentSteps.length;
          return nextIndex;
        });
        setIsTransitioning(false);
      }, 300); // Half of transition duration
    }, 4000); // Change step every 4 seconds

    return () => clearInterval(interval);
  }, [activeTab]);

  // Reset to first step when tab changes
  useEffect(() => {
    setCurrentStepIndex(0);
    setIsTransitioning(false);
  }, [activeTab]);

  const currentStep = steps[activeTab][currentStepIndex];
  const currentSteps = steps[activeTab];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <div className="w-48 h-1 mx-auto mb-6 bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
          
          {/* Tabs */}
          <div className="inline-flex bg-gray-100 rounded-xl p-1.5 mb-12" data-aos="fade-up" data-aos-delay="100">
            <button
              onClick={() => setActiveTab("buyers")}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "buyers"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Buyers
            </button>
            <button
              onClick={() => setActiveTab("vendors")}
              className={`px-8 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "vendors"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              For Vendors
            </button>
          </div>
        </div>

        {/* Main Content - Two Column Layout Centered */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Step Content */}
            <div className="relative flex items-center min-h-[280px]" data-aos="fade-right">
              <div
                key={`${activeTab}-${currentStepIndex}`}
                className={`w-full transition-all duration-500 ${
                  isTransitioning
                    ? "opacity-0 translate-x-4"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <div className="mb-4">
                  <span className="text-base font-semibold text-blue-600">
                    {currentStep.step}
                  </span>
                </div>
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                  {currentStep.title}
                </h3>
                <p className="text-xl md:text-2xl text-gray-900 leading-relaxed">
                  {currentStep.description}
                </p>
              </div>
            </div>

            {/* Right Side - Vertical Timeline */}
            <div className="relative hidden lg:flex items-center justify-center w-full" data-aos="fade-left" data-aos-delay="150">
              <div className="relative flex justify-center items-center w-full">
                {/* Container for line and steps - fixed height, centered */}
                <div className="relative h-[280px] w-full max-w-xs mx-auto">
                  {/* Vertical Line - Centered */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2">
                    {/* Gray base line for entire length */}
                    <div className="absolute inset-0 bg-gray-200" />
                    
                    {/* Green line - extends from top to current step's dot position */}
                    <div
                      className="absolute top-0 bg-green-500 transition-all duration-700 ease-in-out"
                      style={{
                        height: `${(currentStepIndex / (currentSteps.length - 1)) * 100}%`,
                        width: '100%',
                      }}
                    />
                  </div>

                  {/* Step Pills - All steps positioned with first at top and last at bottom */}
                  <div className="relative h-full w-full">
                    {currentSteps.map((step, index) => {
                      const isActive = index === currentStepIndex;
                      const isCompleted = index < currentStepIndex;
                      const isEven = index % 2 === 0; // Step 1 (0) and Step 3 (2) are even -> left side
                      
                      // Calculate position: first at 0%, last at 100%, others evenly spaced
                      const positionPercent = index === 0 
                        ? 0 
                        : index === currentSteps.length - 1 
                        ? 100 
                        : (index / (currentSteps.length - 1)) * 100;

                      return (
                        <div key={index} className="relative w-full h-0" style={{ top: `${positionPercent}%` }}>
                          {/* Green Dot on Line - positioned directly on the line center, same as line */}
                          <div
                            className={`absolute w-3 h-3 rounded-full transition-all duration-500 z-10 ${
                              isActive || isCompleted
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }`}
                            style={{
                              left: '50%',
                              top: 0,
                              transform: 'translate(-50%, -50%)',
                            }}
                          />

                          {/* Step Pill - positioned alternating left/right of the line */}
                          <div
                            className={`absolute px-4 py-2 rounded-full transition-all duration-500 ${
                              isActive
                                ? "bg-green-500 text-white shadow-md"
                                : isCompleted
                                ? "bg-green-500 text-white"
                                : "bg-gray-200 text-gray-700"
                            }`}
                            style={{
                              left: isEven ? 'auto' : 'calc(50% + 12px)',
                              right: isEven ? 'calc(50% + 12px)' : 'auto',
                              top: 0,
                              transform: 'translateY(-50%)',
                            }}
                          >
                            <span className="text-sm font-medium">{step.step}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile Timeline - Horizontal */}
            <div className="lg:hidden mt-8">
              <div className="flex items-center justify-center gap-4">
                {currentSteps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCurrentStepIndex(index);
                      setIsTransitioning(false);
                    }}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      index === currentStepIndex
                        ? "w-8 bg-green-500"
                        : index < currentStepIndex
                        ? "w-4 bg-green-300"
                        : "w-2 bg-gray-300"
                    }`}
                    aria-label={`Go to step ${index + 1}`}
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
