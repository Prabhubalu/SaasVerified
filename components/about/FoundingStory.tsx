"use client";

export function FoundingStory() {
  const stats = [
    {
      number: "2023",
      label: "Founded",
    },
    {
      number: "10k+",
      label: "Vendors Verified",
    },
    {
      number: "50+",
      label: "Global Partners",
    },
    {
      number: "24/7",
      label: "Monitoring",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
            Founding Story
          </h2>
          <div className="max-w-4xl space-y-6 text-lg text-gray-600">
            <p>
              SaaS Verify was born from a simple frustration: the software procurement process was broken. Too many businesses were making critical decisions based on marketing claims rather than verified facts.
            </p>
            <p>
              Our founders, having experienced firsthand the challenges of selecting the right SaaS tools, recognized the need for an independent verification platform that would bring transparency and trust to the marketplace.
            </p>
            <p>
              Today, we're proud to be the trusted partner for thousands of businesses worldwide, helping them navigate the complex SaaS landscape with confidence and clarity.
            </p>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-left"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-5xl md:text-6xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-base md:text-lg text-gray-600">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

