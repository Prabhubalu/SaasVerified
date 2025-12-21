"use client";

export function Leadership() {
  const leaders = [
    {
      name: "Sarah Johnson",
      title: "CEO & Co-Founder",
      image: "/assets/testimonials/avatar1.svg",
    },
    {
      name: "Michael Chen",
      title: "CTO & Co-Founder",
      image: "/assets/testimonials/avatar2.svg",
    },
    {
      name: "Emily Rodriguez",
      title: "Head of Verification",
      image: "/assets/testimonials/avatar3.svg",
    },
    {
      name: "David Thompson",
      title: "Head of Partnerships",
      image: "/assets/testimonials/avatar4.svg",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Leadership
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Meet the team driving innovation and transparency in SaaS verification
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {leaders.map((leader, index) => (
            <div
              key={index}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-100 to-green-100 mx-auto mb-4 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-400">
                    {leader.name.charAt(0)}
                  </span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {leader.name}
              </h3>
              <p className="text-sm text-gray-600">
                {leader.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

