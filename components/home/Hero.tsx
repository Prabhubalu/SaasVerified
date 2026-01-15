"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useMembershipModal } from "@/contexts/MembershipModalContext";
import { useSearchParams } from "next/navigation";

export function Hero() {
  const [email, setEmail] = useState("");
  const [heroEmailError, setHeroEmailError] = useState("");
  const { isOpen: showMembershipModal, openModal, closeModal } = useMembershipModal();
  const [formStep, setFormStep] = useState<"details" | "success">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [roleOpen, setRoleOpen] = useState(false);
  const [saasNeedOpen, setSaasNeedOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);
  const saasNeedDropdownRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [memberDetails, setMemberDetails] = useState({
    fullName: "",
    company: "",
    role: "",
    saasNeed: "",
    email: "",
  });

  // Inject confetti animation styles
  useEffect(() => {
    const styleId = 'confetti-animation-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.textContent = `
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(600px) rotate(720deg);
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

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

  // Handle modal transitions
  useEffect(() => {
    if (showMembershipModal) {
      setShouldRender(true);
      // Small delay to trigger transition after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else {
      setIsVisible(false);
      // Wait for transition to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [showMembershipModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showMembershipModal) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      // Restore scrolling on cleanup
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [showMembershipModal]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleOpen(false);
      }
      if (saasNeedDropdownRef.current && !saasNeedDropdownRef.current.contains(event.target as Node)) {
        setSaasNeedOpen(false);
      }
    };

    if (roleOpen || saasNeedOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [roleOpen, saasNeedOpen]);

  // Validate hero email field (reuse same logic)
  const validateHeroEmail = (emailValue: string): boolean => {
    if (!emailValue) {
      setHeroEmailError("Please enter your work email address.");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailValue)) {
      setHeroEmailError("Please enter a valid email address.");
      return false;
    }
    
    const personalDomains = [
      "gmail.com",
      "yahoo.com",
      "yahoo.co.uk",
      "yahoo.co.in",
      "hotmail.com",
      "hotmail.co.uk",
      "outlook.com",
      "live.com",
      "msn.com",
      "aol.com",
      "icloud.com",
      "me.com",
      "mac.com",
      "protonmail.com",
      "proton.me",
      "yandex.com",
      "mail.com",
      "gmx.com",
      "zoho.com",
      "rediffmail.com",
    ];
    
    const domain = emailValue.split("@")[1]?.toLowerCase();
    if (personalDomains.includes(domain || "")) {
      setHeroEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      return false;
    }
    
    setHeroEmailError("");
    return true;
  };

  const handleHeroEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    // Clear error when user starts typing
    if (heroEmailError) {
      setHeroEmailError("");
    }
  };

  const handleHeroEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleOpenModal();
    }
  };

  const handleOpenModal = () => {
    // Validate email before opening modal
    if (!validateHeroEmail(email)) {
      return;
    }
    
    setMemberDetails({
      fullName: "",
      company: "",
      role: "",
      saasNeed: "",
      email,
    });
    setFormStep("details");
    setHeroEmailError("");
    openModal();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setEmailError("");
    
    // Validate email before submission
    if (!validateEmailDomain(memberDetails.email)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      return;
    }
    
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
    setEmailError("");
    setIsSubmitting(false);
    setFormStep("details");
  };

  // Validate email domain to avoid personal emails
  const validateEmailDomain = (email: string): boolean => {
    if (!email) return true; // Empty is handled by required
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return true; // Invalid format is handled by type="email"
    
    const personalDomains = [
      "gmail.com",
      "yahoo.com",
      "yahoo.co.uk",
      "yahoo.co.in",
      "hotmail.com",
      "hotmail.co.uk",
      "outlook.com",
      "live.com",
      "msn.com",
      "aol.com",
      "icloud.com",
      "me.com",
      "mac.com",
      "protonmail.com",
      "proton.me",
      "yandex.com",
      "mail.com",
      "gmx.com",
      "zoho.com",
      "rediffmail.com",
    ];
    
    const domain = email.split("@")[1]?.toLowerCase();
    return !personalDomains.includes(domain || "");
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setMemberDetails((prev) => ({ ...prev, email: newEmail }));
    
    // Clear error when user starts typing
    if (emailError) {
      setEmailError("");
    }
    
    // Validate on blur or when email is complete
    if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
      if (!validateEmailDomain(newEmail)) {
        setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      }
    }
  };

  const handleEmailBlur = () => {
    if (memberDetails.email && !validateEmailDomain(memberDetails.email)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
    } else {
      setEmailError("");
    }
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

  const saasNeedOptions = [
    "CRM",
    "HRMS",
    "ERP",
    "Automation",
    "Finance",
    "Support",
    "Marketing",
  ];

  return (
    <section ref={heroRef} className="relative flex-1 flex items-center justify-center overflow-hidden pt-40 md:pt-48 pb-12 md:pb-16">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
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
              <div className="space-y-1">
                <div className={`bg-white border rounded-lg px-4 py-3 ${
                  heroEmailError ? "border-red-300" : "border-gray-300"
                }`}>
                  <input
                    type="email"
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={email}
                    onChange={handleHeroEmailChange}
                    onKeyPress={handleHeroEmailKeyPress}
                    placeholder="Enter your work email"
                    className="w-full outline-none text-gray-700 placeholder-gray-400 text-base"
                  />
                </div>
                {heroEmailError && (
                  <p className="text-sm text-red-600">{heroEmailError}</p>
                )}
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
                src="/assets/hero.svg"
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

      {shouldRender && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={handleClose}
        >
          <div 
            className={`bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-visible transition-all duration-300 relative ${
              isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Confetti Container */}
            {formStep === "success" && (
              <div className="absolute inset-0 pointer-events-none overflow-visible rounded-2xl z-0" style={{ height: '100%', width: '100%' }}>
                {Array.from({ length: 50 }).map((_, i) => {
                  const colors = ['#12b76a', '#10a85c', '#0d9550', '#fbbf24', '#f59e0b', '#ef4444', '#3b82f6', '#8b5cf6'];
                  const color = colors[Math.floor(Math.random() * colors.length)];
                  const left = Math.random() * 100;
                  const delay = Math.random() * 1.5;
                  const duration = 2.5 + Math.random() * 1.5;
                  const size = 10 + Math.random() * 10;
                  const initialRotation = Math.random() * 360;
                  
                  return (
                    <div
                      key={`confetti-${i}-${formStep}`}
                      className="absolute rounded-full"
                      style={{
                        left: `${left}%`,
                        backgroundColor: color,
                        width: `${size}px`,
                        height: `${size}px`,
                        top: '-20px',
                        opacity: 0.9,
                        animation: `confetti-fall ${duration}s ease-out ${delay}s forwards`,
                        transform: `rotate(${initialRotation}deg)`,
                        willChange: 'transform, opacity',
                      }}
                    />
                  );
                })}
              </div>
            )}

            {/* Header - Hide on success */}
            {formStep === "details" && (
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
            )}

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
                  <div className="relative" ref={roleDropdownRef}>
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
                  <label className="text-sm font-medium text-gray-700">
                    Your SaaS Need <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <div className="relative" ref={saasNeedDropdownRef}>
                    <button
                      type="button"
                      onClick={() => setSaasNeedOpen((prev) => !prev)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                    >
                      <span className={memberDetails.saasNeed ? "text-gray-800" : "text-gray-400"}>
                        {memberDetails.saasNeed ? memberDetails.saasNeed : "Select your SaaS need"}
                      </span>
                      {saasNeedOpen ? (
                        <ChevronUpIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      ) : (
                        <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                      )}
                    </button>

                    {saasNeedOpen && (
                      <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                        <ul className="max-h-56 overflow-auto py-1">
                          {saasNeedOptions.map((need) => (
                            <li key={need}>
                              <button
                                type="button"
                                onClick={() => {
                                  setMemberDetails((prev) => ({ ...prev, saasNeed: need }));
                                  setSaasNeedOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                  memberDetails.saasNeed === need ? "bg-gray-50 text-gray-900" : "text-gray-800"
                                }`}
                              >
                                {need}
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
                    pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                    value={memberDetails.email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder="you@company.com"
                    className={`w-full rounded-lg border px-3 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
                      emailError
                        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
                    }`}
                  />
                  {emailError && (
                    <p className="text-sm text-red-600 mt-1">{emailError}</p>
                  )}
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
              <div className="px-6 py-12 text-center space-y-6 relative z-10">
                {/* Animated Checkmark Circle */}
                <div className="relative mb-6 flex justify-center items-center">
                  <div className="relative flex items-center justify-center" style={{ width: '120px', height: '120px' }}>
                    {/* Checkmark icon - centered */}
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#12b76a] to-[#10a85c] flex items-center justify-center shadow-2xl transform transition-all duration-500 scale-100 relative z-10">
                      <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    {/* Success rings animation - expanding outward around the icon */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#12b76a]/30 animate-ping" style={{ width: '80px', height: '80px' }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#12b76a]/20 animate-ping" style={{ width: '80px', height: '80px', animationDelay: '0.3s', animationDuration: '2s' }} />
                  </div>
                </div>

                <div>
                  <h4 className="text-3xl font-bold text-gray-900 mb-3">You&apos;ve successfully become a member.</h4>
                  <p className="text-sm text-gray-500 max-w-md mx-auto">
                    Check your email for your welcome steps and curated vendor picks. Start exploring verified SaaS solutions now!
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
                >
                  Start Exploring
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
