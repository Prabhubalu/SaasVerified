import { buildVtigerLeadPayload, phoneForVtiger, vtigerLookingForValue } from "@/lib/vtiger";

export type ContactVtigerInput = {
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  message: string;
};

export function contactToVtigerFields(data: ContactVtigerInput): Record<string, string> {
  const phoneTrimmed = data.phone?.trim() ?? "";

  return buildVtigerLeadPayload({
    lastname: data.name.trim().replace(/\s+/g, " "),
    email: data.email,
    ...(phoneTrimmed ? { mobile: phoneForVtiger(phoneTrimmed) } : {}),
    cf_leads_howcanwehelp: data.enquiryType,
    description: data.message,
    cf_leads_whatareyoulookingfor: vtigerLookingForValue("Other"),
    cf_leads_websiteformsource: "Contact",
  });
}
