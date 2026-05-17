// ─────────────────────────────────────────────────────────────────────────────
// EMAIL SETUP CHECKLIST — complete these once the client confirms their domain:
//
//  1. RESEND_API_KEY
//     - Create account at https://resend.com
//     - Generate an API key and add it to .env.local:
//       RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
//
//  2. FROM ADDRESS
//     - Once the client's domain (realgoacholidays.com) is set up with Resend,
//       update FROM_ADDRESS below to use their verified domain.
//       e.g. "Real Goa Holidays <noreply@realgoacholidays.com>"
//     - Until then, Resend allows sending from onboarding@resend.dev for testing.
//
//  3. ADMIN_EMAIL
//     - Set this to the client's inbox that should receive new enquiry alerts.
//       e.g. "hello@realgoacholidays.com"
//
//  4. DNS records
//     - In Resend dashboard → Domains → Add domain → realgoacholidays.com
//     - Add the provided SPF, DKIM, and DMARC records to the domain's DNS.
//     - Whoever manages the domain (GoDaddy / Cloudflare / etc.) adds these.
// ─────────────────────────────────────────────────────────────────────────────

import { Resend } from "resend";
import { thankYouEmailHtml } from "@/emails/thank-you-email";
import { adminEnquiryEmailHtml } from "@/emails/admin-enquiry-email";

// TODO: Add RESEND_API_KEY to .env.local once obtained from resend.com
const resend = new Resend(process.env.RESEND_API_KEY);

// TODO: Update to verified sender domain once DNS records are configured
const FROM_ADDRESS = "Real Goa Holidays <onboarding@resend.dev>";

// TODO: Update to the client's actual inbox
const ADMIN_EMAIL = "hello@realgoacholidays.com";

type EnquiryEmailPayload = {
  id: string;
  name: string;
  email: string;
  phone: string;
  people: number;
  startDate: string;
  endDate: string;
  message?: string;
  packageName?: string;
  createdAt: string;
};

export async function sendEnquiryEmails(payload: EnquiryEmailPayload) {
  const [thankYou, adminAlert] = await Promise.allSettled([

    // ── Thank you email → sent to the person who submitted the form
    resend.emails.send({
      from: FROM_ADDRESS,
      to: payload.email,
      subject: `We've received your enquiry, ${payload.name.split(" ")[0]}! 🌊`,
      html: thankYouEmailHtml({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        people: payload.people,
        startDate: payload.startDate,
        endDate: payload.endDate,
        message: payload.message,
        packageName: payload.packageName,
      }),
    }),

    // ── Admin notification → sent to the client with full enquiry details
    resend.emails.send({
      from: FROM_ADDRESS,
      to: ADMIN_EMAIL,
      replyTo: payload.email, // Replying opens a reply to the customer directly
      subject: `New Enquiry from ${payload.name} – ${payload.startDate}`,
      html: adminEnquiryEmailHtml({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        people: payload.people,
        startDate: payload.startDate,
        endDate: payload.endDate,
        message: payload.message,
        packageName: payload.packageName,
        enquiryId: payload.id,
        submittedAt: payload.createdAt,
      }),
    }),

  ]);

  if (thankYou.status === "rejected") {
    console.error("[mailer] Failed to send thank-you email:", thankYou.reason);
  }
  if (adminAlert.status === "rejected") {
    console.error("[mailer] Failed to send admin alert:", adminAlert.reason);
  }
}
