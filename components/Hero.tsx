"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useMembershipModal } from "@/contexts/MembershipModalContext";
import { useSearchParams } from "next/navigation";

export function Hero() {
  const [email, setEmail] = useState("");
  const { isOpen: showMembershipModal, openModal, closeModal } = useMembershipModal();
  const [formStep, setFormStep] = useState<"details" | "success">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const [memberDetails, setMemberDetails] = useState({
    fullName: "",
    company: "",
    role: "",
    email: "",
  });

  // Check for URL param to open modal (from footer on other pages)
  useEffect(() => {
    if (searchParams.get("openMembership") === "true") {
      openModal();
      // Clean up URL
      window.history.replaceState({}, "", "/");
    }
  }, [searchParams, openModal]);

  // Scroll to hero section when modal opens
  useEffect(() => {
    if (showMembershipModal && heroRef.current) {
      heroRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showMembershipModal]);

  const handleOpenModal = () => {
    setMemberDetails({
      fullName: "",
      company: "",
      role: "",
      email,
    });
    setFormStep("details");
    openModal();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/members", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(memberDetails),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to save membership right now.");
      }

      setFormStep("success");
      setEmail("");
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setSubmitError("");
    setIsSubmitting(false);
    setFormStep("details");
  };

  const categories = [
    { name: "CRM", icon: "/assets/hero-category/crm.svg" },
    { name: "HRMS", icon: "/assets/hero-category/hrms.svg" },
    { name: "Support", icon: "/assets/hero-category/support.svg" },
    { name: "Automation", icon: "/assets/hero-category/automation.svg" },
    { name: "Finance", icon: "/assets/hero-category/finance.svg" },
    { name: "Billing", icon: "/assets/hero-category/billing.svg" },
  ];

  const roleOptions = [
    "Leadership / Founder / CXO",
    "Procurement / Purchasing",
    "Finance / Accounts",
    "Operations / Administration",
    "IT / Technology / Security",
    "HR / People / Talent",
    "Sales / Business Development",
    "Marketing / Growth",
    "Product Management",
    "Customer Success / Support",
    "Consultant / Advisor",
    "Partner / Reseller",
    "Other"
  ];

  return (
    <section ref={heroRef} className="relative flex-1 flex items-center justify-center overflow-hidden pt-40 md:pt-48 pb-12 md:pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="max-w-2xl" data-aos="fade-up">
            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Buy SaaS with High <span className="text-[#12b76a]">Confidence</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Join the SaaS Verify Inner Circle. Get access to verified software, vendor truth audits, and buyer protection for your future purchases.
            </p>

            {/* Category Pills - 2 rows of 3 */}
            <div className="mb-8">
              <div className="flex flex-wrap gap-3 mb-3">
                {categories.slice(0, 3).map((category) => (
                  <button
                    key={category.name}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    {category.name}
                  </button>
                ))}
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.slice(3, 6).map((category) => (
                  <button
                    key={category.name}
                    className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 hover:border-gray-300 transition-colors flex items-center gap-2"
                  >
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={16}
                      height={16}
                      className="w-4 h-4"
                    />
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Email Signup Form */}
            <div className="space-y-4 max-w-sm">
              {/* Email Input */}
              <div className="bg-white border border-gray-300 rounded-lg px-4 py-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email"
                  className="w-full outline-none text-gray-700 placeholder-gray-400 text-base"
                />
              </div>
              
              {/* Button and Text Row */}
              <div className="flex items-start gap-4">
                <button
                  onClick={handleOpenModal}
                  className="bg-[#12b76a] text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors whitespace-nowrap"
                >
                  Get Membership. It's FREE!
                </button>
                <div className="text-sm text-gray-600 pt-1">
                  <div>Free forever.</div>
                  <div>No credit card.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Illustration */}
          <div className="hidden lg:block relative" data-aos="fade-left" data-aos-delay="200">
            <div className="relative w-full h-[500px]">
              <Image
                src="/assets/Hero-image-1.png"
                alt="Hero illustration"
                width={560}
                height={600}
                className="w-full h-full object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {showMembershipModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden">
            <div className="flex items-start justify-between px-6 py-5 border-b border-gray-200">
              <div>
                <p className="text-sm text-gray-500">Join SaaS Verify</p>
                <h3 className="text-xl font-semibold text-gray-900">Get Membership</h3>
              </div>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close membership form"
              >
                ✕
              </button>
            </div>

            {formStep === "details" ? (
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Full name</label>
                  <input
                    required
                    value={memberDetails.fullName}
                    onChange={(e) =>
                      setMemberDetails((prev) => ({ ...prev, fullName: e.target.value }))
                    }
                    placeholder="Jane Doe"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Company</label>
                  <input
                    required
                    value={memberDetails.company}
                    onChange={(e) =>
                      setMemberDetails((prev) => ({ ...prev, company: e.target.value }))
                    }
                    placeholder="Acme Inc."
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Role</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setRoleOpen((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                    >
                      <span className={memberDetails.role ? "text-gray-800" : "text-gray-400"}>
                        {memberDetails.role ? memberDetails.role : "Select a role"}
                      </span>
                      {roleOpen ? (
                        <ChevronUpIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      )}
                    </button>

                    {roleOpen && (
                      <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                        <ul className="max-h-56 overflow-auto py-1">
                          {roleOptions.map((role) => (
                            <li key={role}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMemberDetails((prev) => ({ ...prev, role }));
                                  setRoleOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                  memberDetails.role === role ? "bg-gray-50 text-gray-900" : "text-gray-800"
                                }`}
                              >
                                {role}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Work email</label>
                  <input
                    required
                    type="email"
                    value={memberDetails.email}
                    onChange={(e) =>
                      setMemberDetails((prev) => ({ ...prev, email: e.target.value }))
                    }
                    placeholder="you@company.com"
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                  />
                </div>

                <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600">
                  You&apos;ll get instant access to verified vendors, buyer protection,
                  and guidance from our SaaS verification team.
                </div>

                {submitError && (
                  <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                    {submitError}
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <div className="text-sm text-gray-500">Free forever. No credit card.</div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#12b76a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Saving..." : "Become a member"}
                  </button>
                </div>
              </form>
            ) : (
              <div className="px-6 py-8 text-center space-y-4">
                <div className="mx-auto w-14 h-14 rounded-full bg-[#12b76a]/10 text-[#12b76a] flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <h4 className="text-xl font-semibold text-gray-900">You&apos;re in!</h4>
                  <p className="text-gray-600 mt-2">
                    You&apos;ve successfully become a member. Check your email for your
                    welcome steps and curated vendor picks.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-[#12b76a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
