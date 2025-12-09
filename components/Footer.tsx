import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  showCTA?: boolean;
}

export function Footer({ showCTA = false }: FooterProps) {
  return (
    <footer className="relative overflow-hidden">
      {/* Background Image for entire footer */}
      <div className="absolute inset-0">
        <Image
          src="/assets/footer-bg.png"
          alt="Footer Background"
          fill
          className="object-cover object-top"
          priority
        />
      </div>

      {/* CTA Section - Conditionally Rendered */}
      {showCTA && (
        <div className="relative py-20 overflow-hidden rounded-tr-[120px]">
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <h2 className="text-5xl md:text-6xl font-normal text-gray-900 mb-8 leading-tight tracking-[-1px]" style={{ fontFamily: 'Literata, serif' }} data-aos="fade-up">
                Ready to go? Join the SaaS Verify Inner Circle
              </h2>
              
              <div className="flex" data-aos="zoom-in" data-aos-delay="200">
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 bg-[#12b76a] text-white px-4 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors text-base"
                >
                  <span>Get Membership</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <div className={`relative ${showCTA ? 'pt-16' : 'pt-16'} pb-0`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 pb-16">
            {/* Logo and Contact */}
            <div className="flex flex-col gap-4" data-aos="fade-up">
              <Link href="/" className="inline-block mb-2">
                <div className="relative w-36 h-14">
                  <Image
                    src="/assets/saas-verified-logo.png"
                    alt="SaaS Verify Logo"
                    width={144}
                    height={56}
                    className="w-full h-full object-contain"
                  />
                </div>
              </Link>
              <a href="mailto:hello@saasverify.com" className="text-sm text-gray-600 hover:text-gray-900">
                hello@saasverify.com
              </a>
              <a href="tel:+918951728484" className="text-sm text-[#475467] hover:text-gray-900">
                +91 89517 28484.
              </a>
            </div>

            {/* Company */}
            <div className="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="100">
              <h4 className="text-sm font-semibold text-black">Company</h4>
              <ul className="space-y-3 text-sm text-[#333333]">
                <li>
                  <Link href="/blog" className="hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/refund" className="hover:text-gray-900">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="200">
              <h4 className="text-sm font-semibold text-black">Social</h4>
              <ul className="space-y-3 text-sm text-[#333333]">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Instagram
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    X (Twitter)
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    LinkedIn
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    YouTube
                  </Link>
                </li>
              </ul>
            </div>

            {/* Product */}
            <div className="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="300">
              <h4 className="text-sm font-semibold text-black">Product</h4>
              <ul className="space-y-3 text-sm text-[#333333]">
                <li>
                  <Link href="/about" className="hover:text-gray-900">
                    About Saas Verify
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-gray-900">
                    Marketplace
                  </Link>
                </li>
                <li>
                  <Link href="/buyers" className="hover:text-gray-900">
                    For Buyers
                  </Link>
                </li>
                <li>
                  <Link href="/vendors" className="hover:text-gray-900">
                    For Vendors
                  </Link>
                </li>
                <li>
                  <Link href="/how-we-verify" className="hover:text-gray-900">
                    How We Verify
                  </Link>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div className="flex flex-col gap-4" data-aos="fade-up" data-aos-delay="400">
              <h4 className="text-sm font-semibold text-black">Resources</h4>
              <ul className="space-y-3 text-sm text-[#333333]">
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-gray-900">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-gray-900">
                    Contact us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Bar - Dark Background */}
          <div className="-mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
              <p className="text-base text-[#676d79] mb-4 sm:mb-0 text-center sm:text-left">
                © 2025 SaaSVerify. All rights reserved.
              </p>
              <div className="flex items-center gap-1">
                <svg className="w-4 h-4 text-[#9195a2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-sm text-[#9195a2]">Powered by Arivu</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
