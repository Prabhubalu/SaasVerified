import { NextResponse } from "next/server";
import { z } from "zod";
import { sendFormNotification } from "@/lib/email";
import { CONTACT_ENQUIRY_OPTIONS } from "@/lib/contact-enquiry-options";
import { captureVtigerLead, isVtigerConfigured } from "@/lib/vtiger";
import { contactToVtigerFields } from "@/lib/vtiger-contact";

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().optional().default(""),
  enquiryType: z.enum(CONTACT_ENQUIRY_OPTIONS),
  message: z.string().min(10),
});

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

    type VtigerClientResult =
      | { ok: true }
      | { ok: false; reason: "not_configured" }
      | { ok: false; reason: "capture_failed" };

    let vtigerClientResult: VtigerClientResult = { ok: false, reason: "not_configured" };

    if (isVtigerConfigured()) {
      const vtiger = await captureVtigerLead(
        contactToVtigerFields({
          name: data.name,
          email: data.email,
          phone: phoneTrimmed,
          enquiryType: data.enquiryType,
          message: data.message,
        })
      );

      if (vtiger.ok) {
        vtigerClientResult = { ok: true };
      } else {
        console.error("[Contact] Vtiger capture failed:", vtiger.message);
        vtigerClientResult = { ok: false, reason: "capture_failed" };
      }
    } else {
      console.warn("Vtiger: skipping capture (VTIGER_WEBHOOK_URL / VTIGER_WEBHOOK_TOKEN not set)");
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
        { label: "Form source", value: "Contact" },
      ],
    });

    return NextResponse.json(
      {
        message: "Message sent successfully",
        vtiger:
          vtigerClientResult.ok === true
            ? { ok: true as const }
            : vtigerClientResult.reason === "not_configured"
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
