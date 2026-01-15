"use client";

import { useState, useRef } from "react";

export function VendorFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "What if we fail verification?",
      answer: "If your product doesn't meet the verification criteria, we provide detailed feedback on areas for improvement. You can address these issues and reapply for verification. We're committed to helping vendors improve and succeed.",
    },
    {
      question: "How often do audits occur?",
      answer: "Initial verification audits are conducted when you first apply. Re-verification audits occur annually to ensure continued compliance with our standards. We may also conduct spot checks if concerns are raised.",
    },
    {
      question: "How long is the badge valid?",
      answer: "Verification badges are valid for one year from the date of approval. Annual re-verification ensures that your product continues to meet our standards and maintains buyer trust.",
    },
    {
      question: "Can we reapply after improvements?",
      answer: "Absolutely! We encourage vendors to reapply after making improvements. There's no limit on reapplications, and we're here to help guide you through the process to achieve verification.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              data-aos="fade-up"
              data-aos-delay={index * 50}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className="text-lg font-semibold text-gray-900 pr-4">
                  {faq.question}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-300 ease-in-out ${
                    openIndex === index ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                id={`faq-answer-${index}`}
                className="overflow-hidden transition-all duration-500 ease-in-out"
                style={{
                  maxHeight: openIndex === index 
                    ? `${contentRefs.current[index]?.scrollHeight || 0}px` 
                    : "0px",
                  opacity: openIndex === index ? 1 : 0,
                }}
              >
                <div 
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="px-6 py-4 text-gray-600 border-t border-gray-100"
                >
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

