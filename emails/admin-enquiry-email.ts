// ─────────────────────────────────────────────────────────────────────────────
// DOMAIN TODO: Replace SITE_URL with the live domain once the client sets it up.
// ─────────────────────────────────────────────────────────────────────────────
const SITE_URL = "https://realgoacholidays.com"; // TODO: confirm with client

type AdminEnquiryEmailProps = {
  name: string;
  email: string;
  phone: string;
  people: number;
  startDate: string;
  endDate: string;
  message?: string;
  packageName?: string;
  enquiryId: string;
  submittedAt: string;
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function formatDateTime(isoStr: string) {
  return new Date(isoStr).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}

export function adminEnquiryEmailHtml(data: AdminEnquiryEmailProps): string {
  const {
    name,
    email,
    phone,
    people,
    startDate,
    endDate,
    message,
    packageName,
    enquiryId,
    submittedAt,
  } = data;

  const packageRow = packageName
    ? `<tr>
        <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;font-weight:600;">Package</td>
        <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;">${packageName}</td>
      </tr>`
    : `<tr>
        <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;font-weight:600;">Package</td>
        <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#94a3b8;font-size:13px;font-style:italic;">Not specified</td>
      </tr>`;

  const messageRow = message
    ? `<tr>
        <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;font-weight:600;vertical-align:top;">Message</td>
        <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;line-height:1.6;">${message}</td>
      </tr>`
    : `<tr>
        <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;font-weight:600;">Message</td>
        <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#94a3b8;font-size:13px;font-style:italic;">No message provided</td>
      </tr>`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Enquiry – Real Goa Holidays</title>
</head>
<body style="margin:0;padding:0;background-color:#f0f9ff;font-family:Georgia,serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f9ff;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(8,122,187,0.10);">

          <!-- ── Header ── -->
          <tr>
            <td style="background:#087abb;padding:24px 32px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <img
                      src="${SITE_URL}/images/logo.png"
                      alt="Real Goa Holidays"
                      width="52"
                      style="width:52px;height:52px;object-fit:contain;border-radius:50%;background:#fff;padding:3px;display:block;"
                    />
                  </td>
                  <td style="padding-left:16px;">
                    <p style="margin:0;color:#ffffff;font-size:18px;font-weight:700;">Real Goa Holidays</p>
                    <p style="margin:2px 0 0;color:#bae6fd;font-size:12px;">Admin Notification</p>
                  </td>
                  <td align="right">
                    <div style="background:#fb923c;color:#ffffff;font-size:11px;font-weight:700;padding:4px 12px;border-radius:50px;text-transform:uppercase;letter-spacing:1px;display:inline-block;">
                      New Enquiry
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Alert Banner ── -->
          <tr>
            <td style="background:#fef3c7;padding:14px 32px;border-bottom:1px solid #fde68a;">
              <p style="margin:0;color:#92400e;font-size:14px;">
                🔔 <strong>${name}</strong> submitted an enquiry on <strong>${formatDateTime(submittedAt)} IST</strong>
              </p>
            </td>
          </tr>

          <!-- ── Enquiry Details ── -->
          <tr>
            <td style="padding:28px 32px 8px;">
              <p style="margin:0 0 16px;color:#087abb;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Contact Details</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;width:160px;font-weight:600;">Full Name</td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;font-weight:700;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">Email</td>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;font-size:13px;">
                    <a href="mailto:${email}" style="color:#087abb;text-decoration:none;">${email}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">Phone</td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;font-size:13px;">
                    <a href="tel:${phone}" style="color:#087abb;text-decoration:none;">${phone}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Trip Details ── -->
          <tr>
            <td style="padding:0 32px 8px;">
              <p style="margin:0 0 16px;color:#087abb;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Trip Details</p>
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:10px;overflow:hidden;border:1px solid #e2e8f0;">
                ${packageRow}
                <tr>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">Travel Start</td>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;">${formatDate(startDate)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">Travel End</td>
                  <td style="padding:10px 16px;background:#f8fafc;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;">${formatDate(endDate)}</td>
                </tr>
                <tr>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">Guests</td>
                  <td style="padding:10px 16px;background:#ffffff;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;">${people} ${people === 1 ? "person" : "people"}</td>
                </tr>
                ${messageRow}
              </table>
            </td>
          </tr>

          <!-- ── Quick Actions ── -->
          <tr>
            <td style="padding:0 32px 36px;">
              <p style="margin:0 0 14px;color:#087abb;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:1.5px;">Quick Actions</p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding-right:12px;">
                    <a
                      href="mailto:${email}?subject=Re: Your Goa Holiday Enquiry&body=Hi ${name},%0D%0A%0D%0AThank you for your interest in Real Goa Holidays!%0D%0A%0D%0A"
                      style="display:inline-block;background:#087abb;color:#ffffff;font-size:13px;font-weight:600;text-decoration:none;padding:11px 24px;border-radius:50px;"
                    >
                      Reply via Email
                    </a>
                  </td>
                  <td>
                    <a
                      href="tel:${phone}"
                      style="display:inline-block;background:#ffffff;color:#087abb;font-size:13px;font-weight:600;text-decoration:none;padding:10px 24px;border-radius:50px;border:1.5px solid #087abb;"
                    >
                      Call ${name.split(" ")[0]}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background:#0f172a;padding:20px 32px;border-radius:0 0 16px 16px;">
              <p style="margin:0 0 4px;color:#475569;font-size:11px;text-align:center;">
                Enquiry ID: <span style="color:#94a3b8;font-family:monospace;">${enquiryId}</span>
              </p>
              <p style="margin:0;color:#475569;font-size:11px;text-align:center;">
                © ${new Date().getFullYear()} Real Goa Holidays · This is an automated notification.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}
