import { Metadata } from "next";
import { VendorDetailPage } from "@/components/marketplace/VendorDetailPage";
import { notFound } from "next/navigation";
import { getVendorDetailById } from "@/data/marketplace-products";
import { getVendorDetailById as getCatalogVendorDetailById, catalogData } from "@/data/catalog";

// Extended vendor data with all detail page fields
interface VendorDetail {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  image?: string;
  rating?: number;
  verified: boolean;
  pricing?: string;
  features?: string[];
  // Detail page specific fields
  fullDescription?: string;
  securityScore?: number;
  performanceScore?: number;
  supportScore?: number;
  verificationTier?: "Gold" | "Silver" | "Bronze" | "Platinum";
  verifiedAreas?: string[];
  lastAuditDate?: string;
  detailedFeatures?: Array<{
    title: string;
    description: string;
  }>;
  reviews?: Array<{
    text: string;
    author: string;
    role: string;
    company: string;
  }>;
  bestUseCases?: string[];
  customerTypes?: string[];
  integrations?: Array<{
    name: string;
    logo: string;
  }>;
  alternatives?: Array<{
    id: string;
    name: string;
    logo: string;
    score: number;
  }>;
  website?: string;
}

// Legacy vendor data - kept for fallback (can be removed once all categories have products)
const legacyVendorDatabase: Record<string, VendorDetail> = {
  clickup: {
    id: "clickup",
    name: "ClickUp",
    description: "All-in-one productivity platform",
    category: "Project Management",
    logo: "/assets/marketplace/clickup.png",
    rating: 4.7,
    verified: true,
    pricing: "Free plan available, paid from $7/user/month",
    features: ["Mobile App", "API Access", "Custom Integrations", "Multi-user"],
    fullDescription: "All-in-one productivity platform that combines project management, docs, goals, and time tracking in one unified workspace.",
    securityScore: 4.8,
    performanceScore: 4.9,
    supportScore: 4.6,
    verificationTier: "Gold",
    verifiedAreas: ["Security", "Performance", "Compliance", "Support"],
    lastAuditDate: "June 15, 2024",
    detailedFeatures: [
      {
        title: "Contact Management",
        description: "Comprehensive database for customer information, interaction history, and communication logs.",
      },
      {
        title: "Sales Automation",
        description: "Automate repetitive tasks like email follow-ups, lead scoring, and pipeline management.",
      },
      {
        title: "Advanced Analytics",
        description: "In-depth reporting and dashboards to track sales performance, forecast revenue, and identify trends.",
      },
    ],
    reviews: [
      {
        text: "ClickUp has transformed our sales process. The automation features have saved us countless hours.",
        author: "Jane Doe",
        role: "Head of Sales",
        company: "TechCorp",
      },
      {
        text: "The support team is incredibly responsive and knowledgeable. They guided us through the entire onboarding process.",
        author: "John Smith",
        role: "CEO",
        company: "Solutions Inc.",
      },
    ],
    bestUseCases: ["B2B Sales", "Lead Nurturing", "Pipeline Management"],
    customerTypes: ["SMBs", "Mid-Market", "Enterprise"],
    integrations: [
      { name: "Salesforce", logo: "/assets/marketplace/Salesforce.svg" },
      { name: "Slack", logo: "/assets/marketplace/Discord.svg" },
      { name: "Google", logo: "/assets/marketplace/GoogleHangouts.svg" },
      { name: "Microsoft", logo: "/assets/marketplace/MicrosoftTeams.svg" },
      { name: "Zendesk", logo: "/assets/marketplace/Zendesk.svg" },
      { name: "Trello", logo: "/assets/marketplace/Trello.svg" },
      { name: "Jira", logo: "/assets/marketplace/Jira.svg" },
      { name: "Intercom", logo: "/assets/marketplace/Intercom.svg" },
    ],
    alternatives: [
      {
        id: "monday",
        name: "Monday.com",
        logo: "/assets/marketplace/Monday.com.svg",
        score: 4.7,
      },
      {
        id: "asana",
        name: "Asana",
        logo: "/assets/marketplace/Asana.svg",
        score: 4.5,
      },
    ],
    website: "https://clickup.com",
  },
  monday: {
    id: "monday",
    name: "Monday.com",
    description: "Work operating system",
    category: "Project Management",
    logo: "/assets/marketplace/Monday.com.svg",
    rating: 4.6,
    verified: true,
    pricing: "Starting at $8/user/month",
    features: ["Cloud-based", "Mobile App", "24/7 Support", "White-label"],
    fullDescription: "Work operating system that powers teams to run projects and workflows with confidence. Visual and intuitive project management.",
    securityScore: 4.7,
    performanceScore: 4.8,
    supportScore: 4.7,
    verificationTier: "Gold",
    verifiedAreas: ["Security", "Performance", "Compliance", "Support"],
    lastAuditDate: "May 20, 2024",
    detailedFeatures: [
      {
        title: "Visual Project Management",
        description: "Intuitive boards and timelines to visualize your work and stay on track.",
      },
      {
        title: "Automation & Integrations",
        description: "Automate repetitive work and connect with your favorite tools seamlessly.",
      },
      {
        title: "Team Collaboration",
        description: "Real-time collaboration features to keep your team aligned and productive.",
      },
    ],
    reviews: [
      {
        text: "Monday.com has revolutionized how we manage projects. The visual interface makes everything so clear.",
        author: "Sarah Johnson",
        role: "Project Manager",
        company: "InnovateCo",
      },
    ],
    bestUseCases: ["Project Management", "Team Collaboration", "Workflow Automation"],
    customerTypes: ["SMBs", "Mid-Market", "Enterprise"],
    integrations: [
      { name: "Slack", logo: "/assets/marketplace/Discord.svg" },
      { name: "Salesforce", logo: "/assets/marketplace/Salesforce.svg" },
      { name: "Google", logo: "/assets/marketplace/GoogleHangouts.svg" },
      { name: "Microsoft", logo: "/assets/marketplace/MicrosoftTeams.svg" },
    ],
    alternatives: [
      {
        id: "clickup",
        name: "ClickUp",
        logo: "/assets/marketplace/clickup.png",
        score: 4.7,
      },
      {
        id: "asana",
        name: "Asana",
        logo: "/assets/marketplace/Asana.svg",
        score: 4.5,
      },
    ],
    website: "https://monday.com",
  },
  asana: {
    id: "asana",
    name: "Asana",
    description: "Work management platform",
    category: "Project Management",
    logo: "/assets/marketplace/Asana.svg",
    rating: 4.4,
    verified: true,
    pricing: "Free plan available, paid from $10.99/user/month",
    features: ["Cloud-based", "Mobile App", "Custom Integrations", "Multi-user"],
    fullDescription: "Work management platform that helps teams orchestrate their work, from daily tasks to strategic initiatives.",
    securityScore: 4.6,
    performanceScore: 4.7,
    supportScore: 4.5,
    verificationTier: "Gold",
    verifiedAreas: ["Security", "Performance", "Compliance"],
    lastAuditDate: "April 10, 2024",
    detailedFeatures: [
      {
        title: "Task Management",
        description: "Organize and prioritize tasks with powerful project views and custom fields.",
      },
      {
        title: "Team Coordination",
        description: "Keep everyone aligned with shared goals, timelines, and progress tracking.",
      },
      {
        title: "Reporting & Insights",
        description: "Get real-time insights into team performance and project health.",
      },
    ],
    reviews: [
      {
        text: "Asana helps us stay organized and ensures nothing falls through the cracks.",
        author: "Michael Chen",
        role: "Operations Director",
        company: "Growth Labs",
      },
    ],
    bestUseCases: ["Task Management", "Team Coordination", "Project Planning"],
    customerTypes: ["SMBs", "Mid-Market"],
    integrations: [
      { name: "Slack", logo: "/assets/marketplace/Discord.svg" },
      { name: "Google", logo: "/assets/marketplace/GoogleHangouts.svg" },
      { name: "Trello", logo: "/assets/marketplace/Trello.svg" },
      { name: "Asana", logo: "/assets/marketplace/Asana.svg" },
    ],
    alternatives: [
      {
        id: "clickup",
        name: "ClickUp",
        logo: "/assets/marketplace/clickup.png",
        score: 4.7,
      },
      {
        id: "monday",
        name: "Monday.com",
        logo: "/assets/marketplace/Monday.com.svg",
        score: 4.6,
      },
    ],
    website: "https://asana.com",
  },
  salesforce: {
    id: "salesforce",
    name: "Salesforce",
    description: "World's #1 CRM platform",
    category: "CRM",
    logo: "/assets/marketplace/Salesforce.svg",
    rating: 4.5,
    verified: true,
    pricing: "Starting at $25/user/month",
    features: ["Cloud-based", "Mobile App", "API Access", "24/7 Support"],
    fullDescription: "World's #1 CRM platform. Transform your business with AI-powered sales, service, and marketing solutions.",
    securityScore: 4.9,
    performanceScore: 4.8,
    supportScore: 4.7,
    verificationTier: "Gold",
    verifiedAreas: ["Security", "Performance", "Compliance", "Support"],
    lastAuditDate: "July 1, 2024",
    detailedFeatures: [
      {
        title: "AI-Powered Sales",
        description: "Leverage Einstein AI to predict outcomes, recommend next steps, and automate workflows.",
      },
      {
        title: "Customer Service",
        description: "Deliver exceptional customer experiences with Service Cloud and AI-powered support.",
      },
      {
        title: "Marketing Automation",
        description: "Create personalized customer journeys with Marketing Cloud and Pardot.",
      },
    ],
    reviews: [
      {
        text: "Salesforce has been instrumental in scaling our sales operations. The AI features are game-changing.",
        author: "Emily Rodriguez",
        role: "VP of Sales",
        company: "Enterprise Solutions",
      },
    ],
    bestUseCases: ["Sales Management", "Customer Service", "Marketing Automation"],
    customerTypes: ["Mid-Market", "Enterprise"],
    integrations: [
      { name: "Slack", logo: "/assets/marketplace/Discord.svg" },
      { name: "Salesforce", logo: "/assets/marketplace/Salesforce.svg" },
      { name: "Microsoft", logo: "/assets/marketplace/MicrosoftTeams.svg" },
      { name: "Zendesk", logo: "/assets/marketplace/Zendesk.svg" },
    ],
    alternatives: [
      {
        id: "clickup",
        name: "ClickUp",
        logo: "/assets/marketplace/clickup.png",
        score: 4.6,
      },
    ],
    website: "https://salesforce.com",
  },
};

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Try to get vendor from products data first
  let vendor: VendorDetail | { name: string; description: string; fullDescription?: string } | null =
    getVendorDetailById(params.id);

  // Fallback to catalog data if not found
  if (!vendor) {
    vendor = getCatalogVendorDetailById(params.id) ?? null;
  }

  // Fallback to legacy database if not found
  if (!vendor) {
    vendor = legacyVendorDatabase[params.id] ?? null;
  }

  if (!vendor) {
    return {
      title: "Vendor Not Found | SaaS Verify",
    };
  }

  return {
    title: `${vendor.name} - Verified SaaS Vendor | SaaS Verify`,
    description: vendor.fullDescription || vendor.description,
    openGraph: {
      title: `${vendor.name} - Verified SaaS Vendor`,
      description: vendor.fullDescription || vendor.description,
      type: "website",
    },
  };
}

export default function VendorDetail({ params }: { params: { id: string } }) {
  // Try to get vendor from products data first
  let vendor = getVendorDetailById(params.id);
  
  // Fallback to catalog data if not found
  if (!vendor) {
    const catalogVendor = getCatalogVendorDetailById(params.id);
    if (catalogVendor) {
      // Transform catalog vendor to VendorDetail format
      vendor = {
        id: catalogVendor.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        name: catalogVendor.name,
        description: catalogVendor.description,
        category: Object.keys(catalogData).find(cat => 
          catalogData[cat].some(v => v.name === catalogVendor.name)
        ) || 'Other',
        logo: `/assets/vendor_logos/${catalogVendor.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').charAt(0).toUpperCase() + catalogVendor.name.replace(/\s+/g, '').replace(/[^a-zA-Z0-9]/g, '').slice(1).toLowerCase()}.png`,
        rating: 4.5,
        verified: true,
        pricing: "Contact for pricing",
        features: ["Cloud-based", "API Access"],
        website: catalogVendor.url,
        fullDescription: catalogVendor.description,
        securityScore: 85,
        performanceScore: 90,
        supportScore: 88,
        verificationTier: "Gold" as const,
        verifiedAreas: ["Security", "Performance", "Support"],
        lastAuditDate: "2024-01-15",
        detailedFeatures: [
          {
            title: "Core Functionality",
            description: catalogVendor.description
          }
        ]
      };
    }
  }
  
  // Fallback to legacy database if not found
  if (!vendor) {
    vendor = legacyVendorDatabase[params.id];
  }

  if (!vendor) {
    notFound();
  }

  return <VendorDetailPage vendor={vendor} />;
}

