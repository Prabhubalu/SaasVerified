import { buildVtigerLeadPayload, phoneForVtiger, splitFullName, vtigerLookingForValue } from "@/lib/vtiger";

export type BuyerVtigerInput = {
  fullName: string;
  email: string;
  company: string;
  role: string;
  lookingFor?: string | null;
  companySize?: string | null;
  decisionTimeline?: string | null;
  phoneNumber: string;
  stateName: string;
  cityName: string;
};

export function buyerToVtigerFields(data: BuyerVtigerInput): Record<string, string> {
  const { firstName, lastName } = splitFullName(data.fullName);

  return buildVtigerLeadPayload({
    firstname: firstName,
    lastname: lastName,
    email: data.email,
    company: data.company,
    designation: data.role,
    mobile: phoneForVtiger(data.phoneNumber),
    state: data.stateName,
    city: data.cityName,
    cf_leads_whatareyoulookingfor: vtigerLookingForValue(data.lookingFor),
    cf_leads_companysize: data.companySize,
    cf_leads_decisiontimeline: data.decisionTimeline,
    cf_leads_websiteformsource: "Buyer",
  });
}
