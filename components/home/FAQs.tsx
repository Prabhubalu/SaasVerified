"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const buyerSections = [
  {
    title: "GETTING STARTED",
    questions: [
      { question: "What is SaaS Verify?", answer: "SaaS Verify is an independent verification platform that audits SaaS vendors to help buyers make confident purchasing decisions." },
      { question: "How do I find verified SaaS products?", answer: "Browse our marketplace to find verified SaaS products, or submit a request for personalized recommendations." },
    ],
  },
  {
    title: "TRUST & PROTECTION",
    questions: [
      { question: "What's Refund Assurance?", answer: "Refund Assurance protects you if a verified vendor fails to deliver on their verified claims. We intervene to resolve disputes and may provide refund assistance.", featured: true },
      { question: "What does the Trust Seal mean?", answer: "The Trust Seal indicates that a vendor has passed our independent verification audit, meeting standards for features, pricing transparency, onboarding, support, and more." },
      { question: "How much does Refund Assurance cost?", answer: "Refund Assurance is included with your free membership. There are no additional costs for buyer protection." },
    ],
  },
  {
    title: "BUYING",
    questions: [
      { question: "Can I request a demo?", answer: "Yes, you can request demos through our platform. We'll connect you with verified vendors that match your requirements." },
    ],
  },
];

const vendorSections = [
  {
    title: "ELIGIBILITY",
    questions: [
      { question: "Who can apply for verification?", answer: "Any SaaS vendor can apply for verification. We evaluate products across all categories and sizes." },
      { question: "Does SaaS verification cost anything?", answer: "There is no cost to apply for verification. The application process is free." },
    ],
  },
  {
    title: "PROCESS",
    questions: [
      { question: "How do I apply for verification?", answer: "Click 'Become a Verified Vendor' and fill out the application form with your product details, contact information, and business information." },
      { question: "How long does verification take?", answer: "The verification process typically takes 3-5 business days after we receive your complete application." },
      { question: "What exactly do you evaluate during verification?", answer: "We evaluate features, pricing transparency, onboarding maturity, support & SLA delivery, integrations, and security & compliance." },
    ],
  },
  {
    title: "MARKETING",
    questions: [
      { question: "Can I use the Trust Seal in my marketing?", answer: "Yes, once verified, you can use the Trust Seal badge in your marketing materials, website, and promotional content." },
    ],
  },
];

export function FAQs() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [openBuyerSection, setOpenBuyerSection] = useState<string | null>("TRUST & PROTECTION");
  const [openVendorSection, setOpenVendorSection] = useState<string | null>("PROCESS");
  const [openBuyerQuestions, setOpenBuyerQuestions] = useState<Set<string>>(new Set());
  const [openVendorQuestions, setOpenVendorQuestions] = useState<Set<string>>(new Set());
  const buyerContentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const vendorContentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/faq?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const getQuestionId = (sectionTitle: string, question: string, type: "buyer" | "vendor") => {
    return `${type}-${sectionTitle}-${question}`;
  };

  const toggleBuyerQuestion = (sectionTitle: string, question: string) => {
    const questionId = getQuestionId(sectionTitle, question, "buyer");
    setOpenBuyerQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const toggleVendorQuestion = (sectionTitle: string, question: string) => {
    const questionId = getQuestionId(sectionTitle, question, "vendor");
    setOpenVendorQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  return (
    <section className="py-20 bg-gradient-to-b from-purple-50 via-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            We'll Help You Get Started
          </h2>
          <p className="text-lg text-gray-600 mb-4">
            Quick answers for buyers and SaaS vendors — no fluff.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full mb-6"></div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="max-w-2xl mx-auto mb-12" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex items-center px-4 py-3 min-h-[3rem]">
            <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search refund, verification, pricing…"
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-base h-6"
            />
            {searchQuery.trim() && (
              <button
                type="submit"
                className="ml-2 bg-[#12b76a] text-white p-1 rounded-md hover:bg-green-700 transition-colors flex items-center justify-center flex-shrink-0 h-6 w-6"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
        </form>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* For Buyers Panel */}
          <div className="bg-white border-t-4 border-[#12b76a] rounded-lg shadow-lg p-8" data-aos="fade-right">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#12b76a]/10 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-[#12b76a]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">For Buyers</h3>
            </div>
            <p className="text-gray-600 mb-6">Get verified, trusted, and certified SaaS recommendations.</p>

            <div className="space-y-4">
              {buyerSections.map((section, sectionIndex) => {
                const isOpen = openBuyerSection === section.title;
                return (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenBuyerSection(isOpen ? null : section.title)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        {section.title}
                      </span>
                      {isOpen ? (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 space-y-3 bg-white">
                        {section.questions.map((item, qIndex) => {
                          const questionId = getQuestionId(section.title, item.question, "buyer");
                          const isQuestionOpen = openBuyerQuestions.has(questionId);
                          return (
                            <div key={qIndex} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                              <button
                                onClick={() => toggleBuyerQuestion(section.title, item.question)}
                                className="w-full text-left flex items-start justify-between group hover:text-[#12b76a] transition-colors"
                              >
                                <div className="flex items-start gap-2 flex-1 pr-4">
                                  {item.featured && (
                                    <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )}
                                  <span className="text-gray-900 group-hover:text-[#12b76a] text-sm font-medium">
                                    {item.featured && <span className="text-yellow-600">Most asked: </span>}
                                    {item.question}
                                  </span>
                                </div>
                                <svg
                                  className={`w-5 h-5 text-gray-400 group-hover:text-[#12b76a] flex-shrink-0 transition-transform duration-300 ease-in-out ${
                                    isQuestionOpen ? "rotate-180" : "rotate-0"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              <div
                                className="overflow-hidden transition-all duration-500 ease-in-out"
                                style={{
                                  maxHeight: isQuestionOpen
                                    ? `${buyerContentRefs.current[questionId]?.scrollHeight || 0}px`
                                    : "0px",
                                  opacity: isQuestionOpen ? 1 : 0,
                                }}
                              >
                                <div
                                  ref={(el) => {
                                    buyerContentRefs.current[questionId] = el;
                                  }}
                                  className="pt-3 text-gray-600 text-sm leading-relaxed"
                                >
                                  {item.answer}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* For SaaS Vendors Panel */}
          <div className="bg-white border-t-4 border-blue-500 rounded-lg shadow-lg p-8" data-aos="fade-left" data-aos-delay="150">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">For SaaS Vendors</h3>
            </div>
            <p className="text-gray-600 mb-6">Expert quality protection for vendors.</p>

            <div className="space-y-4">
              {vendorSections.map((section, sectionIndex) => {
                const isOpen = openVendorSection === section.title;
                return (
                  <div key={sectionIndex} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenVendorSection(isOpen ? null : section.title)}
                      className="w-full px-4 py-3 flex items-center justify-between bg-gray-50 hover:bg-gray-100 transition-colors"
                    >
                      <span className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                        {section.title}
                      </span>
                      {isOpen ? (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 space-y-3 bg-white">
                        {section.questions.map((item, qIndex) => {
                          const questionId = getQuestionId(section.title, item.question, "vendor");
                          const isQuestionOpen = openVendorQuestions.has(questionId);
                          return (
                            <div key={qIndex} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                              <button
                                onClick={() => toggleVendorQuestion(section.title, item.question)}
                                className="w-full text-left flex items-start justify-between group hover:text-blue-600 transition-colors"
                              >
                                <span className="text-gray-900 group-hover:text-blue-600 text-sm font-medium pr-4">{item.question}</span>
                                <svg
                                  className={`w-5 h-5 text-gray-400 group-hover:text-blue-600 flex-shrink-0 transition-transform duration-300 ease-in-out ${
                                    isQuestionOpen ? "rotate-180" : "rotate-0"
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                              <div
                                className="overflow-hidden transition-all duration-500 ease-in-out"
                                style={{
                                  maxHeight: isQuestionOpen
                                    ? `${vendorContentRefs.current[questionId]?.scrollHeight || 0}px`
                                    : "0px",
                                  opacity: isQuestionOpen ? 1 : 0,
                                }}
                              >
                                <div
                                  ref={(el) => {
                                    vendorContentRefs.current[questionId] = el;
                                  }}
                                  className="pt-3 text-gray-600 text-sm leading-relaxed"
                                >
                                  {item.answer}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-6">Get personalized guidance from our team.</p>
          <div className="flex justify-center">
            <Link
              href="/contact"
              className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Talk to an Expert
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
