export function TrustBar() {
  const companies = [
    "Booking.com",
    "IBM",
    "Logitech",
    "Fortinet",
    "TIBCO",
    "Spotify",
    "T-Mobile",
    "Netflix",
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 mb-8 text-lg">
          Join 800,000+ Highly Productive Teams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {companies.map((company, index) => (
            <div
              key={index}
              className="h-8 flex items-center justify-center opacity-60 hover:opacity-100 transition-opacity"
            >
              <span className="text-gray-500 font-medium text-sm">{company}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

