"use client";

import { useState, useRef, useEffect } from "react";

export function BuyerFAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const faqs = [
    {
      question: "Do you take commissions?",
      answer: "No. We are completely independent and do not take commissions from vendors. Our recommendations are based solely on verification results and your requirements.",
    },
    {
      question: "How fast will I get recommendations?",
      answer: "Typically within 3-5 business days after we receive your requirements. We take time to properly evaluate verified options against your specific needs.",
    },
    {
      question: "What is covered under Buyer Protection?",
      answer: "Buyer Protection covers cases where onboarding processes, support SLAs, or feature claims do not match what was verified. We intervene to resolve disputes and may provide refund assistance if claims fail.",
    },
    {
      question: "What if the product fails onboarding?",
      answer: "If a verified vendor fails to deliver on their verified onboarding process, we step in to mediate. Depending on the case, we may assist with refunds or alternative recommendations.",
    },
    {
      question: "Do you talk to the vendor on my behalf?",
      answer: "Yes, as part of our buyer protection service, we can communicate with vendors on your behalf to resolve issues related to verified claims. This is included in our buyer protection policy.",
    },
  ];

  return (
    <section className="py-20">
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

