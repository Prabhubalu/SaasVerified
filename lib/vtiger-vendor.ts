import { buildVtigerLeadPayload, phoneForVtiger, splitFullName } from "@/lib/vtiger";

export type VendorVtigerInput = {
  contactName: string;
  emailAddress: string;
  phoneNumber: string;
  productName: string;
  websiteUrl: string;
  category: string;
  targetAudience: string;
  pricingModel: string;
};

export function vendorToVtigerFields(data: VendorVtigerInput): Record<string, string> {
  const { firstName, lastName } = splitFullName(data.contactName);

  return buildVtigerLeadPayload({
    firstname: firstName,
    lastname: lastName,
    email: data.emailAddress,
    mobile: phoneForVtiger(data.phoneNumber),
    cf_leads_productname: data.productName,
    website: data.websiteUrl,
    cf_leads_category: data.category,
    cf_leads_targetaudience: data.targetAudience,
    cf_leads_pricingmodel: data.pricingModel,
    cf_leads_websiteformsource: "Vendors",
  });
}
