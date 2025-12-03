import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SaasVerified and our mission to help businesses grow faster through innovative solutions and SEO optimization.",
  openGraph: {
    title: "About Us | SaasVerified",
    description: "Learn about SaasVerified and our mission to help businesses grow faster.",
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">About Us</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We're dedicated to helping businesses reach their full potential
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            At SaasVerified, we believe every business deserves the tools and strategies to succeed in the digital age. 
            Our mission is to empower businesses of all sizes with cutting-edge solutions that drive growth, increase 
            visibility, and maximize their online potential.
          </p>
          <p className="text-gray-600">
            We combine years of industry expertise with innovative technologies to deliver results that matter. 
            From SEO optimization to comprehensive analytics, we provide the insights and tools your business needs to thrive.
          </p>
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
          <p className="text-gray-600 mb-4">
            We envision a world where every business can easily reach their target audience, regardless of their size or budget. 
            Through accessible, powerful tools and expert guidance, we're making digital success achievable for everyone.
          </p>
          <p className="text-gray-600">
            Our commitment to excellence drives us to continuously innovate and improve our services, ensuring our clients 
            always have access to the latest strategies and technologies in digital marketing and business growth.
          </p>
        </div>
      </div>

      <div className="bg-gray-50 rounded-lg p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Results-Driven</h3>
            <p className="text-gray-600">We focus on delivering measurable results that impact your bottom line.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Client-Focused</h3>
            <p className="text-gray-600">Your success is our success. We're committed to your growth.</p>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">We stay ahead of the curve with the latest technologies and strategies.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

