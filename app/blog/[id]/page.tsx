import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";

const blogPosts: Record<string, {
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
}> = {
  "1": {
    title: "10 SEO Strategies to Boost Your Business in 2024",
    content: `
      Search Engine Optimization (SEO) remains one of the most effective ways to grow your business online. 
      In 2024, the landscape has evolved, and here are 10 proven strategies to help you succeed:
      
      1. Focus on User Experience: Google prioritizes websites that provide excellent user experiences. 
      Ensure your site is fast, mobile-friendly, and easy to navigate.
      
      2. Quality Content is King: Create valuable, informative content that answers your audience's questions. 
      This not only helps with SEO but also establishes your authority.
      
      3. Technical SEO: Ensure your website has proper schema markup, clean URLs, and optimized site structure.
      
      4. Local SEO: If you have a physical location, optimize for local search with Google Business Profile.
      
      5. Link Building: Build quality backlinks from reputable websites in your industry.
      
      6. Mobile Optimization: With mobile-first indexing, your site must be fully optimized for mobile devices.
      
      7. Page Speed: Improve your site's loading speed to reduce bounce rates and improve rankings.
      
      8. Voice Search Optimization: Optimize for voice search queries as more users use voice assistants.
      
      9. E-A-T Signals: Demonstrate Expertise, Authoritativeness, and Trustworthiness in your content.
      
      10. Regular Monitoring: Use analytics tools to track your performance and adjust your strategy accordingly.
      
      Implementing these strategies consistently will help improve your search rankings and drive more organic traffic to your business.
    `,
    date: "March 15, 2024",
    author: "John Doe",
    category: "SEO",
  },
  "2": {
    title: "The Complete Guide to Content Marketing",
    content: `
      Content marketing is a strategic approach focused on creating and distributing valuable, relevant, 
      and consistent content to attract and retain a clearly defined audience.
      
      Key elements of successful content marketing include:
      - Understanding your target audience
      - Creating content that addresses their pain points
      - Distributing content across multiple channels
      - Measuring and optimizing your results
      
      A well-executed content marketing strategy can significantly boost your brand awareness, 
      generate leads, and drive conversions.
    `,
    date: "March 10, 2024",
    author: "Jane Smith",
    category: "Content Marketing",
  },
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = blogPosts[params.id];
  if (!post) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.content.substring(0, 160),
  };
}

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts[params.id];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 w-full py-16">
      <Link
        href="/blog"
        className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
      >
        ← Back to Blog
      </Link>
      <article>
        <div className="mb-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
        <div className="flex items-center text-gray-600 mb-8">
          <span className="mr-4">By {post.author}</span>
          <span>{post.date}</span>
        </div>
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-700 whitespace-pre-line leading-relaxed">{post.content}</p>
        </div>
      </article>
    </div>
  );
}

