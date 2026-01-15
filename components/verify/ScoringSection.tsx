export function ScoringSection() {
  const scoreTiers = [
    {
      score: "70-79",
      trustLevel: "Reliable",
      meaning: "Meets basic expectations.",
    },
    {
      score: "80-89",
      trustLevel: "Trusted",
      meaning: "Strong onboarding & delivery.",
    },
    {
      score: "90-100",
      trustLevel: "Proven",
      meaning: "Consistent real-world outcomes.",
    },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Scoring
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Each product is scored from 0-100. Only products scoring 70+ are listed.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full mt-6"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-200">
              {scoreTiers.map((tier, index) => (
                <div
                  key={index}
                  className="p-6 text-center"
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                >
                  <div className="text-3xl font-bold text-[#12b76a] mb-2">
                    {tier.score}
                  </div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">
                    {tier.trustLevel}
                  </div>
                  <div className="text-gray-600">
                    {tier.meaning}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

