import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest articles on business growth, SEO optimization, digital marketing, and more.",
  openGraph: {
    title: "Blog | SaasVerified",
    description: "Latest articles on business growth, SEO, and digital marketing.",
  },
};

const blogPosts = [
  {
    id: 1,
    title: "10 SEO Strategies to Boost Your Business in 2024",
    excerpt: "Discover the latest SEO techniques that can help your business rank higher and attract more customers.",
    date: "March 15, 2024",
    author: "John Doe",
    category: "SEO",
  },
  {
    id: 2,
    title: "The Complete Guide to Content Marketing",
    excerpt: "Learn how to create content that engages your audience and drives conversions.",
    date: "March 10, 2024",
    author: "Jane Smith",
    category: "Content Marketing",
  },
  {
    id: 3,
    title: "How to Measure Your Business Growth",
    excerpt: "Understanding key metrics and KPIs to track your business performance effectively.",
    date: "March 5, 2024",
    author: "Mike Johnson",
    category: "Analytics",
  },
  {
    id: 4,
    title: "Social Media Marketing Best Practices",
    excerpt: "Tips and strategies to maximize your social media presence and engagement.",
    date: "February 28, 2024",
    author: "Sarah Williams",
    category: "Social Media",
  },
  {
    id: 5,
    title: "Mobile Optimization: Why It Matters",
    excerpt: "Learn why mobile optimization is crucial for your business and how to implement it.",
    date: "February 20, 2024",
    author: "David Brown",
    category: "Web Development",
  },
  {
    id: 6,
    title: "Building Trust with Your Online Audience",
    excerpt: "Strategies to establish credibility and build lasting relationships with your customers.",
    date: "February 15, 2024",
    author: "Emily Davis",
    category: "Marketing",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Insights, tips, and strategies to help your business grow
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <article
            key={post.id}
            className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="mb-3">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                <Link href={`/blog/${post.id}`} className="hover:text-blue-600">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{post.author}</span>
                <span>{post.date}</span>
              </div>
              <Link
                href={`/blog/${post.id}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-semibold"
              >
                Read More →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

