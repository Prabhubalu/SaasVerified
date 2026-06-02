/** Contact form enquiry options — values must match CRM picklist options when configured. */
export const CONTACT_ENQUIRY_OPTIONS = [
  "I want to buy software",
  "I want to become a vendor/partner",
  "I need support (existing customer)",
  "General inquiry",
] as const;

export type ContactEnquiryOption = (typeof CONTACT_ENQUIRY_OPTIONS)[number];
