"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useVendorModal } from "@/contexts/VendorModalContext";

const categories = [
  "CRM",
  "HRMS",
  "Support",
  "Project Management",
  "Automation",
  "Finance",
  "Billing",
  "Marketing",
  "Sales",
  "Analytics",
  "Security",
  "Communication",
  "Other",
];

const pricingModels = [
  "Free",
  "Freemium",
  "One-time Payment",
  "Monthly Subscription",
  "Annual Subscription",
  "Usage-based",
  "Per User",
  "Enterprise",
  "Custom",
];

export function VendorModal() {
  const { isOpen, closeModal } = useVendorModal();
  const [formStep, setFormStep] = useState<"details" | "success">("details");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [pricingModelOpen, setPricingModelOpen] = useState(false);

  const [vendorDetails, setVendorDetails] = useState({
    productName: "",
    websiteUrl: "",
    category: "",
    targetAudience: "",
    contactName: "",
    emailAddress: "",
    phoneNumber: "",
    pricingModel: "",
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
    setVendorDetails((prev) => ({ ...prev, emailAddress: newEmail }));
    
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
    if (vendorDetails.emailAddress && !validateEmailDomain(vendorDetails.emailAddress)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
    } else {
      setEmailError("");
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setEmailError("");
    
    // Validate email before submission
    if (!validateEmailDomain(vendorDetails.emailAddress)) {
      setEmailError("Please use your work email address. Personal email addresses (Gmail, Yahoo, etc.) are not accepted.");
      return;
    }
    
    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API endpoint
      const response = await fetch("/api/vendors/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(vendorDetails),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Unable to submit application right now.");
      }

      setFormStep("success");
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
    setVendorDetails({
      productName: "",
      websiteUrl: "",
      category: "",
      targetAudience: "",
      contactName: "",
      emailAddress: "",
      phoneNumber: "",
      pricingModel: "",
    });
  };

  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const pricingModelDropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && mounted) {
      setShouldRender(true);
      // Small delay to trigger transition after render
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      });
    } else if (!isOpen && mounted) {
      setIsVisible(false);
      // Wait for transition to complete before unmounting
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Match transition duration
      return () => clearTimeout(timer);
    }
  }, [isOpen, mounted]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen && mounted) {
      // Prevent scrolling
      document.body.style.overflow = "hidden";
      // Restore scrolling on cleanup
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, mounted]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setCategoryOpen(false);
      }
      if (pricingModelDropdownRef.current && !pricingModelDropdownRef.current.contains(event.target as Node)) {
        setPricingModelOpen(false);
      }
    };

    if (categoryOpen || pricingModelOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryOpen, pricingModelOpen]);

  if (!mounted || !shouldRender) return null;

  const modalContent = (
    <div 
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-visible max-h-[90vh] overflow-y-auto transition-all duration-300 relative ${
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
              <h3 className="text-xl font-semibold text-gray-900">Become a Verified Vendor</h3>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close vendor form"
            >
              ✕
            </button>
          </div>
        )}

        {formStep === "details" ? (
          <form onSubmit={handleSubmit} className="px-6 py-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Row 1 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Product name</label>
                <input
                  required
                  value={vendorDetails.productName}
                  onChange={(e) =>
                    setVendorDetails((prev) => ({ ...prev, productName: e.target.value }))
                  }
                  placeholder="Your SaaS Product Name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Website URL</label>
                <input
                  required
                  type="url"
                  value={vendorDetails.websiteUrl}
                  onChange={(e) =>
                    setVendorDetails((prev) => ({ ...prev, websiteUrl: e.target.value }))
                  }
                  placeholder="https://yourproduct.com"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              {/* Row 2 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="relative" ref={categoryDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setCategoryOpen((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                  >
                    <span className={vendorDetails.category ? "text-gray-800" : "text-gray-400"}>
                      {vendorDetails.category ? vendorDetails.category : "Select a category"}
                    </span>
                    {categoryOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    )}
                  </button>

                  {categoryOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                      <ul className="max-h-56 overflow-auto py-1">
                        {categories.map((category) => (
                          <li key={category}>
                            <button
                              type="button"
                              onClick={() => {
                                setVendorDetails((prev) => ({ ...prev, category }));
                                setCategoryOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                vendorDetails.category === category ? "bg-gray-50 text-gray-900" : "text-gray-800"
                              }`}
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Target Audience</label>
                <input
                  required
                  value={vendorDetails.targetAudience}
                  onChange={(e) =>
                    setVendorDetails((prev) => ({ ...prev, targetAudience: e.target.value }))
                  }
                  placeholder="e.g., Small businesses, Enterprise, Developers"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              {/* Row 3 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Contact Name</label>
                <input
                  required
                  value={vendorDetails.contactName}
                  onChange={(e) =>
                    setVendorDetails((prev) => ({ ...prev, contactName: e.target.value }))
                  }
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Email Address</label>
                <input
                  required
                  type="email"
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  value={vendorDetails.emailAddress}
                  onChange={handleEmailChange}
                  onBlur={handleEmailBlur}
                  placeholder="contact@yourproduct.com"
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

              {/* Row 4 */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  required
                  type="tel"
                  value={vendorDetails.phoneNumber}
                  onChange={(e) =>
                    setVendorDetails((prev) => ({ ...prev, phoneNumber: e.target.value }))
                  }
                  placeholder="+1 (234) 567-8900"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Pricing Model</label>
                <div className="relative" ref={pricingModelDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setPricingModelOpen((prev) => !prev)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-left focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none bg-white flex items-center justify-between"
                  >
                    <span className={vendorDetails.pricingModel ? "text-gray-800" : "text-gray-400"}>
                      {vendorDetails.pricingModel ? vendorDetails.pricingModel : "Select pricing model"}
                    </span>
                    {pricingModelOpen ? (
                      <ChevronUpIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    ) : (
                      <ChevronDownIcon className="w-4 h-4 text-gray-400" aria-hidden="true" />
                    )}
                  </button>

                  {pricingModelOpen && (
                    <div className="absolute z-10 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg">
                      <ul className="max-h-56 overflow-auto py-1">
                        {pricingModels.map((model) => (
                          <li key={model}>
                            <button
                              type="button"
                              onClick={() => {
                                setVendorDetails((prev) => ({ ...prev, pricingModel: model }));
                                setPricingModelOpen(false);
                              }}
                              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                                vendorDetails.pricingModel === model ? "bg-gray-50 text-gray-900" : "text-gray-800"
                              }`}
                            >
                              {model}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 bg-gray-50 border border-dashed border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600">
              We&apos;ll review your application and get back to you within 3-5 business days.
            </div>

            {submitError && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {submitError}
              </div>
            )}

            <div className="flex items-center justify-between pt-4">
              <div className="text-sm text-gray-500">Free to apply</div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#12b76a] text-white px-5 py-2.5 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
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
              <h4 className="text-3xl font-bold text-gray-900 mb-3">Application Submitted!</h4>
              <p className="text-sm text-gray-500 max-w-md mx-auto">
                We&apos;ve received your application. Our team will review it and contact you within 3-5 business days.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="bg-[#12b76a] text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

