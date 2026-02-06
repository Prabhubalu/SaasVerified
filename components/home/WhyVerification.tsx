import Image from "next/image";

export function WhyVerification() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why SaasVerify Matters?
          </h2>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <div className="relative" data-aos="fade-right">
            <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
              <Image
                src="/assets/Whymemberships.png"
                alt="Business illustration"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain"
              />
            </div>
          </div>

          {/* Right Side - Content */}
          <div data-aos="fade-left" data-aos-delay="150">
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              SaaS Verify protects from these mistakes.
            </h3>
            <p className="text-lg text-gray-700 mb-4">
              Hidden onboarding costs… long integrations… unresponsive support… vendors over-promise and disappear once you sign the contract.
            </p>
            <p className="text-lg text-gray-700">
              Many businesses lose money and time — not because they chose the wrong software, but because they trusted the wrong claims.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
