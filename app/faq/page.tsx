"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useRef } from "react";
import { useSearchParams } from "next/navigation";

interface FAQItem {
  question: string;
  answer: string;
  featured?: boolean;
}

interface FAQSection {
  title: string;
  questions: FAQItem[];
}

const allFAQs: { buyers: FAQSection[]; vendors: FAQSection[] } = {
  buyers: [
    {
      title: "GETTING STARTED",
      questions: [
        { question: "What is SaaS Verify?", answer: "SaaS Verify is an independent verification platform that audits SaaS vendors to help buyers make confident purchasing decisions. We verify vendor claims about features, pricing, onboarding, support, and more to ensure you get accurate information." },
        { question: "How do I find verified SaaS products?", answer: "Browse our marketplace to find verified SaaS products, or submit a request for personalized recommendations. Our marketplace shows only verified vendors with their audit scores and detailed information." },
      ],
    },
    {
      title: "TRUST & PROTECTION",
      questions: [
        { question: "What's Refund Assurance?", answer: "Refund Assurance protects you if a verified vendor fails to deliver on their verified claims. We intervene to resolve disputes and may provide refund assistance if claims fail. This is included with your free membership.", featured: true },
        { question: "What does the Trust Seal mean?", answer: "The Trust Seal indicates that a vendor has passed our independent verification audit, meeting standards for features, pricing transparency, onboarding, support, and more. Only verified vendors can display this seal." },
        { question: "How much does Refund Assurance cost?", answer: "Refund Assurance is included with your free membership. There are no additional costs for buyer protection." },
        { question: "What is covered under Buyer Protection?", answer: "Buyer Protection covers cases where onboarding processes, support SLAs, or feature claims do not match what was verified. We intervene to resolve disputes and may provide refund assistance if claims fail." },
        { question: "What if the product fails onboarding?", answer: "If a verified vendor fails to deliver on their verified onboarding process, we step in to mediate. Depending on the case, we may assist with refunds or alternative recommendations." },
      ],
    },
    {
      title: "BUYING",
      questions: [
        { question: "Can I request a demo?", answer: "Yes, you can request demos through our platform. We'll connect you with verified vendors that match your requirements." },
        { question: "How fast will I get recommendations?", answer: "Typically within 3-5 business days after we receive your requirements. We take time to properly evaluate verified options against your specific needs." },
        { question: "Do you take commissions?", answer: "No. We are completely independent and do not take commissions from vendors. Our recommendations are based solely on verification results and your requirements." },
        { question: "Do you talk to the vendor on my behalf?", answer: "Yes, as part of our buyer protection service, we can communicate with vendors on your behalf to resolve issues related to verified claims. This is included in our buyer protection policy." },
      ],
    },
  ],
  vendors: [
    {
      title: "ELIGIBILITY",
      questions: [
        { question: "Who can apply for verification?", answer: "Any SaaS vendor can apply for verification. We evaluate products across all categories and sizes, from startups to enterprise solutions." },
        { question: "Does SaaS verification cost anything?", answer: "There is no cost to apply for verification. The application process is free." },
        { question: "Is there a cost to apply?", answer: "No, the verification application process is completely free. There are no hidden fees or charges." },
      ],
    },
    {
      title: "PROCESS",
      questions: [
        { question: "How do I apply for verification?", answer: "Click 'Become a Verified Vendor' and fill out the application form with your product details, contact information, and business information. Our team will review your application." },
        { question: "How long does verification take?", answer: "The verification process typically takes 3-5 business days after we receive your complete application. We conduct thorough audits to ensure accuracy." },
        { question: "What exactly do you evaluate during verification?", answer: "We evaluate features, pricing transparency, onboarding maturity, support & SLA delivery, integrations, and security & compliance. Each area is scored to provide an overall verification score." },
        { question: "What does the audit evaluate?", answer: "Our audit evaluates six key areas: Features (functionality claims), Pricing transparency, Onboarding maturity, Support & SLA delivery, Integrations, and Security & compliance." },
        { question: "What if we fail verification?", answer: "If your product doesn't meet the verification criteria, we provide detailed feedback on areas for improvement. You can address these issues and reapply for verification. We're committed to helping vendors improve and succeed." },
        { question: "Can we reapply after improvements?", answer: "Absolutely! We encourage vendors to reapply after making improvements. There's no limit on reapplications, and we're here to help guide you through the process to achieve verification." },
      ],
    },
    {
      title: "MARKETING",
      questions: [
        { question: "Can I use the Trust Seal in my marketing?", answer: "Yes, once verified, you can use the Trust Seal badge in your marketing materials, website, and promotional content. The badge helps build buyer trust and confidence." },
      ],
    },
    {
      title: "ONGOING",
      questions: [
        { question: "How often do audits occur?", answer: "Initial verification audits are conducted when you first apply. Re-verification audits occur annually to ensure continued compliance with our standards. We may also conduct spot checks if concerns are raised." },
        { question: "How long is the badge valid?", answer: "Verification badges are valid for one year from the date of approval. Annual re-verification ensures that your product continues to meet our standards and maintains buyer trust." },
      ],
    },
  ],
};

function FAQContent() {
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"buyers" | "vendors">("buyers");
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["TRUST & PROTECTION", "PROCESS"]));
  const [openQuestions, setOpenQuestions] = useState<Set<string>>(new Set());
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Read search query from URL params on mount
  useEffect(() => {
    const queryParam = searchParams.get("q");
    if (queryParam) {
      setSearchQuery(decodeURIComponent(queryParam));
    }
  }, [searchParams]);

  const currentFAQs = activeTab === "buyers" ? allFAQs.buyers : allFAQs.vendors;

  // Filter FAQs based on search query
  const filteredFAQs = useMemo(() => {
    if (!searchQuery.trim()) return currentFAQs;

    const query = searchQuery.toLowerCase();
    
    // When searching, combine results from both buyers and vendors
    const buyerResults = allFAQs.buyers
      .map((section) => ({
        ...section,
        category: "buyers" as const,
        questions: section.questions.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.questions.length > 0);

    const vendorResults = allFAQs.vendors
      .map((section) => ({
        ...section,
        category: "vendors" as const,
        questions: section.questions.filter(
          (item) =>
            item.question.toLowerCase().includes(query) ||
            item.answer.toLowerCase().includes(query)
        ),
      }))
      .filter((section) => section.questions.length > 0);

    return [...buyerResults, ...vendorResults];
  }, [searchQuery, currentFAQs]);

  const toggleSection = (sectionTitle: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionTitle)) {
        newSet.delete(sectionTitle);
      } else {
        newSet.add(sectionTitle);
      }
      return newSet;
    });
  };

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(questionId)) {
        newSet.delete(questionId);
      } else {
        newSet.add(questionId);
      }
      return newSet;
    });
  };

  const getQuestionId = (sectionTitle: string, question: string, category?: string) => {
    return category ? `${category}-${sectionTitle}-${question}` : `${sectionTitle}-${question}`;
  };

  // Auto-expand all sections when searching
  const hasSearchQuery = searchQuery.trim().length > 0;

  // Auto-expand all sections when searching
  useEffect(() => {
    if (hasSearchQuery) {
      const allSectionKeys = new Set<string>();
      filteredFAQs.forEach((section) => {
        const sectionKey = `${(section as any).category || activeTab}-${section.title}`;
        allSectionKeys.add(sectionKey);
      });
      setOpenSections(allSectionKeys);
    }
  }, [hasSearchQuery, filteredFAQs, activeTab]);

  return (
    <div className="pt-40 md:pt-48 pb-16 bg-gradient-to-b from-purple-50 via-white to-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8" data-aos="fade-up">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            We'll Help You Get Started
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-6">
            Quick answers for buyers and SaaS vendors — no fluff.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full mb-8"></div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white border border-gray-300 rounded-lg shadow-sm flex items-center px-4 py-3">
            <svg className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search help topics..."
              className="flex-1 outline-none text-gray-700 placeholder-gray-500 text-base"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Tabs - Only show when not searching */}
        {!hasSearchQuery && (
          <div className="flex justify-center mb-8" data-aos="fade-up" data-aos-delay="150">
            <div className="inline-flex bg-white rounded-lg p-1 shadow-md border border-gray-200">
              <button
                onClick={() => {
                  setActiveTab("buyers");
                  setOpenSections(new Set(["TRUST & PROTECTION"]));
                }}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "buyers"
                    ? "bg-[#12b76a] text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                For Buyers
              </button>
              <button
                onClick={() => {
                  setActiveTab("vendors");
                  setOpenSections(new Set(["PROCESS"]));
                }}
                className={`px-6 py-2 rounded-md font-medium transition-colors ${
                  activeTab === "vendors"
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                For SaaS Vendors
              </button>
            </div>
          </div>
        )}

        {/* FAQ Content */}
        <div className="max-w-4xl mx-auto">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12" data-aos="fade-up">
              <p className="text-gray-600 text-lg">No results found for "{searchQuery}"</p>
              <p className="text-gray-500 mt-2">Try adjusting your search terms</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQs.map((section, sectionIndex) => {
                // Auto-expand sections when searching
                const sectionKey = hasSearchQuery ? `${(section as any).category || activeTab}-${section.title}` : section.title;
                const isSectionOpen = hasSearchQuery || openSections.has(section.title);
                
                return (
                  <div
                    key={sectionIndex}
                    className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm"
                    data-aos="fade-up"
                    data-aos-delay={sectionIndex * 50}
                  >
                    {/* Section Header */}
                    <button
                      onClick={() => {
                        if (!hasSearchQuery) {
                          toggleSection(section.title);
                        }
                      }}
                      className={`w-full px-6 py-4 flex items-center justify-between bg-gray-50 transition-colors ${
                        !hasSearchQuery ? "hover:bg-gray-100 cursor-pointer" : "cursor-default"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                          {section.title}
                        </span>
                        {hasSearchQuery && (section as any).category && (
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                            (section as any).category === "buyers"
                              ? "bg-[#12b76a]/10 text-[#12b76a]"
                              : "bg-blue-100 text-blue-600"
                          }`}>
                            {(section as any).category === "buyers" ? "For Buyers" : "For Vendors"}
                          </span>
                        )}
                      </div>
                      {!hasSearchQuery && (
                        <>
                          {isSectionOpen ? (
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          )}
                        </>
                      )}
                    </button>

                    {/* Section Questions */}
                    {isSectionOpen && (
                      <div className="px-6 py-4 space-y-3 bg-white">
                        {section.questions.map((item, qIndex) => {
                          const questionId = getQuestionId(section.title, item.question, (section as any).category);
                          const isQuestionOpen = openQuestions.has(questionId);
                          return (
                            <div key={qIndex} className="border-b border-gray-100 last:border-b-0 pb-3 last:pb-0">
                              <button
                                onClick={() => toggleQuestion(questionId)}
                                className="w-full text-left flex items-start justify-between group hover:text-[#12b76a] transition-colors"
                              >
                                <div className="flex items-start gap-2 flex-1 pr-4">
                                  {item.featured && (
                                    <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-1" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  )}
                                  <span className="text-gray-900 group-hover:text-[#12b76a] font-medium">
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
                                    ? `${contentRefs.current[questionId]?.scrollHeight || 0}px`
                                    : "0px",
                                  opacity: isQuestionOpen ? 1 : 0,
                                }}
                              >
                                <div
                                  ref={(el) => {
                                    contentRefs.current[questionId] = el;
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
          )}
        </div>

        {/* Footer CTA */}
        <div className="mt-16 text-center" data-aos="fade-up" data-aos-delay="200">
          <h3 className="text-2xl font-semibold text-gray-900 mb-2">Still need help?</h3>
          <p className="text-gray-600 mb-6">Get personalized guidance from our team.</p>
          <div className="flex justify-center">
            <a
              href="/contact"
              className="inline-block bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-green-700 transition-colors shadow-lg"
            >
              Talk to an Expert
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQPage() {
  return (
    <Suspense fallback={
      <div className="pt-40 md:pt-48 pb-16 bg-gradient-to-b from-purple-50 via-white to-green-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              We'll Help You Get Started
            </h1>
            <p className="text-lg md:text-xl text-gray-600">Loading...</p>
          </div>
        </div>
      </div>
    }>
      <FAQContent />
    </Suspense>
  );
}

