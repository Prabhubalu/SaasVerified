export function WhyVerification() {
  const cards = [
    {
      title: "Business Leaders & Foundations",
      description: "Make confident buying decisions.",
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
    },
    {
      title: "IT Heads / CIOs:",
      description: "Validate integrations, SLAs, onboarding, and security.",
      bgColor: "bg-cyan-100",
      textColor: "text-cyan-900",
    },
    {
      title: "SaaS Vendors:",
      description: "Earn credibility, convert more deals, and stand apart.",
      bgColor: "bg-green-100",
      textColor: "text-green-900",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Verification Matters
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Handpicked and rigorously checked for quality and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`${card.bgColor} rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow`}
            >
              <h3 className={`${card.textColor} font-semibold text-xl mb-3`}>
                {card.title}
              </h3>
              <p className="text-gray-700 text-lg">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

