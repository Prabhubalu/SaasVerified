import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { ConditionalNavbar } from "@/components/ui/ConditionalNavbar";

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: {
    default: "SaasVerified - Grow Your Business Faster",
    template: "%s | SaasVerified",
  },
  description: "Transform your business with our innovative solutions. Reach more customers, grow faster, and achieve your goals with SEO-optimized strategies.",
  keywords: ["business growth", "SEO optimization", "digital marketing", "business solutions"],
  authors: [{ name: "SaasVerified" }],
  creator: "SaasVerified",
  publisher: "SaasVerified",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "SaasVerified - Grow Your Business Faster",
    description: "Transform your business with our innovative solutions. Reach more customers, grow faster, and achieve your goals.",
    siteName: "SaasVerified",
  },
  twitter: {
    card: "summary_large_image",
    title: "SaasVerified - Grow Your Business Faster",
    description: "Transform your business with our innovative solutions.",
    creator: "@saasverified",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakartaSans.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "SaasVerified",
              url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
              logo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/logo.png`,
              description: "Transform your business with our innovative solutions.",
              sameAs: [
                "https://twitter.com/saasverified",
                "https://facebook.com/saasverified",
                "https://linkedin.com/company/saasverified",
              ],
            }),
          }}
        />
      </head>
      <body className={plusJakartaSans.className}>
        <Providers>
          <ConditionalNavbar>
            <main className="min-h-screen">{children}</main>
          </ConditionalNavbar>
        </Providers>
      </body>
    </html>
  );
}

