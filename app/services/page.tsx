import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description: "Discover our comprehensive range of services designed to help your business grow: SEO optimization, content marketing, analytics, and more.",
  openGraph: {
    title: "Services | SaasVerified",
    description: "Comprehensive business growth services including SEO, content marketing, and analytics.",
  },
};

const services = [
  {
    title: "SEO Optimization",
    description: "Comprehensive SEO strategies to improve your search engine rankings and drive organic traffic to your website.",
    features: [
      "Keyword research and analysis",
      "On-page and off-page optimization",
      "Technical SEO audits",
      "Link building strategies",
      "Performance tracking and reporting",
    ],
    price: "Starting at $499/month",
  },
  {
    title: "Content Marketing",
    description: "Create engaging, SEO-optimized content that resonates with your audience and drives conversions.",
    features: [
      "Content strategy development",
      "Blog post creation",
      "Social media content",
      "Email marketing campaigns",
      "Content performance analysis",
    ],
    price: "Starting at $699/month",
  },
  {
    title: "Performance Analytics",
    description: "Track and analyze your business performance with comprehensive analytics and actionable insights.",
    features: [
      "Custom dashboard setup",
      "Real-time performance tracking",
      "Conversion rate optimization",
      "A/B testing",
      "Monthly performance reports",
    ],
    price: "Starting at $399/month",
  },
  {
    title: "Social Media Management",
    description: "Expand your reach and engage with your audience across all major social media platforms.",
    features: [
      "Platform strategy development",
      "Content creation and scheduling",
      "Community management",
      "Social media advertising",
      "Engagement analytics",
    ],
    price: "Starting at $599/month",
  },
  {
    title: "Web Development",
    description: "Modern, responsive websites that are optimized for performance, SEO, and conversions.",
    features: [
      "Responsive design",
      "SEO-friendly structure",
      "Fast loading times",
      "Mobile optimization",
      "Ongoing maintenance",
    ],
    price: "Custom pricing",
  },
  {
    title: "Consulting Services",
    description: "Expert guidance to help you make informed decisions and develop effective growth strategies.",
    features: [
      "Business strategy review",
      "Market analysis",
      "Competitive research",
      "Growth planning",
      "Implementation support",
    ],
    price: "Starting at $199/hour",
  },
];

export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Services</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Comprehensive solutions designed to accelerate your business growth
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h2>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <ul className="space-y-2 mb-6">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-lg font-semibold text-blue-600 mb-4">{service.price}</p>
              <Link
                href="/contact"
                className="block w-full text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-lg p-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Need a Custom Solution?</h2>
        <p className="text-xl text-gray-600 mb-6">
          We can create a tailored package that fits your specific needs and budget.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}

