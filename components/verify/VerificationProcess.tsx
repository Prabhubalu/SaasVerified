"use client";

export function VerificationProcess() {
  const steps = [
    {
      number: 1,
      title: "Application Review",
      description: "Initial eligibility check covering product readiness, positioning, and use-case clarity.",
    },
    {
      number: 2,
      title: "Documentation Check",
      description: "Validation of feature docs, pricing accuracy, and compliance disclosures.",
    },
    {
      number: 3,
      title: "In-Depth Audit",
      description: "Hands-on product walkthrough covering onboarding, support quality, and integrations.",
    },
    {
      number: 4,
      title: "Scoring & Trust Badge",
      description: "Objective scoring with a public trust tier and verification badge.",
    },
    {
      number: 5,
      title: "Re-Verification",
      description: "Periodic reassessments to ensure standards are continuously met.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our 5-Stage Verification Process
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Every SaaS listed on our platform goes through a structured 5-stage process designed to ensure reliability and transparency.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full mt-6"></div>
        </div>

        {/* Vertical Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-300 via-sky-300 to-emerald-300" data-aos="fade-up"></div>

            {/* Steps */}
            <div className="space-y-12">
              {steps.map((step, index) => (
                <div
                  key={step.number}
                  className="relative flex items-start gap-6"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  {/* Step Number Circle */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 border-4 border-emerald-400 flex items-center justify-center text-xl font-bold text-emerald-700 shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Step Content Card */}
                  <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-6 h-6 text-[#12b76a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {step.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                    </div>
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

