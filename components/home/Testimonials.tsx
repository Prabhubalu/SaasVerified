import Image from "next/image";

const testimonials = [
  {
    name: "Ravi Sharma",
    role: "Director, Sunsure Energy India",
    content: "We were about to sign a 3-year contract with a CRM vendor. Thanks to SaaS Verify's review and verification process, we discovered hidden integration costs that would have doubled our budget. Their team saved us lakhs and guided us to a verified alternative that actually fits our business.",
    avatar: "/assets/testimonials/avatar1.svg",
  },
  {
    name: "Meera Krishnan",
    role: "VP Sales, TechEdge Solutions",
    content: "Our first SaaS purchase was a disaster — poor onboarding, zero adoption. With SaaS Verify, we finally felt secure. The vendor we picked through their platform delivered on every commitment, and our 80-member sales team was live in under 4 weeks. No surprises, no excuses.",
    avatar: "/assets/testimonials/avatar2.svg",
  },
  {
    name: "Sneha Kulkarni",
    role: "Co-founder, FinGrow Tech",
    content: "As a startup, every rupee counts. SaaS Verify gave us the confidence to invest in SaaS without worrying about broken promises. For the first time, buying software didn't feel risk-free.",
    avatar: "/assets/testimonials/avatar4.svg",
  },
  {
    name: "Alok Verma",
    role: "Founder, TalentBridge HR",
    content: "We wanted an HRMS, but every demo looked the same. SaaS Verify helped us cut through the noise. Their assurance made sure the product we chose had clear SLAs and implementation support. Today, our HR team of 50 users use it daily, and we didn't waste money on the wrong tool.",
    avatar: "/assets/testimonials/avatar3.svg",
  },
];

export function Testimonials() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Loved By Our Customers
          </h2>
          {/* Gradient underline - pink, orange, yellow, light green */}
          <div className="w-48 h-1 mx-auto mb-8 bg-gradient-to-r from-pink-400 via-orange-400 via-yellow-400 to-green-400 rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
              data-aos="fade-up"
              data-aos-delay={120 * index}
            >
              <div className="flex items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-4 flex-shrink-0 overflow-hidden">
                  {testimonial.avatar && testimonial.avatar !== "/placeholder-avatar.jpg" ? (
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-xl">👤</span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

