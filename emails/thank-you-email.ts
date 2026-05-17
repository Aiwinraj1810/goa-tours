// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN TODO: Replace SITE_URL with the live domain once the client sets it up.
//              All image src attributes below depend on this being an absolute URL.
//              Example: "https://realgoacholidays.com"
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "https://realgoacholidays.com"; // TODO: confirm with client

type ThankYouEmailProps = {
  name: string;
  email: string;
  phone: string;
  people: number;
  startDate: string;
  endDate: string;
  message?: string;
  packageName?: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function thankYouEmailHtml(data: ThankYouEmailProps): string {
  const {
    name,
    phone,
    people,
    startDate,
    endDate,
    message,
    packageName,
  } = data;

  const packageRow = packageName
    ? `<tr>
        <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;vertical-align:top;">Package</td>
        <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${packageName}</td>
      </tr>`
    : "";

  const messageRow = message
    ? `<tr>
        <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;vertical-align:top;">Message</td>
        <td style="padding:8px 0;color:#0f172a;font-size:14px;">${message}</td>
      </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Thank you for your enquiry – Real Goa Holidays</title>
  <link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700&display=swap" rel="stylesheet" />
</head>
<body style="margin:0;padding:0;background-color:#f0f9ff;font-family:'Bricolage Grotesque',system-ui,-apple-system,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f9ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(8,122,187,0.10);">

          <!-- ── Hero Banner ── -->
          <tr>
            <td style="padding:0;margin:0;position:relative;">
              <img
                src="https://res.cloudinary.com/dur23cis9/image/upload/v1760680037/hero_x2tcly.jpg"
                alt="Beautiful Goa"
                width="600"
                style="width:100%;max-width:600px;height:220px;object-fit:cover;display:block;"
              />
              <!-- Overlay -->
              <!--<div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom,rgba(8,122,187,0.35) 0%,rgba(8,122,187,0.65) 100%);"></div>-->
            </td>
          </tr>

          <!-- ── Logo + Tagline ── -->
          <tr>
            <td align="center" style="background:#087abb;padding:20px 32px 24px;">
              <img
                src="https://res.cloudinary.com/dur23cis9/image/upload/v1778997401/samples/Goa-tours/logo_qxdtsd.png"
                alt="Real Goa Holidays"
                width="80"
                style="width:80px;height:80px;object-fit:contain;border-radius:50%;background:#fff;padding:4px;display:block;margin:0 auto 10px;"
              />
              <p style="margin:0;color:#ffffff;font-size:22px;font-weight:700;letter-spacing:0.5px;">Real Goa Holidays</p>
              <p style="margin:4px 0 0;color:#bae6fd;font-size:13px;letter-spacing:1px;text-transform:uppercase;">Enquiry confirmation</p>
            </td>
          </tr>

          <!-- ── Greeting ── -->
          <tr>
            <td style="padding:36px 40px 8px;">
              <p style="margin:0 0 8px;color:#087abb;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Enquiry Confirmed</p>
              <h1 style="margin:0 0 16px;color:#0f172a;font-size:26px;font-weight:700;line-height:1.3;">
                Thank you, ${name}!
              </h1>
              <p style="margin:0;color:#334155;font-size:15px;line-height:1.7;">
                We've received your enquiry and our team will get back to you within <strong>24 hours</strong>.
                We can't wait to help you discover the magic of Goa!
              </p>
            </td>
          </tr>

          <!-- ── Divider ── -->
          <tr>
            <td style="padding:24px 40px 0;">
              <hr style="border:none;border-top:1px solid #e2e8f0;margin:0;" />
            </td>
          </tr>

          <!-- ── Enquiry Summary ── -->
          <tr>
            <td style="padding:24px 40px;">
              <p style="margin:0 0 16px;color:#087abb;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">Your Enquiry Summary</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px;padding:4px 20px;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:0;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      ${packageRow}
                      <tr>
                        <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;vertical-align:top;">Travel Dates</td>
                        <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${formatDate(startDate)} → ${formatDate(endDate)}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Number of Guests</td>
                        <td style="padding:8px 0;color:#0f172a;font-size:14px;font-weight:600;">${people} ${people === 1 ? "person" : "people"}</td>
                      </tr>
                      <tr>
                        <td style="padding:8px 0;color:#64748b;font-size:14px;width:140px;">Phone</td>
                        <td style="padding:8px 0;color:#0f172a;font-size:14px;">${phone}</td>
                      </tr>
                      ${messageRow}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── What's Next ── -->
          <tr>
            <td style="padding:0 40px 32px;">
              <p style="margin:0 0 16px;color:#087abb;font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:1.5px;">What Happens Next</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="width:26px;height:26px;background:#087abb;border-radius:50%;text-align:center;line-height:26px;color:#fff;font-size:12px;font-weight:700;">1</div>
                  </td>
                  <td style="padding-left:12px;padding-bottom:14px;">
                    <p style="margin:0;color:#0f172a;font-size:14px;font-weight:600;">Our team reviews your enquiry</p>
                    <p style="margin:4px 0 0;color:#64748b;font-size:13px;">We'll look into the best options matching your preferences.</p>
                  </td>
                </tr>
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="width:26px;height:26px;background:#087abb;border-radius:50%;text-align:center;line-height:26px;color:#fff;font-size:12px;font-weight:700;">2</div>
                  </td>
                  <td style="padding-left:12px;padding-bottom:14px;">
                    <p style="margin:0;color:#0f172a;font-size:14px;font-weight:600;">We contact you within 24 hours</p>
                    <p style="margin:4px 0 0;color:#64748b;font-size:13px;">Expect a call or email with a tailored itinerary just for you.</p>
                  </td>
                </tr>
                <tr>
                  <td width="36" valign="top" style="padding-top:2px;">
                    <div style="width:26px;height:26px;background:#fb923c;border-radius:50%;text-align:center;line-height:26px;color:#fff;font-size:12px;font-weight:700;">3</div>
                  </td>
                  <td style="padding-left:12px;">
                    <p style="margin:0;color:#0f172a;font-size:14px;font-weight:600;">Pack your bags for Goa!</p>
                    <p style="margin:4px 0 0;color:#64748b;font-size:13px;">We'll handle everything so you can focus on the memories.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── CTA ── -->
          <tr>
            <td align="center" style="padding:0 40px 40px;">
              <a
                href="${SITE_URL}/gallery"
                style="display:inline-block;background:#087abb;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;padding:13px 32px;border-radius:50px;letter-spacing:0.3px;"
              >
                Explore the Gallery
              </a>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#0f172a;padding:28px 40px;border-radius:0 0 16px 16px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <p style="margin:0 0 4px;color:#ffffff;font-size:15px;font-weight:700;">Real Goa Holidays</p>
                    <p style="margin:0 0 12px;color:#94a3b8;font-size:12px;line-height:1.6;">
                      Shop No 6, Prazares Resort, Marquis Vaddo,<br/>
                      Candolim, Goa – 403515
                    </p>
                    <!-- TODO: Replace href with live domain once confirmed -->
                    <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.8;">
                      📞 <a href="tel:+917350595303" style="color:#7dd3fc;text-decoration:none;">+91 73505 95303</a><br/>
                      ✉️ <a href="mailto:hello@realgoacholidays.com" style="color:#7dd3fc;text-decoration:none;">hello@realgoacholidays.com</a><br/>
                      🌐 <a href="${SITE_URL}" style="color:#7dd3fc;text-decoration:none;">realgoacholidays.com</a>
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:20px;border-top:1px solid #1e293b;margin-top:20px;">
                    <p style="margin:16px 0 0;color:#475569;font-size:11px;text-align:center;">
                      © ${new Date().getFullYear()} Real Goa Holidays. All rights reserved.<br/>
                      You're receiving this because you submitted an enquiry on our website.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
