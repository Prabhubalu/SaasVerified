"use client";

export function ProcessOverview() {
  const steps = [
    {
      number: 1,
      title: "Apply",
      description: "Submit your SaaS product for verification",
    },
    {
      number: 2,
      title: "Audit",
      description: "Our team conducts an in-depth audit",
    },
    {
      number: 3,
      title: "Feedback",
      description: "Receive detailed feedback and recommendations",
    },
    {
      number: 4,
      title: "Badge",
      description: "Earn your verification badge upon approval",
    },
    {
      number: 5,
      title: "Marketplace listing",
      description: "Get featured in our verified marketplace",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Verification Process Overview
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        {/* Desktop Horizontal Timeline */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gray-200"></div>
            <div className="absolute top-12 left-0 right-0 h-1 bg-[#12b76a]"></div>

            {/* Steps */}
            <div className="relative flex justify-between">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center w-1/5"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="w-24 h-24 bg-[#12b76a] text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 relative z-10 shadow-lg">
                    {step.number}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 text-center max-w-[150px]">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile/Tablet Vertical Timeline */}
        <div className="lg:hidden">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200"></div>
            
            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 relative"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="flex-shrink-0 relative z-10">
                    <div className="w-16 h-16 bg-[#12b76a] text-white rounded-full flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

