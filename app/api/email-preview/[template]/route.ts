import { NextResponse } from "next/server";
import { thankYouEmailHtml } from "@/emails/thank-you-email";
import { adminEnquiryEmailHtml } from "@/emails/admin-enquiry-email";

// Dev-only route — remove before deploying to production if desired
const SAMPLE_DATA = {
  id: "preview-001",
  name: "Rahul Sharma",
  email: "rahul@example.com",
  phone: "9876543210",
  people: 3,
  startDate: "2026-06-10",
  endDate: "2026-06-15",
  message: "Looking for a relaxing beach holiday with some adventure activities.",
  packageName: "Premium Goa Escape",
  createdAt: new Date().toISOString(),
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ template: string }> }
) {
  const { template } = await params;

  let html: string;

  if (template === "thank-you") {
    html = thankYouEmailHtml(SAMPLE_DATA);
  } else if (template === "admin") {
    html = adminEnquiryEmailHtml(SAMPLE_DATA);
  } else {
    return NextResponse.json(
      { error: `Unknown template "${template}". Use: thank-you | admin` },
      { status: 404 }
    );
  }

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
