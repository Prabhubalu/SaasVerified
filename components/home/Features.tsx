const features = [
  {
    title: "SEO Optimization",
    description: "Boost your search engine rankings with our proven SEO strategies and techniques.",
    icon: "🔍",
  },
  {
    title: "Performance Analytics",
    description: "Track your business growth with comprehensive analytics and insights.",
    icon: "📊",
  },
  {
    title: "Content Marketing",
    description: "Engage your audience with high-quality, SEO-optimized content.",
    icon: "✍️",
  },
  {
    title: "Social Media Integration",
    description: "Expand your reach across all major social media platforms.",
    icon: "📱",
  },
  {
    title: "Mobile Responsive",
    description: "Ensure your business looks great on all devices and screen sizes.",
    icon: "📱",
  },
  {
    title: "24/7 Support",
    description: "Get help whenever you need it with our round-the-clock support team.",
    icon: "💬",
  },
];

export function Features() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us
          </h2>
          <div className="w-48 h-1 mx-auto mb-4 bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to grow your business and reach more customers
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
              data-aos="fade-up"
              data-aos-delay={100 * index}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

