import Link from "next/link";

export function CTA() {
  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Ready to Grow Your Business?
        </h2>
        <p className="text-xl mb-8 text-blue-100">
          Join thousands of successful businesses that trust us to help them reach their goals.
        </p>
        <Link
          href="/contact"
          className="inline-block bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
        >
          Get Started Today
        </Link>
      </div>
    </section>
  );
}

