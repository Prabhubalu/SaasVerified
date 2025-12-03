const stats = [
  { label: "Happy Clients", value: "10K+" },
  { label: "Projects Completed", value: "50K+" },
  { label: "Years of Experience", value: "10+" },
  { label: "Countries Served", value: "50+" },
];

export function Stats() {
  return (
    <section className="py-20 bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-4xl sm:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-blue-200 text-sm sm:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

