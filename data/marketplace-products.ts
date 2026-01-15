/**
 * Marketplace Products Data
 * Contains detailed product information for each category
 * Last updated: 2024
 */

export interface ProductScores {
  security: number;
  performance: number;
  support: number;
}

export interface ProductVerification {
  verified_areas: string[];
  last_audit_date: string;
  tier: "Silver" | "Gold" | "Platinum";
  remarks: string;
}

export interface MarketplaceProduct {
  name: string;
  website: string;
  scores: ProductScores;
  best_use_cases: string[];
  customer_types: string[];
  verification: ProductVerification;
}

export interface CategoryProducts {
  category: string;
  products: MarketplaceProduct[];
}

// Helper function to calculate overall rating from scores
export function calculateRating(scores: ProductScores): number {
  const avg = (scores.security + scores.performance + scores.support) / 3;
  return Math.round(avg * 10) / 10; // Round to 1 decimal place
}

// Logo mapping for products - maps product names to their logo file paths
const productLogoMap: Record<string, string> = {
  // HR Software
  "Keka": "/assets/marketplace/keka.svg",
  "Spine HR": "/assets/marketplace/spine.png",
  "WOCO": "/assets/marketplace/WocoLogo.png",
  "Saral HRMS": "/assets/marketplace/saral-hrms.svg",
  "HRone": "/assets/marketplace/hr-one.webp",
  "PeopleStrong": "/assets/marketplace/peoplestrong_logo.jpeg",
  "greytHR": "/assets/marketplace/greyt.svg",
  "Razorpay Payroll": "/assets/marketplace/razorpay.png",
  "Pocket HRMS": "/assets/marketplace/PocketHRMS.png",
  "Zimyo": "/assets/marketplace/zimyo.jpeg",
  "Farsight HR": "/assets/marketplace/farsightHR.jpeg",
  "ZingHR": "/assets/marketplace/ZingHR.png",
  "Zoho People Plus": "/assets/marketplace/zohoflow.svg",
  "SHRM Pro": "/assets/marketplace/shrmpro.jpeg",
  "Ascent HR": "/assets/marketplace/AscentHR.jpeg",
  "Kredily": "/assets/marketplace/kredily.png",
  
  // CRM Software
  "Salesforce": "/assets/marketplace/Salesforce.svg",
  "Leadhooper": "/assets/marketplace/Leadhooper.webp",
  "Kylas": "/assets/marketplace/kylasCRM.webp",
  "LeadSquared": "/assets/marketplace/LeadSquare.png",
  "Zoho CRM": "/assets/marketplace/ZohoCRM.png",
  "Deskera": "/assets/marketplace/deskera-logo.svg",
  "HubSpot CRM": "/assets/marketplace/HubSpot_Logo.png",
  "TeleCRM": "/assets/marketplace/telecrm.jpeg",
  "Vtiger": "/assets/marketplace/vtiger.png",
  "OneHash": "/assets/marketplace/onehash.svg",
  "Bridge CRM": "/assets/marketplace/bridgeCRM.webp",
  "CRM Doctor": "/assets/marketplace/crm_doctor.jpeg",
  "LeadRat": "/assets/marketplace/leadrat.jpg",
  "LeadMaster": "/assets/marketplace/leadmaster.png",
  "Octopus CRM": "/assets/marketplace/Octopus.jpeg",
  
  // Billing & Accounting Software
  "Swipe Billing": "/assets/marketplace/swipe.png",
  "Vyapar": "/assets/marketplace/Vyapar.jpeg",
  "Sleek Bill": "/assets/marketplace/SleekBill.png",
  "Saral Billing": "/assets/marketplace/SaralBilling.webp",
  "myBillBook": "/assets/marketplace/myBillBook.jpeg",
  "Zoho Invoice": "/assets/marketplace/zoho-invoice.webp",
  "GIDDH": "/assets/marketplace/GIDDH.jpeg",
  "HoneyBill": "/assets/marketplace/honeybill.jpg",
  "Koka Billing": "/assets/marketplace/KokaBilling.jpeg",
  "Zapro": "/assets/marketplace/zapro_logo.jpeg",
  "VIVA Billing": "/assets/marketplace/VIVABilling.webp",
  "NammaBilling": "/assets/marketplace/NammaBilling.png",
  "Bill360": "/assets/marketplace/Bill360Logo.webp",
  "KwikBiz": "/assets/marketplace/KwikBiz.jpeg",
  "Taxilla": "/assets/marketplace/taxilla.webp",
  
  // POS Software
  "VPOS": "/assets/marketplace/VPOS.png",
  "Clonette POS": "/assets/marketplace/ClonettePOS.png",
  "Marg POS": "/assets/marketplace/MargPOS.png",
  "Raho Free": "/assets/marketplace/RahoFree.png",
  "HostBooks": "/assets/marketplace/HostBooks.jpeg",
  "Logic ERP": "/assets/marketplace/logicerp_logo.jpeg",
  "Vasy ERP": "/assets/marketplace/VasyERP.jpg",
  "Zobaze POS": "/assets/marketplace/zobaze_logo.jpeg",
  "Bharat POS": "/assets/marketplace/BharatPOS.png",
  "Microlan POS": "/assets/marketplace/MicrolanPOS.png",
  "Growmore Tech": "/assets/marketplace/growmore_logo.png",
  "Smart Shopkeeper": "/assets/marketplace/SmartShopkeeper.png",
  "Cafe POS": "/assets/marketplace/Mentor-Pos-Logo.png",
  "Ranger POS": "/assets/marketplace/RangerPOS.jpeg",
  "Till POS": "/assets/marketplace/TippPOS.jpeg",
  
  // Email Marketing
  "Mailchimp": "/assets/marketplace/Mailchimp.jpeg",
  "SendGrid": "/assets/marketplace/SendGrid.png",
  
  // Real Estate
  "NoBroker": "/assets/marketplace/Nobroker.jpeg",
  "Housing.com": "/assets/marketplace/Housing.com_Logo.png",
  
  // Design Tools
  "Figma": "/assets/marketplace/Figma.png",
  "Canva": "/assets/marketplace/canva.jpeg",
  
  // Collaboration
  "Slack": "/assets/marketplace/Discord.svg",
  "Microsoft Teams": "/assets/marketplace/MicrosoftTeams.svg",
  
  // Productivity
  "ClickUp": "/assets/marketplace/clickup.png",
  "Asana": "/assets/marketplace/Asana.svg",
  
  // Cloud Storage
  "Google Drive": "/assets/marketplace/GDrive.png",
  "Dropbox": "/assets/marketplace/Dropbox.png",
  
  // Payments
  "Razorpay": "/assets/marketplace/razorpay.png",
  "Stripe": "/assets/marketplace/Stripe.png",
  
  // Transportation
  "Fleetx": "/assets/marketplace/Fleetx.png",
  "LocoNav": "/assets/marketplace/LocoNav.webp",
  
  // Education
  "Teachmint": "/assets/marketplace/Teachmint.jpeg",
  "Classplus": "/assets/marketplace/Classplus.png",
  
  // Cybersecurity
  "Palo Alto Networks": "/assets/marketplace/PaloAltoNetworks.png",
  "Fortinet": "/assets/marketplace/Fortinet.png",
  
  // Development Tools
  "GitHub": "/assets/marketplace/github.webp",
  "Postman": "/assets/marketplace/Postman.png",
  
  // Hospitality
  "Hotelogix": "/assets/marketplace/Hlx-Logo.png",
  "Cloudbeds": "/assets/marketplace/Cloudbeds.png",
  
  // Consulting
  "Accenture": "/assets/marketplace/Accenture-Logo.png",
  "Deloitte": "/assets/marketplace/Deloitte.png",
  
  // Construction
  "Procore": "/assets/marketplace/Procore.png",
  "Buildertrend": "/assets/marketplace/Buildertrend.jpeg",
  
  // LegalTech
  "Vakilsearch": "/assets/marketplace/Vakilsearch.png",
  "DocuSign": "/assets/marketplace/DocuSign.webp",
  
  // Energy
  "Aurora Solar": "/assets/marketplace/Aurora Solar.jpeg",
  "EnergyCAP": "/assets/marketplace/EnergyCAP.png",
  
  // IT Management
  "ManageEngine": "/assets/marketplace/ManageEngine.png",
  "ServiceNow": "/assets/marketplace/ServiceNow.png",
  
  // Banking
  "Finacle": "/assets/marketplace/Finacle_Logo.png",
  "Temenos": "/assets/marketplace/Temenos.png",
  
  // Automotive
  "DealerSocket": "/assets/marketplace/dealersocket.jpg",
  "AutoFluent": "/assets/marketplace/AutoFluent.jpeg",
  
  // Nonprofit
  "Donorbox": "/assets/marketplace/Donorbox.png",
  "Bloomerang": "/assets/marketplace/Bloomerang.png",
  
  // Operations
  "Kissflow": "/assets/marketplace/KissflowLogo.svg",
  "Process Street": "/assets/marketplace/ProcessStreet.png",
  
  // Manufacturing
  "Katana": "/assets/marketplace/Katana.webp",
  "MRPeasy": "/assets/marketplace/MRPeasy.webp",
  
  // Insurance
  "Guidewire": "/assets/marketplace/GWRE.png",
  "Coverfox": "/assets/marketplace/Coverfox.jpeg",
  
  // Media
  "Vimeo": "/assets/marketplace/Vimeo.png",
  "Brightcove": "/assets/marketplace/Brightcove.png",
  
  // Website Builders
  "Wix": "/assets/marketplace/WixLogo.png",
  "Webflow": "/assets/marketplace/Webflow.jpeg",
  
  // CMS Platforms
  "WordPress": "/assets/marketplace/WordPress.png",
  "Contentful": "/assets/marketplace/Contentful.png",
  
  // Data Analytics
  "Tableau": "/assets/marketplace/Tableau.svg",
  "Power BI": "/assets/marketplace/PowerBI.png",
  
  // Conferencing
  "Zoom": "/assets/marketplace/Zoom.avif",
  "Google Meet": "/assets/marketplace/GoogleMeet.png",
  
  // Marketing
  "HubSpot Marketing Hub": "/assets/marketplace/HubSpotMarketingHub.svg",
  "CleverTap": "/assets/marketplace/CleverTap.jpeg",
  
  // Finance
  "QuickBooks": "/assets/marketplace/QuickBooks.jpeg",
  "Xero": "/assets/marketplace/Xero.png",
};

// Helper function to get logo path for a product
function getProductLogo(productName: string): string {
  // Check if we have a specific logo mapping
  if (productLogoMap[productName]) {
    return productLogoMap[productName];
  }
  
  // Fallback: generate logo path from product name
  const id = productName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  // Try .png first, then .svg as fallback
  return `/assets/marketplace/${id}.png`;
}

// Helper function to convert product to vendor format
export function productToVendor(product: MarketplaceProduct, category: string): {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  rating: number;
  verified: boolean;
  pricing?: string;
  features?: string[];
  website?: string;
  scores?: ProductScores;
  best_use_cases?: string[];
  customer_types?: string[];
  verification?: ProductVerification;
} {
  const id = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  // Create a better description from best use cases
  const description = product.best_use_cases.length > 0 
    ? `Ideal for ${product.best_use_cases.join(", ").toLowerCase()}. Best suited for ${product.customer_types.join(" and ")}.`
    : `Comprehensive ${category.toLowerCase()} solution.`;
  const rating = calculateRating(product.scores);
  const verified = product.verification.tier !== "Silver"; // Gold and Platinum are verified

  return {
    id,
    name: product.name,
    description,
    category,
    logo: getProductLogo(product.name),
    rating,
    verified,
    pricing: undefined, // Can be added later
    features: product.best_use_cases,
    website: product.website,
    scores: product.scores,
    best_use_cases: product.best_use_cases,
    customer_types: product.customer_types,
    verification: product.verification,
  };
}

// Category products data
export const categoryProducts: CategoryProducts[] = [
  {
    category: "HR Software",
    products: [
      {
        name: "Keka",
        website: "https://www.keka.com/",
        scores: { security: 4.8, performance: 4.9, support: 4.6 },
        best_use_cases: [
          "Payroll & Statutory Compliance",
          "Attendance & Leave Management",
          "Performance Reviews"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-15",
          tier: "Gold",
          remarks: "Vendor meets all critical standards for enterprise readiness"
        }
      },
      {
        name: "Spine HR",
        website: "https://spinetechnologies.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Enterprise Payroll",
          "Workforce Compliance",
          "HR Operations"
        ],
        customer_types: ["Mid-Market", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-12",
          tier: "Gold",
          remarks: "Enterprise-ready HR platform"
        }
      },
      {
        name: "WOCO",
        website: "https://woco.co.in/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "HR Operations",
          "Attendance Tracking",
          "Payroll Processing"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-10",
          tier: "Silver",
          remarks: "Great fit for small HR teams"
        }
      },
      {
        name: "Saral HRMS",
        website: "https://saral.pro/hr-software/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Payroll Automation",
          "Statutory Compliance",
          "Employee Records"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-11",
          tier: "Gold",
          remarks: "Solid compliance and payroll tool"
        }
      },
      {
        name: "HRone",
        website: "https://hrone.cloud/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Full HR Lifecycle",
          "Payroll & Attendance",
          "Analytics & Reporting"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-14",
          tier: "Gold",
          remarks: "Comprehensive HR suite"
        }
      },
      {
        name: "PeopleStrong",
        website: "https://www.peoplestrong.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Talent & Performance Management",
          "Workforce Analytics",
          "Large Enterprise HR"
        ],
        customer_types: ["Mid-Market", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-18",
          tier: "Platinum",
          remarks: "Enterprise-grade HR platform"
        }
      },
      {
        name: "greytHR",
        website: "https://www.greythr.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Payroll Processing",
          "Attendance & Leave",
          "Compliance Management"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-13",
          tier: "Gold",
          remarks: "Trusted HRMS in India"
        }
      },
      {
        name: "Razorpay Payroll",
        website: "https://razorpay.com/payroll/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Automated Payroll",
          "Salary Disbursements",
          "Compliance Filings"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-12",
          tier: "Gold",
          remarks: "Payroll-first HR platform"
        }
      },
      {
        name: "Pocket HRMS",
        website: "https://www.pockethrms.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Mobile HRMS",
          "Payroll & Attendance",
          "Chatbot HR Assistance"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-10",
          tier: "Gold",
          remarks: "Mobile-first HRMS"
        }
      },
      {
        name: "Zimyo",
        website: "https://www.zimyo.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "HR Automation",
          "Payroll Management",
          "Compliance Ready"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-11",
          tier: "Gold",
          remarks: "Reliable HRMS suite"
        }
      },
      {
        name: "Farsight HR",
        website: "https://farsighttechnologies.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Payroll Services",
          "HR Record Management",
          "Small Business HR"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-09",
          tier: "Silver",
          remarks: "Good payroll & HR tool"
        }
      },
      {
        name: "ZingHR",
        website: "https://www.zinghr.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Workforce Management",
          "Talent & Performance",
          "Global HR Policies"
        ],
        customer_types: ["Mid-Market", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-16",
          tier: "Gold",
          remarks: "Scalable HR platform"
        }
      },
      {
        name: "Zoho People Plus",
        website: "https://www.zoho.com/peopleplus/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "HR Core Processes",
          "Attendance & Leave",
          "Performance Tracking"
        ],
        customer_types: ["Startups", "SMBs", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-14",
          tier: "Gold",
          remarks: "Best-in-class HR Suite"
        }
      },
      {
        name: "SHRM Pro",
        website: "https://www.shrmpro.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Payroll & Compliance",
          "HR Operations",
          "Employee Records"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-09",
          tier: "Gold",
          remarks: "Solid HR compliance tool"
        }
      },
      {
        name: "Ascent HR",
        website: "https://ascent-hr.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Payroll Outsourcing",
          "Compliance",
          "Workforce Admin"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-13",
          tier: "Gold",
          remarks: "Payroll-centric HR solution"
        }
      },
      {
        name: "Kredily",
        website: "https://www.kredily.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Basic HR",
          "Attendance",
          "Employee Directory"
        ],
        customer_types: ["Startups", "Small Teams"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-08",
          tier: "Silver",
          remarks: "Entry-level HRMS"
        }
      }
    ]
  },
  {
    category: "CRM Software",
    products: [
      {
        name: "Salesforce",
        website: "https://www.salesforce.com/in/crm/",
        scores: { security: 5.0, performance: 4.9, support: 4.8 },
        best_use_cases: [
          "Enterprise Sales Automation",
          "Pipeline & Forecasting",
          "Customer Journey Insights"
        ],
        customer_types: ["Mid-Market", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-07-01",
          tier: "Platinum",
          remarks: "Global enterprise CRM standard"
        }
      },
      {
        name: "Leadhooper",
        website: "https://leadhooper.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Lead Capture",
          "Follow-up Automation",
          "Sales Activity Tracking"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-28",
          tier: "Silver",
          remarks: "Focused lead management CRM"
        }
      },
      {
        name: "Kylas",
        website: "https://kylas.io/",
        scores: { security: 4.6, performance: 4.5, support: 4.5 },
        best_use_cases: [
          "Sales Pipeline",
          "Team Collaboration",
          "Lead Tracking"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "Strong CRM for growing teams"
        }
      },
      {
        name: "LeadSquared",
        website: "https://www.leadsquared.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Lead Capture & Nurturing",
          "Marketing & Sales Automation",
          "Reporting & Analytics"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "CRM + Marketing Automation"
        }
      },
      {
        name: "Zoho CRM",
        website: "https://www.zoho.com/en-in/crm/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Lead & Deal Management",
          "Sales Automation",
          "AI Insights & Reporting"
        ],
        customer_types: ["Startups", "SMBs", "Enterprise"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "Flexible & scalable CRM"
        }
      },
      {
        name: "Deskera",
        website: "https://www.deskera.com/in/crm",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "CRM + Accounting Integration",
          "Customer Engagement",
          "Sales Analytics"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Gold",
          remarks: "CRM + Business suite"
        }
      },
      {
        name: "HubSpot CRM",
        website: "https://www.hubspot.com/products/crm",
        scores: { security: 4.7, performance: 4.6, support: 4.7 },
        best_use_cases: [
          "Free CRM on Unlimited Users",
          "Marketing + Sales Alignment",
          "Contact & Deal Management"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "Widely adopted growth CRM"
        }
      },
      {
        name: "TeleCRM",
        website: "https://telecrm.in/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Calling & Conversation Tracking",
          "Lead Follow-ups",
          "Sales Communication"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Support"],
          last_audit_date: "2024-06-26",
          tier: "Silver",
          remarks: "Calling-focused CRM"
        }
      },
      {
        name: "Vtiger",
        website: "https://www.vtiger.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.5 },
        best_use_cases: [
          "CRM + Helpdesk",
          "Sales Automation",
          "Customer Support"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-28",
          tier: "Gold",
          remarks: "Unified CRM & support"
        }
      },
      {
        name: "OneHash",
        website: "https://www.onehash.ai/",
        scores: { security: 4.5, performance: 4.4, support: 4.4 },
        best_use_cases: [
          "No-code CRM",
          "Pipeline & Task Automation",
          "Project Tracking"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Gold",
          remarks: "Customizable no-code CRM"
        }
      },
      {
        name: "Bridge CRM",
        website: "https://www.bridgesuite.ai/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Deal Tracking",
          "Sales Forecasting",
          "Revenue Analytics"
        ],
        customer_types: ["SMBs", "Mid-Market"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-25",
          tier: "Silver",
          remarks: "Sales-centric CRM"
        }
      },
      {
        name: "CRM Doctor",
        website: "https://crm-doctor.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Lead Tracking",
          "Follow-up Alerts",
          "Basic CRM"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-24",
          tier: "Silver",
          remarks: "Simple CRM solution"
        }
      },
      {
        name: "LeadRat",
        website: "https://leadrat.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Lead Capture",
          "Task Reminders",
          "Sales Tracking"
        ],
        customer_types: ["Small Teams", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-23",
          tier: "Silver",
          remarks: "Affordable CRM"
        }
      },
      {
        name: "LeadMaster",
        website: "https://leadmaster.com/leadmaster",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Sales Automation",
          "Campaign Tracking",
          "Lead Nurturing"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-22",
          tier: "Silver",
          remarks: "Sales engagement CRM"
        }
      },
      {
        name: "Octopus CRM",
        website: "https://octopuscrm.io/",
        scores: { security: 4.2, performance: 4.1, support: 4.0 },
        best_use_cases: [
          "LinkedIn Lead Automation",
          "Outreach Sequencing",
          "Contact Engagement"
        ],
        customer_types: ["Small Teams", "SMBs"],
        verification: {
          verified_areas: ["Security", "Support"],
          last_audit_date: "2024-06-20",
          tier: "Silver",
          remarks: "LinkedIn-focused CRM"
        }
      }
    ]
  },
  {
    category: "Billing & Accounting Software",
    products: [
      {
        name: "Swipe Billing",
        website: "https://getswipe.in/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "GST Billing",
          "Invoicing & Payments",
          "Inventory Tracking"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-07-02",
          tier: "Gold",
          remarks: "Simple and powerful billing tool"
        }
      },
      {
        name: "Vyapar",
        website: "https://vyaparapp.in/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "GST Invoicing",
          "Inventory Management",
          "Accounting Reporting"
        ],
        customer_types: ["Retailers", "SMBs", "Traders"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "Reliable billing & accounting solution"
        }
      },
      {
        name: "Sleek Bill",
        website: "https://sleekbill.in/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "GST Billing",
          "Invoice Customization",
          "Business Reporting"
        ],
        customer_types: ["SMBs", "Freelancers"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Silver",
          remarks: "Basic billing platform"
        }
      },
      {
        name: "Saral Billing",
        website: "https://www.saralbill.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "GST Invoicing",
          "Compliance-ready Billing",
          "Inventory Updates"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Gold",
          remarks: "Compliance-centric billing"
        }
      },
      {
        name: "myBillBook",
        website: "https://mybillbook.in/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "GST Billing",
          "Expense Tracking",
          "Reports & Analytics"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "Popular invoicing tool for SMBs"
        }
      },
      {
        name: "Zoho Invoice",
        website: "https://www.zoho.com/in/invoice/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Free Invoicing",
          "Recurring Billing",
          "Expense Management"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-07-01",
          tier: "Gold",
          remarks: "Best free invoicing solution"
        }
      },
      {
        name: "GIDDH",
        website: "https://giddh.com/in",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Cloud Accounting",
          "Billing & Inventory",
          "Bank Reconciliation"
        ],
        customer_types: ["SMBs", "Accountants"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "Cloud billing + accounting"
        }
      },
      {
        name: "HoneyBill",
        website: "https://www.honeybillsoftware.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Retail Billing",
          "Receipt Printing",
          "Payment Modes"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Gold",
          remarks: "Retail-focused billing"
        }
      },
      {
        name: "Koka Billing",
        website: "https://kokatechnology.com/books/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Billing & Payments",
          "GST Invoicing",
          "Inventory Management"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Silver",
          remarks: "All-in-one billing tool"
        }
      },
      {
        name: "Zapro",
        website: "https://zapro.ai/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "AI-assisted Billing",
          "GST Invoicing",
          "Automation"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-07-01",
          tier: "Gold",
          remarks: "AI-enhanced billing"
        }
      },
      {
        name: "VIVA Billing",
        website: "https://viva.org.in/client/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "POS & Billing",
          "GST Invoicing",
          "Financial Reports"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-26",
          tier: "Silver",
          remarks: "Simple retail billing"
        }
      },
      {
        name: "NammaBilling",
        website: "https://www.nammabilling.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Small Business Billing",
          "Invoicing",
          "GST Ready"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-25",
          tier: "Silver",
          remarks: "Entry-level billing"
        }
      },
      {
        name: "Bill360",
        website: "https://www.bill360.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "GST Billing",
          "Inventory Billing",
          "Multi-user Support"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "Feature-rich billing"
        }
      },
      {
        name: "KwikBiz",
        website: "https://www.kwikbilling.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Fast Billing",
          "Simple Invoicing",
          "Expense Tracking"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Silver",
          remarks: "Quick billing for SMBs"
        }
      },
      {
        name: "Taxilla",
        website: "https://www.taxilla.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "e-Invoice & GST Compliance",
          "Automated Filing",
          "Reporting"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "Enterprise NCR e-Invoice suite"
        }
      }
    ]
  },
  {
    category: "POS Software",
    products: [
      {
        name: "VPOS",
        website: "https://v-pos.in/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Retail Billing",
          "Barcode Scanning",
          "Multi-Register Checkout"
        ],
        customer_types: ["Retail Stores", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-07-02",
          tier: "Gold",
          remarks: "Reliable retail POS solution"
        }
      },
      {
        name: "Clonette POS",
        website: "https://www.clonettechnologies.co.in/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "POS + Retail ERP",
          "Inventory Integration",
          "Billing & Reports"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "POS with backend ERP"
        }
      },
      {
        name: "Marg POS",
        website: "https://margcompusoft.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Retail & Pharmacy Billing",
          "Inventory Management",
          "GST Compliant POS"
        ],
        customer_types: ["Retail Chains", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-29",
          tier: "Platinum",
          remarks: "Industry standard retail POS"
        }
      },
      {
        name: "Raho Free",
        website: "https://rahofree.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Free POS Billing",
          "Basic Inventory",
          "GST Billing"
        ],
        customer_types: ["Small Retailers", "Startups"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Silver",
          remarks: "Free entry-level POS"
        }
      },
      {
        name: "HostBooks",
        website: "https://www.hostbooks.com/in/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Billing + Accounting Integration",
          "Multi-Store POS",
          "GST Compliance"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-30",
          tier: "Gold",
          remarks: "POS + Accounting synergy"
        }
      },
      {
        name: "Logic ERP",
        website: "https://www.logicerp.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "POS + Inventory",
          "Supplier & Order Tracking",
          "Retail Analytics"
        ],
        customer_types: ["Retailers", "Distributors"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "Retail + ERP integrated POS"
        }
      },
      {
        name: "Vasy ERP",
        website: "https://vasyerp.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "POS + ERP",
          "Inventory Automation",
          "Billing & Reports"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Gold",
          remarks: "Affordable POS + ERP"
        }
      },
      {
        name: "Zobaze POS",
        website: "https://zobaze.com/pos/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Retail & F&B POS",
          "Table Billing",
          "Inventory Sync"
        ],
        customer_types: ["Restaurants", "Retailers"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "Flexible retail & cafe POS"
        }
      },
      {
        name: "Bharat POS",
        website: "https://bharat-erp.com/",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Retail Billing",
          "Inventory Tracking",
          "GST Invoicing"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Silver",
          remarks: "Basic POS for SMBs"
        }
      },
      {
        name: "Microlan POS",
        website: "https://microlan.in/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Retail Billing",
          "Barcode Support",
          "Inventory Management"
        ],
        customer_types: ["Retail Stores", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Gold",
          remarks: "Reliable retail POS"
        }
      },
      {
        name: "Growmore Tech",
        website: "https://growmoretech.in/smart-billing/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Smart Billing",
          "Barcode & Reports",
          "GST Ready"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-27",
          tier: "Gold",
          remarks: "Smart billing POS"
        }
      },
      {
        name: "Smart Shopkeeper",
        website: "https://smartsoftwareindia.com/index.html",
        scores: { security: 4.3, performance: 4.2, support: 4.1 },
        best_use_cases: [
          "Shop Billing",
          "Inventory Control",
          "GST Invoicing"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-26",
          tier: "Silver",
          remarks: "Shopkeeper-centric POS"
        }
      },
      {
        name: "Cafe POS",
        website: "https://www.mentorpos.com/products/cafe-pos/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Cafe & QSR Billing",
          "Table Orders",
          "Kitchen Printing"
        ],
        customer_types: ["Cafes", "Restaurants"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-29",
          tier: "Gold",
          remarks: "F&B focused POS"
        }
      },
      {
        name: "Ranger POS",
        website: "https://rangerpos.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Retail Billing",
          "Inventory & GST",
          "Barcode & Scanning"
        ],
        customer_types: ["Retailers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-28",
          tier: "Gold",
          remarks: "Complete retail POS"
        }
      },
      {
        name: "Till POS",
        website: "http://www.tillpos.xyz/",
        scores: { security: 4.2, performance: 4.1, support: 4.0 },
        best_use_cases: [
          "Simple Billing",
          "Quick Checkout",
          "Small Retail"
        ],
        customer_types: ["Small Retailers", "Startups"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-25",
          tier: "Silver",
          remarks: "Simplified POS tool"
        }
      }
    ]
  },
  {
    category: "Email Marketing",
    products: [
      {
        name: "Mailchimp",
        website: "https://mailchimp.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Email Campaigns",
          "Audience Segmentation",
          "Marketing Automation"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Industry-leading email platform"
        }
      },
      {
        name: "SendGrid",
        website: "https://sendgrid.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Transactional Emails",
          "Email APIs",
          "Delivery Optimization"
        ],
        customer_types: ["Developers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Developer-friendly email service"
        }
      }
    ]
  },
  {
    category: "Real Estate",
    products: [
      {
        name: "NoBroker",
        website: "https://www.nobroker.in/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Property Listings",
          "Rental Management",
          "Owner-Tenant Communication"
        ],
        customer_types: ["Individuals", "Property Owners"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Trusted real estate platform"
        }
      },
      {
        name: "Housing.com",
        website: "https://housing.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Property Search",
          "Market Insights",
          "Lead Generation"
        ],
        customer_types: ["Home Buyers", "Real Estate Agents"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Large scale real estate portal"
        }
      }
    ]
  },
  {
    category: "Design Tools",
    products: [
      {
        name: "Figma",
        website: "https://www.figma.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "UI/UX Design",
          "Collaboration",
          "Prototyping"
        ],
        customer_types: ["Design Teams", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-23",
          tier: "Platinum",
          remarks: "Design collaboration leader"
        }
      },
      {
        name: "Canva",
        website: "https://www.canva.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Graphic Design",
          "Marketing Assets",
          "Quick Templates"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-22",
          tier: "Gold",
          remarks: "Easy design platform"
        }
      }
    ]
  },
  {
    category: "Collaboration",
    products: [
      {
        name: "Slack",
        website: "https://slack.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Team Messaging",
          "Internal Collaboration",
          "App Integrations"
        ],
        customer_types: ["Startups", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Enterprise collaboration platform"
        }
      },
      {
        name: "Microsoft Teams",
        website: "https://www.microsoft.com/microsoft-teams/",
        scores: { security: 4.9, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Team Communication",
          "Meetings & Calls",
          "Office 365 Integration"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Enterprise communication suite"
        }
      }
    ]
  },
  {
    category: "Productivity",
    products: [
      {
        name: "ClickUp",
        website: "https://clickup.com/",
        scores: { security: 4.6, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Task Management",
          "Team Productivity",
          "Workflow Automation"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "All-in-one productivity tool"
        }
      },
      {
        name: "Asana",
        website: "https://asana.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Project Tracking",
          "Task Collaboration",
          "Goal Management"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Structured productivity platform"
        }
      }
    ]
  },
  {
    category: "Cloud Storage",
    products: [
      {
        name: "Google Drive",
        website: "https://www.google.com/drive/",
        scores: { security: 4.9, performance: 4.8, support: 4.6 },
        best_use_cases: [
          "File Storage",
          "Document Collaboration",
          "Cloud Backup"
        ],
        customer_types: ["Individuals", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-18",
          tier: "Platinum",
          remarks: "Global cloud storage leader"
        }
      },
      {
        name: "Dropbox",
        website: "https://www.dropbox.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "File Sharing",
          "Cloud Backup",
          "Team Collaboration"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-17",
          tier: "Gold",
          remarks: "Reliable cloud storage"
        }
      }
    ]
  },
  {
    category: "Payments",
    products: [
      {
        name: "Razorpay",
        website: "https://razorpay.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Online Payments",
          "Subscription Billing",
          "Payment Gateway"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Leading Indian payment gateway"
        }
      },
      {
        name: "Stripe",
        website: "https://stripe.com/",
        scores: { security: 5.0, performance: 4.9, support: 4.7 },
        best_use_cases: [
          "Global Payments",
          "APIs for Developers",
          "Subscription Billing"
        ],
        customer_types: ["Startups", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Global payments infrastructure"
        }
      }
    ]
  },
  {
    category: "Transportation",
    products: [
      {
        name: "Fleetx",
        website: "https://fleetx.io/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Fleet Tracking",
          "Logistics Analytics",
          "Fuel Monitoring"
        ],
        customer_types: ["Logistics Companies", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-16",
          tier: "Gold",
          remarks: "Fleet intelligence platform"
        }
      },
      {
        name: "LocoNav",
        website: "https://loconav.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Vehicle Tracking",
          "Fleet Operations",
          "Driver Management"
        ],
        customer_types: ["Fleet Owners", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-15",
          tier: "Gold",
          remarks: "Fleet management software"
        }
      }
    ]
  },
  {
    category: "Education",
    products: [
      {
        name: "Teachmint",
        website: "https://teachmint.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Online Classes",
          "Student Management",
          "Digital Assessments"
        ],
        customer_types: ["Schools", "Coaching Institutes"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "EdTech platform"
        }
      },
      {
        name: "Classplus",
        website: "https://classplusapp.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Course Selling",
          "Student Engagement",
          "Mobile Learning"
        ],
        customer_types: ["Educators", "Institutes"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-17",
          tier: "Gold",
          remarks: "Coaching management platform"
        }
      }
    ]
  },
  {
    category: "Cybersecurity",
    products: [
      {
        name: "Palo Alto Networks",
        website: "https://www.paloaltonetworks.com/",
        scores: { security: 5.0, performance: 4.9, support: 4.8 },
        best_use_cases: [
          "Network Security",
          "Threat Detection",
          "Enterprise Firewalls"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-23",
          tier: "Platinum",
          remarks: "Cybersecurity leader"
        }
      },
      {
        name: "Fortinet",
        website: "https://www.fortinet.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Firewall Security",
          "Network Protection",
          "Threat Intelligence"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Network security platform"
        }
      }
    ]
  },
  {
    category: "Development Tools",
    products: [
      {
        name: "GitHub",
        website: "https://github.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Code Hosting",
          "Version Control",
          "Developer Collaboration"
        ],
        customer_types: ["Developers", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-21",
          tier: "Platinum",
          remarks: "Developer ecosystem leader"
        }
      },
      {
        name: "Postman",
        website: "https://www.postman.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "API Testing",
          "Development Collaboration",
          "Automation"
        ],
        customer_types: ["Developers", "Tech Teams"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "API development platform"
        }
      }
    ]
  },
  {
    category: "Hospitality",
    products: [
      {
        name: "Hotelogix",
        website: "https://www.hotelogix.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Hotel PMS",
          "Booking Management",
          "Guest Experience"
        ],
        customer_types: ["Hotels", "Resorts"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Hospitality management system"
        }
      },
      {
        name: "Cloudbeds",
        website: "https://www.cloudbeds.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Hotel Management",
          "Channel Management",
          "Reservations"
        ],
        customer_types: ["Hotels", "Hostels"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Global hospitality platform"
        }
      }
    ]
  },
  {
    category: "Consulting",
    products: [
      {
        name: "Accenture",
        website: "https://www.accenture.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Digital Transformation",
          "Business Consulting",
          "Technology Advisory"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-24",
          tier: "Platinum",
          remarks: "Global consulting leader"
        }
      },
      {
        name: "Deloitte",
        website: "https://www2.deloitte.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Audit & Advisory",
          "Risk Consulting",
          "Enterprise Strategy"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-23",
          tier: "Platinum",
          remarks: "Enterprise consulting firm"
        }
      }
    ]
  },
  {
    category: "Construction",
    products: [
      {
        name: "Procore",
        website: "https://www.procore.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Construction Management",
          "Project Collaboration",
          "Site Reporting"
        ],
        customer_types: ["Construction Firms", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Gold",
          remarks: "Construction management platform"
        }
      },
      {
        name: "Buildertrend",
        website: "https://www.buildertrend.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Residential Construction",
          "Scheduling",
          "Cost Tracking"
        ],
        customer_types: ["Builders", "Contractors"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Builder-focused software"
        }
      }
    ]
  },
  {
    category: "LegalTech",
    products: [
      {
        name: "Vakilsearch",
        website: "https://vakilsearch.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Company Registration",
          "Legal Compliance",
          "Documentation"
        ],
        customer_types: ["Startups", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Legal services platform"
        }
      },
      {
        name: "DocuSign",
        website: "https://www.docusign.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Digital Signatures",
          "Contract Management",
          "Legal Workflows"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Digital agreement leader"
        }
      }
    ]
  },
  {
    category: "Energy",
    products: [
      {
        name: "Aurora Solar",
        website: "https://aurorasolar.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Solar Design",
          "Energy Modeling",
          "Proposal Generation"
        ],
        customer_types: ["Energy Companies", "Installers"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Solar software platform"
        }
      },
      {
        name: "EnergyCAP",
        website: "https://www.energycap.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Energy Cost Management",
          "Utility Billing",
          "Sustainability Reporting"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Energy intelligence tool"
        }
      }
    ]
  },
  {
    category: "IT Management",
    products: [
      {
        name: "ManageEngine",
        website: "https://www.manageengine.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "IT Service Management",
          "Endpoint Monitoring",
          "Network Management"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "IT operations suite"
        }
      },
      {
        name: "ServiceNow",
        website: "https://www.servicenow.com/",
        scores: { security: 5.0, performance: 4.9, support: 4.8 },
        best_use_cases: [
          "ITSM",
          "Workflow Automation",
          "Enterprise Operations"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance", "Support"],
          last_audit_date: "2024-06-23",
          tier: "Platinum",
          remarks: "Enterprise IT platform"
        }
      }
    ]
  },
  {
    category: "Banking",
    products: [
      {
        name: "Finacle",
        website: "https://www.edgeverve.com/finacle/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Core Banking",
          "Digital Banking",
          "Customer Experience"
        ],
        customer_types: ["Banks", "Financial Institutions"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Core banking solution"
        }
      },
      {
        name: "Temenos",
        website: "https://www.temenos.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Banking Software",
          "Digital Transformation",
          "Financial APIs"
        ],
        customer_types: ["Banks", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-21",
          tier: "Platinum",
          remarks: "Banking technology leader"
        }
      }
    ]
  },
  {
    category: "Automotive",
    products: [
      {
        name: "DealerSocket",
        website: "https://dealersocket.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Dealer CRM",
          "Automotive Sales",
          "Service Management"
        ],
        customer_types: ["Dealerships"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Automotive CRM"
        }
      },
      {
        name: "AutoFluent",
        website: "https://www.autofluent.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Auto Repair Management",
          "Billing & Scheduling",
          "Inventory Tracking"
        ],
        customer_types: ["Workshops", "Garages"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Auto repair software"
        }
      }
    ]
  },
  {
    category: "Nonprofit",
    products: [
      {
        name: "Donorbox",
        website: "https://donorbox.org/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Fundraising",
          "Donor Management",
          "Online Donations"
        ],
        customer_types: ["Nonprofits"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Nonprofit fundraising tool"
        }
      },
      {
        name: "Bloomerang",
        website: "https://bloomerang.co/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Donor Engagement",
          "CRM for Nonprofits",
          "Reporting"
        ],
        customer_types: ["NGOs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-17",
          tier: "Gold",
          remarks: "Nonprofit CRM"
        }
      }
    ]
  },
  {
    category: "Operations",
    products: [
      {
        name: "Kissflow",
        website: "https://kissflow.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Workflow Automation",
          "Operations Management",
          "Process Digitization"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Operations automation platform"
        }
      },
      {
        name: "Process Street",
        website: "https://www.process.st/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Process Documentation",
          "Task Automation",
          "SOP Management"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Process management tool"
        }
      }
    ]
  },
  {
    category: "Manufacturing",
    products: [
      {
        name: "Katana",
        website: "https://katanamrp.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Manufacturing Planning",
          "Inventory Control",
          "Order Management"
        ],
        customer_types: ["Manufacturers", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Smart manufacturing ERP"
        }
      },
      {
        name: "MRPeasy",
        website: "https://www.mrpeasy.com/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Production Planning",
          "Inventory Management",
          "Manufacturing Reports"
        ],
        customer_types: ["Small Manufacturers"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-17",
          tier: "Gold",
          remarks: "Manufacturing planning tool"
        }
      }
    ]
  },
  {
    category: "Insurance",
    products: [
      {
        name: "Guidewire",
        website: "https://www.guidewire.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Policy Management",
          "Claims Processing",
          "Insurance Core Systems"
        ],
        customer_types: ["Insurance Companies"],
        verification: {
          verified_areas: ["Security", "Performance", "Compliance"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "Insurance software leader"
        }
      },
      {
        name: "Coverfox",
        website: "https://www.coverfox.com/",
        scores: { security: 4.4, performance: 4.3, support: 4.2 },
        best_use_cases: [
          "Insurance Comparison",
          "Policy Purchase",
          "Renewals"
        ],
        customer_types: ["Individuals", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Digital insurance platform"
        }
      }
    ]
  },
  {
    category: "Media",
    products: [
      {
        name: "Vimeo",
        website: "https://vimeo.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Video Hosting",
          "Streaming",
          "Content Management"
        ],
        customer_types: ["Creators", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Professional video platform"
        }
      },
      {
        name: "Brightcove",
        website: "https://www.brightcove.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Enterprise Video",
          "Media Streaming",
          "Analytics"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Platinum",
          remarks: "Enterprise media platform"
        }
      }
    ]
  },
  {
    category: "Website Builders",
    products: [
      {
        name: "Wix",
        website: "https://www.wix.com/",
        scores: { security: 4.6, performance: 4.5, support: 4.4 },
        best_use_cases: [
          "Website Creation",
          "Small Business Sites",
          "Online Presence"
        ],
        customer_types: ["Individuals", "SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Easy website builder"
        }
      },
      {
        name: "Webflow",
        website: "https://webflow.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "No-code Websites",
          "Design Systems",
          "CMS Websites"
        ],
        customer_types: ["Designers", "Agencies"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-19",
          tier: "Gold",
          remarks: "Advanced website builder"
        }
      }
    ]
  },
  {
    category: "CMS Platforms",
    products: [
      {
        name: "WordPress",
        website: "https://wordpress.org/",
        scores: { security: 4.5, performance: 4.4, support: 4.3 },
        best_use_cases: [
          "Content Publishing",
          "Blogs & Websites",
          "Plugin Ecosystem"
        ],
        customer_types: ["Individuals", "Businesses"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-17",
          tier: "Gold",
          remarks: "Most used CMS"
        }
      },
      {
        name: "Contentful",
        website: "https://www.contentful.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Headless CMS",
          "Omnichannel Content",
          "APIs"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-18",
          tier: "Gold",
          remarks: "Headless CMS platform"
        }
      }
    ]
  },
  {
    category: "Data Analytics",
    products: [
      {
        name: "Tableau",
        website: "https://www.tableau.com/",
        scores: { security: 4.9, performance: 4.8, support: 4.7 },
        best_use_cases: [
          "Data Visualization",
          "Business Intelligence",
          "Reporting"
        ],
        customer_types: ["Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Platinum",
          remarks: "BI leader"
        }
      },
      {
        name: "Power BI",
        website: "https://powerbi.microsoft.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Dashboards",
          "Analytics",
          "Data Modeling"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Microsoft BI tool"
        }
      }
    ]
  },
  {
    category: "Conferencing",
    products: [
      {
        name: "Zoom",
        website: "https://zoom.us/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Video Meetings",
          "Webinars",
          "Remote Collaboration"
        ],
        customer_types: ["Individuals", "Businesses"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Video conferencing leader"
        }
      },
      {
        name: "Google Meet",
        website: "https://meet.google.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Video Conferencing",
          "Team Meetings",
          "Calendar Integration"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Google conferencing platform"
        }
      }
    ]
  },
  {
    category: "Marketing",
    products: [
      {
        name: "HubSpot Marketing Hub",
        website: "https://www.hubspot.com/products/marketing",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Inbound Marketing",
          "Campaign Automation",
          "Lead Nurturing"
        ],
        customer_types: ["SMBs", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance", "Support"],
          last_audit_date: "2024-06-22",
          tier: "Gold",
          remarks: "Marketing automation platform"
        }
      },
      {
        name: "CleverTap",
        website: "https://clevertap.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Customer Engagement",
          "Retention Analytics",
          "Campaign Personalization"
        ],
        customer_types: ["Startups", "Enterprises"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Engagement analytics platform"
        }
      }
    ]
  },
  {
    category: "Finance",
    products: [
      {
        name: "QuickBooks",
        website: "https://quickbooks.intuit.com/",
        scores: { security: 4.7, performance: 4.6, support: 4.5 },
        best_use_cases: [
          "Accounting",
          "Expense Management",
          "Financial Reporting"
        ],
        customer_types: ["SMBs"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-20",
          tier: "Gold",
          remarks: "Finance management software"
        }
      },
      {
        name: "Xero",
        website: "https://www.xero.com/",
        scores: { security: 4.8, performance: 4.7, support: 4.6 },
        best_use_cases: [
          "Cloud Accounting",
          "Financial Management",
          "Tax Reporting"
        ],
        customer_types: ["SMBs", "Accountants"],
        verification: {
          verified_areas: ["Security", "Performance"],
          last_audit_date: "2024-06-21",
          tier: "Gold",
          remarks: "Cloud finance platform"
        }
      }
    ]
  }
];

// Helper functions to get products
export function getProductsByCategory(category: string): MarketplaceProduct[] {
  const categoryData = categoryProducts.find(cp => cp.category === category);
  return categoryData?.products || [];
}

export function getAllProducts(): MarketplaceProduct[] {
  return categoryProducts.flatMap(cp => cp.products);
}

export function getVendorsByCategory(category: string) {
  const products = getProductsByCategory(category);
  return products.map(product => productToVendor(product, category));
}

export function getAllVendors() {
  return categoryProducts.flatMap(cp => 
    cp.products.map(product => productToVendor(product, cp.category))
  );
}

// Helper function to convert product to vendor detail format (for detail page)
export function productToVendorDetail(product: MarketplaceProduct, category: string): {
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
} {
  const id = product.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const description = product.best_use_cases.length > 0 
    ? `Ideal for ${product.best_use_cases.join(", ").toLowerCase()}. Best suited for ${product.customer_types.join(" and ")}.`
    : `Comprehensive ${category.toLowerCase()} solution.`;
  const rating = calculateRating(product.scores);
  const verified = product.verification.tier !== "Silver";
  
  // Use the tier as-is (now supports Platinum)
  const verificationTier: "Gold" | "Silver" | "Bronze" | "Platinum" = product.verification.tier;

  // Format audit date
  const auditDate = new Date(product.verification.last_audit_date);
  const lastAuditDate = auditDate.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  // Create detailed features from best use cases
  const detailedFeatures = product.best_use_cases.map(useCase => ({
    title: useCase,
    description: `Comprehensive solution for ${useCase.toLowerCase()}.`,
  }));

  // Get alternatives from the same category
  const categoryData = categoryProducts.find(cp => cp.category === category);
  const alternatives = categoryData?.products
    .filter(p => p.name !== product.name)
    .slice(0, 3)
    .map(p => ({
      id: p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      name: p.name,
      logo: getProductLogo(p.name),
      score: calculateRating(p.scores),
    })) || [];

  return {
    id,
    name: product.name,
    description,
    category,
    logo: getProductLogo(product.name),
    rating,
    verified,
    pricing: undefined,
    features: product.best_use_cases,
    fullDescription: `${description} ${product.verification.remarks}`,
    securityScore: product.scores.security,
    performanceScore: product.scores.performance,
    supportScore: product.scores.support,
    verificationTier: verificationTier,
    verifiedAreas: product.verification.verified_areas,
    lastAuditDate,
    detailedFeatures,
    reviews: [], // Can be added later
    bestUseCases: product.best_use_cases,
    customerTypes: product.customer_types,
    integrations: [], // Can be added later
    alternatives,
    website: product.website,
  };
}

// Get vendor detail by ID
export function getVendorDetailById(id: string) {
  for (const categoryData of categoryProducts) {
    const product = categoryData.products.find(
      p => p.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') === id
    );
    if (product) {
      return productToVendorDetail(product, categoryData.category);
    }
  }
  return null;
}
