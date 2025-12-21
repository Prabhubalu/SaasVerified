"use client";

import { EnvelopeIcon, PhoneIcon, MapPinIcon } from "@heroicons/react/24/outline";

interface ContactInfoCardProps {
  icon: React.ReactNode;
  title: string;
  content: string | React.ReactNode;
  link?: string;
  linkText?: string;
}

function ContactInfoCard({ icon, title, content, link, linkText }: ContactInfoCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 group"
      data-aos="fade-up"
    >
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-gradient-to-br from-[#12b76a] to-green-600 rounded-xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <div className="text-gray-600 space-y-1">
            {typeof content === "string" ? (
              <p className="leading-relaxed">{content}</p>
            ) : (
              content
            )}
          </div>
          {link && linkText && (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 text-[#12b76a] font-medium hover:text-green-700 transition-colors flex items-center group/link"
            >
              {linkText}
              <svg
                className="w-4 h-4 ml-1 group-hover/link:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <ContactInfoCard
        icon={<EnvelopeIcon className="w-6 h-6" />}
        title="Email Us"
        content="Drop us a line anytime, and we'll get back to you as soon as possible."
        link="mailto:hello@saasverify.com"
        linkText="hello@saasverify.com"
      />

      <ContactInfoCard
        icon={<PhoneIcon className="w-6 h-6" />}
        title="Call Us"
        content="Speak directly with our team during business hours."
        link="tel:+918951728484"
        linkText="+91 895 172 84 84"
      />

      <ContactInfoCard
        icon={<MapPinIcon className="w-6 h-6" />}
        title="Visit Us"
        content={
          <>
            <p>33, 14th Cross, 9th Main Rd,</p>
            <p>Sector 6, HSR Layout,</p>
            <p>Bengaluru, Karnataka – 560102</p>
          </>
        }
        link="https://maps.google.com/?q=33,+14th+Cross,+9th+Main+Rd,+Sector+6,+HSR+Layout,+Bengaluru,+Karnataka+560102"
        linkText="View on Google Maps"
      />
    </div>
  );
}

