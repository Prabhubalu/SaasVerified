"use client";

import { useState, useEffect, useRef } from "react";
import { ExclamationTriangleIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { CONTACT_ENQUIRY_OPTIONS } from "@/lib/contact-enquiry-options";
import { getEmailGuidance, isValidEmailFormat } from "@/lib/email-format";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [crmSyncWarning, setCrmSyncWarning] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [emailError, setEmailError] = useState("");
  const [enquiryTypeOpen, setEnquiryTypeOpen] = useState(false);
  const enquiryDropdownRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        enquiryDropdownRef.current &&
        !enquiryDropdownRef.current.contains(event.target as Node)
      ) {
        setEnquiryTypeOpen(false);
      }
    };

    if (enquiryTypeOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [enquiryTypeOpen]);

  useEffect(() => {
    if (submitStatus === "success" && cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [submitStatus]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    setEmailError("");
    if (!formData.email.trim()) {
      setEmailError(getEmailGuidance(formData.email));
    } else if (!isValidEmailFormat(formData.email)) {
      setEmailError(getEmailGuidance(formData.email));
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!formData.enquiryType) {
      newErrors.enquiryType = "Please select an option";
    }

    setErrors(newErrors);
    const emailOk = Boolean(formData.email.trim() && isValidEmailFormat(formData.email));
    return Object.keys(newErrors).length === 0 && emailOk;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setCrmSyncWarning(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          enquiryType: formData.enquiryType,
          message: formData.message.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(typeof data.error === "string" ? data.error : "Unable to send your message.");
      }

      const data: {
        leadSquared?: { ok: boolean; reason?: string };
      } = await response.json().catch(() => ({}));

      setSubmitStatus("success");
      setCrmSyncWarning(
        data.leadSquared?.ok === false && data.leadSquared?.reason === "capture_failed"
      );
      setFormData({ name: "", email: "", phone: "", enquiryType: "", message: "" });
      setErrors({});
      setEmailError("");
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    if (name === "email" && emailError) {
      setEmailError("");
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const handleEmailBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const v = e.target.value;
    if (v.trim() && !isValidEmailFormat(v)) {
      setEmailError(getEmailGuidance(v));
    }
  };

  return (
    <div
      ref={cardRef}
      className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100"
      data-aos="fade-up"
      data-aos-delay="200"
    >
      {submitStatus === "success" ? (
        <div
          className="flex flex-col items-center text-center py-4 md:py-6"
          role="status"
          aria-live="polite"
        >
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 ring-8 ring-green-50">
            <CheckCircleIcon className="h-10 w-10 text-green-600" aria-hidden="true" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">You&apos;re all set</h2>
          <p className="text-gray-600 text-base max-w-md mb-1">
            Thanks for reaching out — we&apos;ve received your message.
          </p>
          <p className="text-gray-500 text-sm max-w-md mb-8">
            We typically reply within 24 hours on business days. If it&apos;s urgent, use the email or phone on the left.
          </p>
          {crmSyncWarning && (
            <div className="w-full max-w-md mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-left">
              <ExclamationTriangleIcon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-amber-900 text-sm">
                We saved your message, but it could not be synced to our CRM. Our team can still see it via email.
                If this keeps happening, please email us directly or call the number on this page.
              </p>
            </div>
          )}
          <button
            type="button"
            onClick={() => {
              setSubmitStatus("idle");
              setCrmSyncWarning(false);
            }}
            className="inline-flex items-center justify-center rounded-xl border-2 border-[#12b76a] bg-white px-6 py-3 text-sm font-semibold text-[#12b76a] hover:bg-green-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#12b76a]/30"
          >
            Send another message
          </button>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">How can we help?</h2>
            <p className="text-gray-600 text-sm">
              Fill out the form below and we&apos;ll get back to you within 24 hours.
            </p>
          </div>

          {submitStatus === "error" && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
              <p className="text-red-700 text-sm">
                Something went wrong. Please try again later or contact us directly via email or phone.
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
              errors.name
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
            }`}
            placeholder="John Doe"
          />
          {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:items-start">
          <div className="space-y-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleEmailBlur}
              placeholder="you@example.com"
              className={`w-full rounded-lg border px-3 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
                emailError
                  ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
              }`}
              aria-invalid={emailError ? "true" : "false"}
              aria-describedby={emailError ? "contact-email-error" : undefined}
            />
            {emailError && (
              <p id="contact-email-error" className="text-sm text-red-600 mt-1" role="alert">
                {emailError}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <label htmlFor="phone" className="text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              autoComplete="tel"
              value={formData.phone}
              onChange={handleChange}
              className={`w-full rounded-lg border px-3 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none ${
                errors.phone
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
              }`}
              placeholder="+91 895 172 84 84"
            />
            {errors.phone && (
              <p className="text-sm text-red-600">{errors.phone}</p>
            )}
          </div>
        </div>

        <div className="space-y-1">
          <span id="enquiry-type-label" className="text-sm font-medium text-gray-700">
            How can we help? <span className="text-red-500">*</span>
          </span>
          <div className="relative" ref={enquiryDropdownRef}>
            <button
              type="button"
              id="enquiry-type-button"
              aria-haspopup="listbox"
              aria-expanded={enquiryTypeOpen}
              aria-labelledby="enquiry-type-label enquiry-type-value"
              onClick={() => setEnquiryTypeOpen((prev) => !prev)}
              className={`w-full rounded-lg border px-3 py-2 text-left focus:ring-2 outline-none bg-white flex items-center justify-between ${
                errors.enquiryType
                  ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                  : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
              }`}
            >
              <span
                id="enquiry-type-value"
                className={formData.enquiryType ? "text-gray-800" : "text-gray-400"}
              >
                {formData.enquiryType ? formData.enquiryType : "Select an option"}
              </span>
              {enquiryTypeOpen ? (
                <ChevronUpIcon className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
              ) : (
                <ChevronDownIcon className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" />
              )}
            </button>

            {enquiryTypeOpen && (
              <div
                className="absolute z-20 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg"
                role="listbox"
                aria-labelledby="enquiry-type-label"
              >
                <ul className="max-h-56 overflow-auto py-1">
                  {CONTACT_ENQUIRY_OPTIONS.map((opt) => (
                    <li key={opt} role="option" aria-selected={formData.enquiryType === opt}>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData((prev) => ({ ...prev, enquiryType: opt }));
                          setEnquiryTypeOpen(false);
                          setErrors((prev) => ({ ...prev, enquiryType: "" }));
                        }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 ${
                          formData.enquiryType === opt
                            ? "bg-gray-50 text-gray-900"
                            : "text-gray-800"
                        }`}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {errors.enquiryType && (
            <p className="text-sm text-red-600">{errors.enquiryType}</p>
          )}
        </div>

        <div className="space-y-1">
          <label htmlFor="message" className="text-sm font-medium text-gray-700">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows={6}
            value={formData.message}
            onChange={handleChange}
            className={`w-full rounded-lg border px-3 py-2 text-gray-800 placeholder-gray-400 focus:ring-2 outline-none resize-none ${
              errors.message
                ? "border-red-300 bg-red-50 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-300 focus:border-[#12b76a] focus:ring-[#12b76a]/20"
            }`}
            placeholder="Tell us more about your inquiry..."
          />
          {errors.message && (
            <p className="text-sm text-red-600">{errors.message}</p>
          )}
          <p className="text-xs text-gray-500">
            {formData.message.length} characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-[#12b76a] to-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <span>Send Message</span>
              <PaperAirplaneIcon className="w-5 h-5" />
            </>
          )}
        </button>
      </form>
        </>
      )}
    </div>
  );
}
