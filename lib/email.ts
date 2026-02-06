import nodemailer from "nodemailer";

type EmailField = {
  label: string;
  value: string | number | null | undefined | Array<string | number>;
};

type SendFormNotificationInput = {
  title: string;
  subject: string;
  fields: EmailField[];
};

type EmailSendResult = {
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  error?: unknown;
};

const DEFAULT_NOTIFICATION_EMAIL = "dev@saasverify.com";
const DEFAULT_FROM_EMAIL = "SaaS Verify <no-reply@saasverify.com>";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const formatValue = (value: EmailField["value"]) => {
  if (value === null || value === undefined || value === "") {
    return "—";
  }
  if (Array.isArray(value)) {
    const items = value.map((item) => String(item)).filter(Boolean);
    return items.length > 0 ? items.join(", ") : "—";
  }
  return String(value);
};

const formatSubmittedAt = (date: Date) => {
  const timeZone = process.env.SUBMISSION_TIMEZONE || "UTC";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZone,
    timeZoneName: "short",
  };
  let formatted = "";
  try {
    formatted = new Intl.DateTimeFormat("en-US", options).format(date);
  } catch (error) {
    console.warn("Failed to format submitted time, falling back to ISO string.", error);
    formatted = date.toISOString();
  }
  return { formatted, timeZone };
};

const buildEmailTemplate = (title: string, fields: EmailField[]) => {
  const submittedDate = new Date();
  const submittedAtIso = submittedDate.toISOString();
  const { formatted: submittedAtFormatted } = formatSubmittedAt(submittedDate);
  const rows = fields
    .map(({ label, value }) => {
      const safeLabel = escapeHtml(label);
      const safeValue = escapeHtml(formatValue(value));
      return `
        <tr>
          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:13px; color:#6b7280; width:35%; vertical-align:top;">
            ${safeLabel}
          </td>
          <td style="padding:10px 12px; border-bottom:1px solid #e5e7eb; font-size:14px; color:#111827; font-weight:500;">
            ${safeValue}
          </td>
        </tr>
      `;
    })
    .join("");

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0; background-color:#f6f8fb; font-family: 'Helvetica Neue', Arial, sans-serif; color:#111827;">
    <div style="max-width:620px; margin:0 auto; padding:24px;">
      <div style="background:#ffffff; border:1px solid #e5e7eb; border-radius:14px; overflow:hidden; box-shadow:0 10px 25px rgba(15, 23, 42, 0.06);">
        <div style="padding:18px 22px; border-bottom:1px solid #e5e7eb; background:#f9fafb;">
          <p style="margin:0; font-size:12px; letter-spacing:0.04em; text-transform:uppercase; color:#94a3b8;">
            SaaS Verify
          </p>
          <h1 style="margin:6px 0 0; font-size:18px; font-weight:700; color:#0f172a;">
            ${escapeHtml(title)}
          </h1>
          <p style="margin:6px 0 0; font-size:12px; color:#64748b;">
            Submitted at ${escapeHtml(submittedAtFormatted)}
          </p>
        </div>
        <div style="padding:18px 22px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="border-collapse:collapse;">
            ${rows}
          </table>
        </div>
      </div>
      <p style="margin:12px 8px 0; font-size:11px; color:#94a3b8;">
        This notification was generated automatically from the SaaS Verify website.
      </p>
    </div>
  </body>
</html>`;

  const text = [
    `${title}`,
    `Submitted at: ${submittedAtFormatted}`,
    `Submitted at (ISO): ${submittedAtIso}`,
    "",
    ...fields.map(({ label, value }) => `${label}: ${formatValue(value)}`),
  ].join("\n");

  return { html, text };
};

const getTransporter = () => {
  const host = process.env.SMTP_HOST;
  if (!host) {
    return null;
  }

  const port = Number(process.env.SMTP_PORT || "587");
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });
};

export async function sendFormNotification({
  title,
  subject,
  fields,
}: SendFormNotificationInput): Promise<EmailSendResult> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("Email not sent: SMTP_HOST is not configured.");
    return { ok: false, skipped: true, reason: "missing SMTP_HOST" };
  }

  const { html, text } = buildEmailTemplate(title, fields);
  const to = process.env.FORM_NOTIFICATION_EMAIL || DEFAULT_NOTIFICATION_EMAIL;
  const from = process.env.EMAIL_FROM || DEFAULT_FROM_EMAIL;

  try {
    await transporter.sendMail({
      to,
      from,
      subject,
      html,
      text,
    });
    return { ok: true };
  } catch (error) {
    console.error("Failed to send form notification email", error);
    return { ok: false, error };
  }
}
