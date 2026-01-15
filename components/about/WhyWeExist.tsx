"use client";

import { ShieldCheckIcon, LockClosedIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

export function WhyWeExist() {
  const features = [
    {
      icon: ShieldCheckIcon,
      title: "Transparency",
      description: "We provide clear, honest insights into vendor capabilities and performance, helping you make informed decisions.",
    },
    {
      icon: LockClosedIcon,
      title: "Security First",
      description: "Every vendor undergoes rigorous security audits to ensure your data and systems remain protected.",
    },
    {
      icon: DocumentCheckIcon,
      title: "Compliance",
      description: "We verify that vendors meet industry standards and regulatory requirements for your peace of mind.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why We Exist
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Software procurement shouldn't be a gamble. We exist to bring clarity, security, and trust to every SaaS purchase decision.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                  <IconComponent className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

