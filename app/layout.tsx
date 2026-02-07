import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
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
  icons: {
    icon: "/assets/SaaS_ico.png",
    shortcut: "/assets/SaaS_ico.png",
    apple: "/assets/SaaS_ico.png",
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
  other: {
    "scroll-restoration": "manual",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} max-w-full`}>
      <head>
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"} />
      </head>
      <body className={`${plusJakartaSans.className} max-w-full`}>
        <Providers>
          <ConditionalNavbar>
            <main className="min-h-screen max-w-full">{children}</main>
          </ConditionalNavbar>
        </Providers>
        {/* JSON-LD Structured Data */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
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
        {/* Tawk.to Live Chat Script */}
        <Script
          id="tawk-to-chat"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
              (function(){
                var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
                s1.async=true;
                s1.src='https://embed.tawk.to/69844fa6275f611c365dfc8d/1jgmde8nk';
                s1.charset='UTF-8';
                s1.setAttribute('crossorigin','*');
                s0.parentNode.insertBefore(s1,s0);
              })();
            `,
          }}
        />
      </body>
    </html>
  );
}

