"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useSaaSRecommendationsModal } from "@/contexts/SaaSRecommendationsModalContext";

const categories = [
  "CRM",
  "HRMS",
  "Accounting",
  "ERP",
  "Website / Mobile App",
  "Cloud Telephony",
  "Other",
];

const companySizes = [
  "1–10",
  "11–20",
  "21–50",
  "51–200",
  "201–500",
  "501+",
];

const decisionTimelines = [
  "Immediately",
  "0–30 days",
  "1–3 months",
  "Just exploring",
];

const roles = [
  "Founder / CXO",
  "Head / Manager",
  "Consultant",
  "Other",
];

export function SaaSRecommendationsModal() {
  const { isOpen, closeModal } = useSaaSRecommendationsModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [companySizeOpen, setCompanySizeOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    workEmail: "",
    companyName: "",
    lookingFor: "",
    companySize: "",
    decisionTimeline: "",
    role: "",
    phoneNumber: "",
    cityState: "",
  });

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
    setFormData((prev) => ({ ...prev, workEmail: newEmail }));
    
    if (emailError) {
      setEmailError("");
    }
    
    if (newEmail && newEmail.includes("@") && newEmail.includes(".")) {
      if (!validateEmailDomain(newEmail)) {
        setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      }
    }
  };

  const handleEmailBlur = () => {
    if (formData.workEmail && !validateEmailDomain(formData.workEmail)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
    } else {
      setEmailError("");
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    // Prevent form submission
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    // Validate current step before proceeding
    if (currentStep === 1) {
      if (!formData.fullName || !formData.workEmail || !formData.companyName) {
        setSubmitError("Please fill in all required fields.");
        return;
      }
      if (!validateEmailDomain(formData.workEmail)) {
        setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
        return;
      }
      setSubmitError("");
    } else if (currentStep === 2) {
      if (!formData.lookingFor || !formData.companySize) {
        setSubmitError("Please fill in all required fields.");
        return;
      }
      setSubmitError("");
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setSubmitError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setEmailError("");
    
    if (!validateEmailDomain(formData.workEmail)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // Map form data to API expected format
      const apiData = {
        fullName: formData.fullName,
        email: formData.workEmail,
        company: formData.companyName,
        role: formData.role || "Other",
        // Additional fields for future use
        lookingFor: formData.lookingFor,
        companySize: formData.companySize,
        decisionTimeline: formData.decisionTimeline,
        phoneNumber: formData.phoneNumber,
        cityState: formData.cityState,
      };

      const response = await fetch("/api/buyers/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiData),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit request right now.");
      }

      // Success - show success screen
      setShowSuccess(true);
      setIsSubmitting(false);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "Something went wrong.");
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    closeModal();
    setSubmitError("");
    setEmailError("");
    setIsSubmitting(false);
    setShowSuccess(false);
    setCurrentStep(1);
    setFormData({
      fullName: "",
      workEmail: "",
      companyName: "",
      lookingFor: "",
      companySize: "",
      decisionTimeline: "",
      role: "",
      phoneNumber: "",
      cityState: "",
    });
  };

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const companySizeDropdownRef = useRef<HTMLDivElement>(null);
  const roleDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (!isOpen && mounted) {
      setIsVisible(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, mounted]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && mounted) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, mounted]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (companySizeDropdownRef.current && !companySizeDropdownRef.current.contains(event.target as Node)) {
        setCompanySizeOpen(false);
      }
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(event.target as Node)) {
        setRoleOpen(false);
      }
    };

    if (companySizeOpen || roleOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [companySizeOpen, roleOpen]);

  if (!mounted || !shouldRender) return null;

  // Calculate progress: step 1 = 5%, step 2 = 52.5%, step 3 = 100%
  // Start at 5% to motivate users, then progress smoothly
  const progressPercentage = 5 + ((currentStep - 1) / 2) * 95;

  const modalContent = (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto transition-all duration-300 ${
          isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Screen */}
        {showSuccess ? (
          <div className="px-6 py-12 text-center">
            <div className="flex flex-col items-center justify-center">
              {/* Animated Checkmark Circle */}
              <div className="relative mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#12b76a] to-[#10a85c] flex items-center justify-center shadow-2xl transform transition-all duration-500 scale-100">
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
                {/* Success rings animation */}
                <div className="absolute inset-0 rounded-full border-4 border-[#12b76a]/30 animate-ping" />
                <div className="absolute inset-0 rounded-full border-2 border-[#12b76a]/20 animate-ping" style={{ animationDelay: '0.3s', animationDuration: '2s' }} />
              </div>

              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Request Submitted Successfully!
              </h3>
              <p className="text-lg text-gray-600 mb-2 max-w-md mx-auto">
                Thank you for your interest! We've received your request.
              </p>
              <p className="text-sm text-gray-500 mb-8 max-w-md mx-auto">
                Our team will review your requirements and get back to you with personalized SaaS recommendations within 24-48 hours.
              </p>

              <button
                onClick={handleClose}
                className="bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-200">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Get Verified SaaS Guidance</h3>
                  <p className="text-gray-600 mt-2">
                    Tell us a little about your needs. We'll help you choose the right SaaS — without sales pressure.
                  </p>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none"
                  aria-label="Close form"
                >
                  ✕
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Step {currentStep} of 3</span>
                  <span>{Math.round(progressPercentage)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-[#12b76a] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            </div>

            <form 
          onSubmit={(e) => {
            if (currentStep < 3) {
              e.preventDefault();
              handleNext();
            } else {
              handleSubmit(e);
            }
          }} 
          className="px-6 py-5"
        >
          {/* Step 1: Essentials */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, fullName: e.target.value }))}
                  placeholder="Enter your full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Work Email</label>
                <input
                  required
                  type="email"
                  value={formData.workEmail}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="name@company.com"
                  className={`w-full rounded-lg border px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
                    emailError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
                  }`}
                />
                <p className="text-xs text-gray-500 mt-1">
                  We prioritize requests from verified company domains
                </p>
                {emailError && (
                  <p className="text-sm text-red-600 mt-1">{emailError}</p>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Company Name</label>
                <input
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, companyName: e.target.value }))}
                  placeholder="Your company / business name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>
            </div>
          )}

          {/* Step 2: Context */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  What are you looking for? <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, lookingFor: category }))}
                      className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-all ${
                        formData.lookingFor === category
                          ? "border-[#12b76a] bg-[#12b76a]/10 text-[#12b76a]"
                          : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  Company Size <span className="text-red-500">*</span>
                </label>
                <div className="relative" ref={companySizeDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCompanySizeOpen((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                  >
                    <span className={formData.companySize ? "text-gray-800" : "text-gray-400"}>
                      {formData.companySize ? formData.companySize : "Select company size"}
                    </span>
                    {companySizeOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    )}
                  </button>

                  {companySizeOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                      <ul className="max-h-56 overflow-auto py-1">
                        {companySizes.map((size) => (
                          <li key={size}>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, companySize: size }));
                                setCompanySizeOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                formData.companySize === size ? "bg-gray-50 text-gray-900" : "text-gray-800"
                              }`}
                            >
                              {size}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Qualification */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Decision Timeline</label>
                <div className="flex flex-wrap gap-3">
                  {decisionTimelines.map((timeline) => (
                    <label
                      key={timeline}
                      className={`flex items-center px-4 py-2.5 rounded-lg border-2 cursor-pointer transition-all ${
                        formData.decisionTimeline === timeline
                          ? "border-[#12b76a] bg-[#12b76a]/10"
                          : "border-gray-300 bg-white hover:border-gray-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="decisionTimeline"
                        value={timeline}
                        checked={formData.decisionTimeline === timeline}
                        onChange={(e) => setFormData((prev) => ({ ...prev, decisionTimeline: e.target.value }))}
                        className="mr-2 text-[#12b76a] focus:ring-[#12b76a]"
                      />
                      <span className="text-sm font-medium text-gray-700">{timeline}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Role / Designation</label>
                <div className="relative" ref={roleDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setRoleOpen((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                  >
                    <span className={formData.role ? "text-gray-800" : "text-gray-400"}>
                      {formData.role ? formData.role : "Select role"}
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
                        {roles.map((role) => (
                          <li key={role}>
                            <button
                              type="button"
                              onClick={() => {
                                setFormData((prev) => ({ ...prev, role }));
                                setRoleOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                formData.role === role ? "bg-gray-50 text-gray-900" : "text-gray-800"
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
                <label className="text-sm font-medium text-gray-700">Phone Number <span className="text-gray-500 font-normal">(Optional)</span></label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="+1 (234) 567-8900"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Only if you'd like a call</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">City & State <span className="text-gray-500 font-normal">(Optional)</span></label>
                <input
                  value={formData.cityState}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cityState: e.target.value }))}
                  placeholder="City, State"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>
            </div>
          )}

          {submitError && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {submitError}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                currentStep === 1
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 bg-gray-100 hover:bg-gray-200"
              }`}
            >
              ← Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={(e) => handleNext(e)}
                className="bg-[#12b76a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors"
              >
                Continue →
              </button>
            ) : (
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#12b76a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Start My SaaS Search"}
              </button>
            )}
          </div>

          {/* Trust Text */}
          {currentStep === 3 && (
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 We don't spam. Your details are used only to guide your SaaS decision.
            </p>
          )}
        </form>
          </>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

