"use client";

export function TrustedBy() {
  const partners = [
    "Partner 1",
    "Partner 2",
    "Partner 3",
    "Partner 4",
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Modern Teams
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-8 h-32 flex items-center justify-center border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-gray-400 text-sm font-medium">
                {partner}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

