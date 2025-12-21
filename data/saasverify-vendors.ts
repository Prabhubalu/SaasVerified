/**
 * Complete list of verified SaaS vendors from SaasVerify
 * Source: https://partnerhorsepower.com/saas-company/ (reference source)
 * Last updated: 2024
 * 
 * This file contains all verified vendors and their details
 */

export interface SaasVerifyVendor {
  id: string;
  name: string;
  description: string;
  category: string[];
  website?: string;
  verified: boolean;
}

export const saasverifyVendors: SaasVerifyVendor[] = [
  {
    id: "pipedrive",
    name: "Pipedrive",
    description: "CRM software designed to help sales teams manage their pipeline and close more deals.",
    category: ["CRM Software"],
    verified: true,
  },
  {
    id: "realvnc",
    name: "RealVNC",
    description: "Remote access and control software for secure connections to computers and devices.",
    category: ["Remote Desktop Software", "Remote Support Software"],
    verified: true,
  },
  {
    id: "monday",
    name: "Monday.com",
    description: "Work operating system that powers teams to run projects and workflows with confidence.",
    category: ["Project Management Software", "Workflow Management Software"],
    verified: true,
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "All-in-one marketing, sales, and service platform with CRM capabilities.",
    category: ["Marketing Automation Software", "CRM Software", "Customer Support Software"],
    verified: true,
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Electronic signature and document management platform for secure digital transactions.",
    category: ["Digital Signature Software", "Document Management Software"],
    verified: true,
  },
  {
    id: "asana",
    name: "Asana",
    description: "Work management platform that helps teams orchestrate their work, from daily tasks to strategic initiatives.",
    category: ["Project Management Software", "Task Management Software"],
    verified: true,
  },
  {
    id: "easyprojects",
    name: "EasyProjects",
    description: "Project management and collaboration software for teams.",
    category: ["Project Management Software"],
    verified: true,
  },
  {
    id: "twilio",
    name: "Twilio",
    description: "Cloud communications platform providing APIs for voice, messaging, and video.",
    category: ["Cloud Telephony Solutions", "VoIP Providers", "Communication Software"],
    verified: true,
  },
  {
    id: "wolterskluwer",
    name: "Wolters Kluwer",
    description: "Professional information, software solutions, and services for compliance, legal, and tax professionals.",
    category: ["Legal Compliance Management Software", "Tax Software", "Compliance Software"],
    verified: true,
  },
  {
    id: "activecampaign",
    name: "ActiveCampaign",
    description: "Customer experience automation platform combining email marketing, marketing automation, and CRM.",
    category: ["Marketing Automation Software", "CRM Software", "Email Marketing Software"],
    verified: true,
  },
  {
    id: "survey2connect",
    name: "Survey2Connect",
    description: "Customer experience and feedback management platform for collecting and analyzing customer insights.",
    category: ["Customer Experience Management Software", "Customer Feedback Management Software", "Survey Software"],
    verified: true,
  },
] as const;

/**
 * Get all vendors as an array
 */
export function getAllVendors(): SaasVerifyVendor[] {
  return [...saasverifyVendors];
}

/**
 * Get total count of vendors
 */
export function getVendorCount(): number {
  return saasverifyVendors.length;
}

/**
 * Get vendors by category
 */
export function getVendorsByCategory(category: string): SaasVerifyVendor[] {
  return saasverifyVendors.filter((vendor) =>
    vendor.category.some((cat) =>
      cat.toLowerCase().includes(category.toLowerCase())
    )
  );
}

/**
 * Search vendors by keyword (name, description, or category)
 */
export function searchVendors(keyword: string): SaasVerifyVendor[] {
  const lowerKeyword = keyword.toLowerCase();
  return saasverifyVendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(lowerKeyword) ||
      vendor.description.toLowerCase().includes(lowerKeyword) ||
      vendor.category.some((cat) =>
        cat.toLowerCase().includes(lowerKeyword)
      )
  );
}

/**
 * Get vendor by ID
 */
export function getVendorById(id: string): SaasVerifyVendor | undefined {
  return saasverifyVendors.find((vendor) => vendor.id === id);
}

/**
 * Get vendors by name
 */
export function getVendorByName(name: string): SaasVerifyVendor | undefined {
  return saasverifyVendors.find(
    (vendor) => vendor.name.toLowerCase() === name.toLowerCase()
  );
}

/**
 * Get all unique categories from vendors
 */
export function getAllVendorCategories(): string[] {
  const categories = new Set<string>();
  saasverifyVendors.forEach((vendor) => {
    vendor.category.forEach((cat) => categories.add(cat));
  });
  return Array.from(categories).sort();
}

/**
 * Get vendors grouped by category
 */
export function getVendorsByCategoryGroup(): Record<string, SaasVerifyVendor[]> {
  const grouped: Record<string, SaasVerifyVendor[]> = {};
  
  saasverifyVendors.forEach((vendor) => {
    vendor.category.forEach((cat) => {
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      if (!grouped[cat].find((v) => v.id === vendor.id)) {
        grouped[cat].push(vendor);
      }
    });
  });
  
  return grouped;
}


