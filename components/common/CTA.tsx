import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white" data-aos="fade-up">
      <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-aos="fade-up">
          Ready to Grow Your Business?
        </h2>
        <p className="text-xl mb-8 text-blue-100" data-aos="fade-up" data-aos-delay="100">
          Join thousands of successful businesses that trust us to help them reach their goals.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          data-aos="zoom-in"
          data-aos-delay="200"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}

