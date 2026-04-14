"use client";

import { useState, useEffect, useRef, type FormEvent } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useSaaSRecommendationsModal } from "@/contexts/SaaSRecommendationsModalContext";
import { INDIAN_STATES, getCitiesForState } from "@/lib/india-locations";
import { isValidIndiaPhone } from "@/lib/phone-in";
import { getEmailGuidance, isValidEmailFormat } from "@/lib/email-format";

const STORAGE_KEY = "sv_lead_attribution";

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

function fireLeadConversionEvent() {
  if (typeof window === "undefined") return;
  const w = window as Window & { gtag?: (...args: unknown[]) => void };
  if (typeof w.gtag === "function") {
    w.gtag("event", "generate_lead", {
      form_name: "buyer_saas_recommendations",
    });
  }
}

export function SaaSRecommendationsModal() {
  const router = useRouter();
  const { isOpen, closeModal } = useSaaSRecommendationsModal();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [companySizeOpen, setCompanySizeOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    companyName: "",
    lookingFor: "",
    companySize: "",
    decisionTimeline: "",
    role: "",
    phoneNumber: "",
    stateName: "",
    cityName: "",
  });

  const handleNext = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (currentStep === 1) {
      if (!formData.fullName || !formData.email || !formData.companyName) {
        setSubmitError("Please fill in all required fields.");
        setEmailError("");
        return;
      }
      if (!isValidEmailFormat(formData.email)) {
        setEmailError(getEmailGuidance(formData.email));
        setSubmitError("");
        return;
      }
      setEmailError("");
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

    if (!isValidEmailFormat(formData.email)) {
      setEmailError(getEmailGuidance(formData.email));
      setCurrentStep(1);
      return;
    }
    setEmailError("");

    if (!formData.role) {
      setSubmitError("Please select your role.");
      return;
    }
    if (!formData.phoneNumber.trim()) {
      setSubmitError("Phone number is required.");
      return;
    }
    if (!isValidIndiaPhone(formData.phoneNumber)) {
      setSubmitError("Enter a valid Indian mobile number (10 digits, starting with 6–9).");
      return;
    }
    if (!formData.stateName || !formData.cityName) {
      setSubmitError("Please select your state and city.");
      return;
    }

    setIsSubmitting(true);

    try {
      let attribution: Record<string, string | undefined> = {};
      try {
        attribution = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "{}") as Record<
          string,
          string | undefined
        >;
      } catch {
        attribution = {};
      }

      const params = new URLSearchParams(window.location.search);

      const apiData = {
        fullName: formData.fullName,
        email: formData.email,
        company: formData.companyName,
        role: formData.role,
        lookingFor: formData.lookingFor,
        companySize: formData.companySize,
        decisionTimeline: formData.decisionTimeline,
        phoneNumber: formData.phoneNumber.trim(),
        stateName: formData.stateName,
        cityName: formData.cityName,
        utmSource: params.get("utm_source") || attribution.utm_source,
        utmMedium: params.get("utm_medium") || attribution.utm_medium,
        utmCampaign: params.get("utm_campaign") || attribution.utm_campaign,
        referrer: attribution.referrer || (document.referrer || undefined),
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

      fireLeadConversionEvent();
      handleClose();
      router.push("/marketplace");
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
    setCurrentStep(1);
    setFormData({
      fullName: "",
      email: "",
      companyName: "",
      lookingFor: "",
      companySize: "",
      decisionTimeline: "",
      role: "",
      phoneNumber: "",
      stateName: "",
      cityName: "",
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

  useEffect(() => {
    if (!isOpen || !mounted) return;
    try {
      if (!sessionStorage.getItem(STORAGE_KEY)) {
        const params = new URLSearchParams(window.location.search);
        sessionStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            utm_source: params.get("utm_source") || undefined,
            utm_medium: params.get("utm_medium") || undefined,
            utm_campaign: params.get("utm_campaign") || undefined,
            utm_content: params.get("utm_content") || undefined,
            utm_term: params.get("utm_term") || undefined,
            referrer: document.referrer || undefined,
            landingPath: window.location.pathname + window.location.search,
          })
        );
      }
    } catch {
      // private mode / blocked storage
    }
  }, [isOpen, mounted]);

  useEffect(() => {
    if (isOpen && mounted) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "";
      };
    }
  }, [isOpen, mounted]);

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

  const progressPercentage = 5 + ((currentStep - 1) / 2) * 95;
  const cityOptions = formData.stateName ? getCitiesForState(formData.stateName) : [];

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
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Get Verified SaaS Guidance</h3>
              <p className="text-gray-600 mt-2">
                Tell us a little about your needs. We&apos;ll help you choose the right SaaS — without sales
                pressure.
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

          <div className="mt-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>
                Step {currentStep} of 3
              </span>
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
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  required
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, email: e.target.value }));
                    if (emailError) setEmailError("");
                  }}
                  onBlur={(e) => {
                    const v = e.target.value;
                    if (v.trim() && !isValidEmailFormat(v)) {
                      setEmailError(getEmailGuidance(v));
                    }
                  }}
                  placeholder="you@example.com"
                  className={`w-full rounded-lg border px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
                    emailError
                      ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                      : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
                  }`}
                  aria-invalid={emailError ? "true" : "false"}
                  aria-describedby={emailError ? "buyer-email-error" : "buyer-email-hint"}
                />
                {emailError ? (
                  <p id="buyer-email-error" className="text-sm text-red-600 mt-1" role="alert">
                    {emailError}
                  </p>
                ) : (
                  <p id="buyer-email-hint" className="text-xs text-gray-500 mt-1">
                    Use a standard address with @ and a domain (e.g. name@company.com).
                  </p>
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
                <label className="text-sm font-medium text-gray-700">
                  Role / Designation <span className="text-red-500">*</span>
                </label>
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
                <label className="text-sm font-medium text-gray-700">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  required
                  type="tel"
                  autoComplete="tel"
                  inputMode="numeric"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData((prev) => ({ ...prev, phoneNumber: e.target.value }))}
                  placeholder="10-digit mobile (e.g. 9876543210)"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 placeholder-gray-400 focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                />
                <p className="text-xs text-gray-500 mt-1">Indian mobile numbers only (6–9 as first digit).</p>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  value={formData.stateName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      stateName: e.target.value,
                      cityName: "",
                    }))
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 bg-white focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none"
                >
                  <option value="">Select state</option>
                  {INDIAN_STATES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <select
                  required
                  disabled={!formData.stateName}
                  value={formData.cityName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, cityName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-800 bg-white focus:border-[#12b76a] focus:ring-2 focus:ring-[#12b76a]/20 outline-none disabled:bg-gray-50 disabled:text-gray-400"
                >
                  <option value="">{formData.stateName ? "Select city" : "Select state first"}</option>
                  {cityOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {submitError && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {submitError}
            </div>
          )}

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

          {currentStep === 3 && (
            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 We don&apos;t spam. Your details are used only to guide your SaaS decision.
            </p>
          )}
        </form>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
