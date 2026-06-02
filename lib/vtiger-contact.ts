import { buildVtigerLeadPayload, phoneForVtiger, splitFullName } from "@/lib/vtiger";

export type ContactVtigerInput = {
  name: string;
  email: string;
  phone?: string;
  enquiryType: string;
  message: string;
};

export function contactToVtigerFields(data: ContactVtigerInput): Record<string, string> {
  const { firstName, lastName } = splitFullName(data.name);
  const phoneTrimmed = data.phone?.trim() ?? "";

  return buildVtigerLeadPayload({
    firstname: firstName,
    lastname: lastName,
    email: data.email,
    ...(phoneTrimmed ? { mobile: phoneForVtiger(phoneTrimmed) } : {}),
    cf_leads_howcanwehelp: data.enquiryType,
    description: data.message,
    cf_leads_websiteformsource: "Contact",
  });
}
