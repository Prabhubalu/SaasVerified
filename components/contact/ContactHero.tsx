"use client";

import { ContactForm } from "@/components/common/ContactForm";

export function ContactHero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-blue-50 opacity-50"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div className="max-w-2xl" data-aos="fade-up">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Let's Start a Conversation
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-4">
              Have questions? We're here to help. Get in touch with our team and we'll respond as soon as possible.
            </p>
            <p className="text-base text-gray-500 mb-8">
              Whether you're a buyer looking for verified SaaS solutions or a vendor seeking verification, we're ready to assist you.
            </p>
            
            {/* Quick Contact Info */}
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#12b76a] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <a href="mailto:hello@saasverify.com" className="text-gray-700 hover:text-[#12b76a] transition-colors">
                  hello@saasverify.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-[#12b76a] rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <a href="tel:+918951728484" className="text-gray-700 hover:text-[#12b76a] transition-colors">
                  +91 895 172 84 84
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-[#12b76a] rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <a 
                  href="https://maps.google.com/?q=33,+14th+Cross,+9th+Main+Rd,+Sector+6,+HSR+Layout,+Bengaluru,+Karnataka+560102"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-700 hover:text-[#12b76a] transition-colors"
                >
                  <div>
                    <p>33, 14th Cross, 9th Main Rd,</p>
                    <p>Sector 6, HSR Layout,</p>
                    <p>Bengaluru, Karnataka – 560102</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Right Content - Contact Form */}
          <div className="lg:sticky lg:top-24" data-aos="fade-up" data-aos-delay="200">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

