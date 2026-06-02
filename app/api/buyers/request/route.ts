import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendFormNotification } from "@/lib/email";
import { buyerToVtigerFields } from "@/lib/vtiger-buyer";
import { syncVtigerLead } from "@/lib/vtiger";
import { CITIES_BY_STATE, INDIAN_STATES } from "@/lib/india-locations";
import { isValidIndiaPhone } from "@/lib/phone-in";

const requestSchema = z.object({
  fullName: z.string().min(1),
  email: z.string().email(),
  company: z.string().min(1),
  role: z.string().min(1),
  lookingFor: z.string().optional().nullable(),
  companySize: z.string().optional().nullable(),
  decisionTimeline: z.string().optional().nullable(),
  phoneNumber: z.string().min(1),
  stateName: z.string().min(1),
  cityName: z.string().min(1),
  utmSource: z.string().optional().nullable(),
  utmMedium: z.string().optional().nullable(),
  utmCampaign: z.string().optional().nullable(),
  referrer: z.string().optional().nullable(),
});

function isValidIndiaLocation(stateName: string, cityName: string): boolean {
  if (!INDIAN_STATES.includes(stateName)) return false;
  const cities = CITIES_BY_STATE[stateName];
  return cities?.includes(cityName) ?? false;
}

/** DB `leadSource` for admin export / reporting. */
const BUYER_LEAD_SOURCE = "Website";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = requestSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Please check all required fields." },
        { status: 400 }
      );
    }

    const data = parsed.data;

    if (!isValidIndiaPhone(data.phoneNumber)) {
      return NextResponse.json(
        { error: "Please enter a valid Indian mobile number (10 digits, starting with 6–9)." },
        { status: 400 }
      );
    }

    if (!isValidIndiaLocation(data.stateName, data.cityName)) {
      return NextResponse.json(
        { error: "Please select a valid state and city." },
        { status: 400 }
      );
    }

    const buyerRequest = await prisma.buyerRequest.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        company: data.company,
        role: data.role,
        lookingFor: data.lookingFor || null,
        companySize: data.companySize || null,
        decisionTimeline: data.decisionTimeline || null,
        phoneNumber: data.phoneNumber,
        cityState: null,
        stateName: data.stateName,
        cityName: data.cityName,
        leadSource: BUYER_LEAD_SOURCE,
        utmSource: data.utmSource || null,
        utmMedium: data.utmMedium || null,
        utmCampaign: data.utmCampaign || null,
        referrer: data.referrer || null,
      },
    });

    await sendFormNotification({
      title: "New Buyer Request",
      subject: `Buyer Request: ${data.fullName}`,
      fields: [
        { label: "Request ID", value: buyerRequest.id },
        { label: "Full name", value: data.fullName },
        { label: "Email", value: data.email },
        { label: "Company", value: data.company },
        { label: "Role", value: data.role },
        { label: "Looking for", value: data.lookingFor },
        { label: "Company size", value: data.companySize },
        { label: "Decision timeline", value: data.decisionTimeline },
        { label: "Phone number", value: data.phoneNumber },
        { label: "State", value: data.stateName },
        { label: "City", value: data.cityName },
        { label: "Lead source", value: BUYER_LEAD_SOURCE },
      ],
    });

    await syncVtigerLead(buyerToVtigerFields(data));

    return NextResponse.json(
      { message: "Request submitted successfully", id: buyerRequest.id },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to submit buyer request", error);
    return NextResponse.json(
      { error: "Unable to submit request right now. Please try again." },
      { status: 500 }
    );
  }
}
