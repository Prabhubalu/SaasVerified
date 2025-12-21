import Image from "next/image";

export function WhyBuyingIsHard() {
  const problems = [
    "Inflated promises",
    "Confusing pricing",
    "Hidden charges",
    "Bad onboarding",
    "Zero accountability",
  ];

  // Group bullets into three visual \"tracks\" similar to the reference graphic
  const columns = [
    {
      label: "Before you buy",
      items: ["Inflated promises", "Confusing pricing"],
    },
    {
      label: "At the deal table",
      items: ["Hidden charges"],
    },
    {
      label: "After you sign",
      items: ["Bad onboarding", "Zero accountability"],
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-6 md:mb-8" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Buying SaaS Is Hard
          </h2>
          <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-4">
            The problem isn&apos;t just choosing a tool – it&apos;s the broken context around how SaaS is sold, priced, and delivered.
          </p>
          <div className="w-48 h-1 mx-auto bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>

        {/* Illustration – matches the reference-style visual */}
        <div className="max-w-5xl mx-auto mb-4 md:mb-8" data-aos="fade-up" data-aos-delay="100">
          <div className="relative w-full overflow-hidden">
            {/* Left fade */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-24"
              style={{
                background:
                  "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))",
              }}
            />
            {/* Right fade */}
            <div
              className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-24"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))",
              }}
            />
            <Image
              src="/assets/whybuyingsaasishard.svg"
              alt="Why buying SaaS is hard"
              width={1600}
              height={550}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Three-column breakdown under the illustration */}
        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {columns.map((column, colIndex) => (
              <div
                key={column.label}
                className="flex flex-col items-start text-left md:text-center border border-gray-200 rounded-lg p-4"
                data-aos="fade-up"
                data-aos-delay={colIndex * 100}
              >
                {/* Icon node above each column */}
                {/* <div className="flex justify-center w-full mb-3 md:mb-4">
                  <div className="w-12 h-12 rounded-full bg-white shadow-md border border-gray-200 flex items-center justify-center text-sm font-semibold text-gray-800">
                    {colIndex + 1}
                  </div>
                </div> */}

                <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-3 mx-auto">
                  {column.label}
                </h3>

                <div className="flex flex-wrap gap-2 md:gap-3 w-full justify-start md:justify-center">
                  {column.items.map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs md:text-sm font-medium text-gray-700 border border-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Fallback full list for accessibility / smaller screens */}
          <div className="mt-10 md:mt-12 border-t border-gray-200 pt-6 md:hidden" data-aos="fade-up" data-aos-delay={300}>
            <ul className="space-y-3">
              {problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3">
                  <span className="mt-1 inline-block w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                  <span className="text-base text-gray-700">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Solution line */}
          <div
            className="mt-10 md:mt-12 pt-6  text-center"
            data-aos="fade-up"
            data-aos-delay={400}
          >
            <p className="text-lg md:text-xl font-semibold text-gray-900">
              SaaS Verify solves this by verifying the truth.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

