import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormNotification } from "@/lib/email";
import { CONTACT_ENQUIRY_OPTIONS } from "@/lib/contact-enquiry-options";
import {
  captureLeadSquaredLead,
  isLeadSquaredConfigured,
  splitFullName,
  type LeadSquaredAttribute,
} from "@/lib/leadsquared";
import { digitsOnlyPhoneLast10, isValidIndiaPhone } from "@/lib/phone-in";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  enquiryType: z.enum(CONTACT_ENQUIRY_OPTIONS),
  message: z.string().min(10),
});

/** LeadSquared `Source` — must match an allowed picklist value. Default distinguishes contact page vs buyer (`Website`) / vendor (`Vendor Website`). */
function contactLeadSource(): string {
  return process.env.LEADSQUARED_CONTACT_SOURCE?.trim() || "Contact Website";
}

/**
 * Picklist for “How can we help?” / Request in CRM. Must match Lead Fields schema name (e.g. `mx_Enquiry_Type`).
 */
function contactEnquiryTypeAttribute(): string {
  return process.env.LEADSQUARED_CONTACT_ENQUIRY_TYPE_ATTRIBUTE?.trim() || "mx_Enquiry_Type";
}

/**
 * Free-text message (Notes in UI). Must match Lead Fields schema name (often `Notes`; use env if your tenant differs).
 */
function contactMessageAttribute(): string {
  return process.env.LEADSQUARED_CONTACT_MESSAGE_ATTRIBUTE?.trim() || "Notes";
}

function phoneForLeadSquared(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (isValidIndiaPhone(phone)) {
    return digitsOnlyPhoneLast10(phone);
  }
  return digits.slice(0, 20);
}

/**
 * Lead.Capture uses `SearchBy` so existing leads match Phone or Email and are **updated** instead of
 * failing with "A Lead with same Phone Number already exists." See Lead.Capture docs (SearchBy).
 */
function applyContactSearchBy(attrs: LeadSquaredAttribute[]): LeadSquaredAttribute[] {
  if (attrs.some((a) => a.Attribute === "SearchBy")) {
    return attrs;
  }
  const hasPhone = attrs.some((a) => a.Attribute === "Phone");
  if (hasPhone) {
    return [...attrs, { Attribute: "SearchBy", Value: "Phone" }];
  }
  return [...attrs, { Attribute: "SearchBy", Value: "EmailAddress" }];
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const parsed = contactSchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid request. Please check all required fields." },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const phoneTrimmed = data.phone.trim();

    if (phoneTrimmed && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/.test(phoneTrimmed)) {
      return NextResponse.json(
        { error: "Please enter a valid phone number." },
        { status: 400 }
      );
    }

    const leadSource = contactLeadSource();

    type LsqClientResult =
      | { ok: true; leadId?: string }
      | { ok: false; reason: "not_configured" }
      | { ok: false; reason: "capture_failed"; detail: string };

    let lsqClientResult: LsqClientResult = { ok: false, reason: "not_configured" };

    if (isLeadSquaredConfigured()) {
      const { firstName, lastName } = splitFullName(data.name);
      const enquiryAttr = contactEnquiryTypeAttribute();
      const messageAttr = contactMessageAttribute();

      const fullAttributes: LeadSquaredAttribute[] = [
        { Attribute: "FirstName", Value: firstName },
        { Attribute: "LastName", Value: lastName },
        { Attribute: "EmailAddress", Value: data.email },
        ...(phoneTrimmed
          ? [{ Attribute: "Phone", Value: phoneForLeadSquared(phoneTrimmed) }]
          : []),
        { Attribute: enquiryAttr, Value: data.enquiryType },
        { Attribute: messageAttr, Value: data.message },
        { Attribute: "Source", Value: leadSource },
      ];

      /**
       * Contact form always sends full field set when possible.
       * We intentionally do NOT honor `LEADSQUARED_SKIP_CUSTOM_FIELDS` here — that flag is for buyer/vendor
       * testing and would strip Source + all `mx_*`, which is why production looked “empty” for Source / Request / Notes.
       */
      const withoutSource = fullAttributes.filter((a) => a.Attribute !== "Source");
      const withoutEnquiryType = fullAttributes.filter((a) => a.Attribute !== enquiryAttr);
      const withoutEnquiryAndSource = fullAttributes.filter(
        (a) => a.Attribute !== enquiryAttr && a.Attribute !== "Source"
      );
      const minimal: LeadSquaredAttribute[] = [
        { Attribute: "FirstName", Value: firstName },
        { Attribute: "LastName", Value: lastName },
        { Attribute: "EmailAddress", Value: data.email },
        ...(phoneTrimmed
          ? [{ Attribute: "Phone", Value: phoneForLeadSquared(phoneTrimmed) }]
          : []),
      ];

      const attempts: LeadSquaredAttribute[][] = [
        fullAttributes,
        /** If Lead Source picklist rejects `Contact Website`, still capture enquiry + message. */
        withoutSource,
        /** If enquiry picklist value mismatches, still capture Source + message. */
        withoutEnquiryType,
        withoutEnquiryAndSource,
        minimal,
      ];

      const seen = new Set<string>();
      const deduped = attempts.filter((attrs) => {
        const key = JSON.stringify(attrs);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      attempts.length = 0;
      attempts.push(...deduped);

      let lastMessage = "";
      let captureOk = false;
      let capturedLeadId: string | undefined;

      for (let i = 0; i < attempts.length; i++) {
        const lsq = await captureLeadSquaredLead(applyContactSearchBy(attempts[i]));
        lastMessage = lsq.ok ? "" : lsq.message;
        if (lsq.ok) {
          captureOk = true;
          capturedLeadId = lsq.leadId;
          if (i > 0) {
            console.log(`[Contact] LeadSquared capture succeeded on fallback attempt ${i + 1}/${attempts.length}`);
          }
          break;
        }
        console.warn(`[Contact] LeadSquared attempt ${i + 1}/${attempts.length} failed:`, lsq.message);
      }

      if (captureOk) {
        lsqClientResult = { ok: true, leadId: capturedLeadId };
      } else {
        console.error("[Contact] LeadSquared capture failed after all attempts:", lastMessage);
        lsqClientResult = { ok: false, reason: "capture_failed", detail: lastMessage };
      }
    } else {
      console.warn("LeadSquared: skipping capture (LEADSQUARED_HOST / keys not set)");
      lsqClientResult = { ok: false, reason: "not_configured" };
    }

    await sendFormNotification({
      title: "Contact form",
      subject: `Contact: ${data.name}`,
      fields: [
        { label: "Full name", value: data.name },
        { label: "Email", value: data.email },
        { label: "Phone", value: phoneTrimmed || "—" },
        { label: "Enquiry type", value: data.enquiryType },
        { label: "Message", value: data.message },
        { label: "Lead source", value: leadSource },
      ],
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        leadSquared:
          lsqClientResult.ok === true
            ? { ok: true as const, leadId: lsqClientResult.leadId }
            : lsqClientResult.reason === "not_configured"
              ? { ok: false as const, reason: "not_configured" as const }
              : { ok: false as const, reason: "capture_failed" as const },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Failed to submit contact form", error);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
