import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY);
  return _resend;
}

const LEAD_EMAIL = "sammazor1@gmail.com";
const FROM_EMAIL = "leads@hvacserviceacrepair.com";

// Field length limits — mirrors frontend LIMITS
const MAX = {
  name: 100,
  phone: 30,
  email: 120,
  service: 80,
  address: 200,
  message: 1000,
  pageUrl: 500,
};

function isValidPhone(v: string) {
  return /^[\d\s()\-+]{7,}$/.test(v);
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}

// Strip HTML tags and dangerous chars to prevent injection in email body
function sanitize(v: string, max: number): string {
  return v
    .slice(0, max)
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&#38;")
    .replace(/"/g, "&#34;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Honeypots — bots fill these, humans don't
  if (body.website || body.faxNumber) {
    return NextResponse.json({ ok: true });
  }

  const name = sanitize(typeof body.name === "string" ? body.name.trim() : "", MAX.name);
  const phone = sanitize(typeof body.phone === "string" ? body.phone.trim() : "", MAX.phone);
  const email = sanitize(typeof body.email === "string" ? body.email.trim() : "", MAX.email);
  const service = sanitize(typeof body.service === "string" ? body.service.trim() : "", MAX.service);
  const address = sanitize(typeof body.address === "string" ? body.address.trim() : "", MAX.address);
  const propertyType = sanitize(typeof body.propertyType === "string" ? body.propertyType.trim() : "", 20);
  const isEmergency = body.isEmergency === true;
  const interestedInFinancing = body.interestedInFinancing === true;
  const message = sanitize(typeof body.message === "string" ? body.message.trim() : "", MAX.message);
  const pageUrl = sanitize(typeof body.pageUrl === "string" ? body.pageUrl.trim() : "", MAX.pageUrl);

  // Server-side validation
  if (!name) return NextResponse.json({ error: "Name is required." }, { status: 422 });
  if (!phone) return NextResponse.json({ error: "Phone number is required." }, { status: 422 });
  if (!isValidPhone(phone)) return NextResponse.json({ error: "Enter a valid phone number." }, { status: 422 });
  if (email && !isValidEmail(email)) return NextResponse.json({ error: "Enter a valid email address." }, { status: 422 });
  if (!service) return NextResponse.json({ error: "Service is required." }, { status: 422 });
  if (!address || address.length < 8) return NextResponse.json({ error: "Full service address is required." }, { status: 422 });

  const timestamp = new Date().toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    dateStyle: "full",
    timeStyle: "short",
  });

  const urgencyLabel = isEmergency ? "🚨 EMERGENCY" : "Standard";
  const subject = isEmergency
    ? `🚨 EMERGENCY Lead: ${name} — ${service}`
    : `New Lead: ${name} — ${service}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><style>
  body { font-family: Arial, sans-serif; color: #1e293b; margin: 0; padding: 0; background: #f8fafc; }
  .wrap { max-width: 600px; margin: 24px auto; background: #fff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
  .header { background: ${isEmergency ? "#dc2626" : "#1d4ed8"}; padding: 24px 28px; }
  .header h1 { color: #fff; margin: 0; font-size: 20px; }
  .header p { color: ${isEmergency ? "#fecaca" : "#bfdbfe"}; margin: 4px 0 0; font-size: 13px; }
  .body { padding: 28px; }
  .row { margin-bottom: 16px; }
  .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; font-weight: 600; margin-bottom: 3px; }
  .value { font-size: 15px; color: #0f172a; }
  .badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; }
  .badge-emergency { background: #fee2e2; color: #b91c1c; }
  .badge-standard { background: #dbeafe; color: #1d4ed8; }
  .divider { border: none; border-top: 1px solid #e2e8f0; margin: 20px 0; }
  .footer { padding: 16px 28px; background: #f8fafc; font-size: 12px; color: #94a3b8; }
  a { color: #1d4ed8; }
</style></head>
<body>
<div class="wrap">
  <div class="header">
    <h1>${isEmergency ? "🚨 Emergency " : ""}New Lead: ${name}</h1>
    <p>Received ${timestamp}</p>
  </div>
  <div class="body">
    <div class="row">
      <div class="label">Urgency</div>
      <div class="value"><span class="badge ${isEmergency ? "badge-emergency" : "badge-standard"}">${urgencyLabel}</span></div>
    </div>
    <hr class="divider">
    <div class="row">
      <div class="label">Full Name</div>
      <div class="value">${name}</div>
    </div>
    <div class="row">
      <div class="label">Phone</div>
      <div class="value"><a href="tel:${phone}">${phone}</a></div>
    </div>
    ${email ? `<div class="row"><div class="label">Email</div><div class="value"><a href="mailto:${email}">${email}</a></div></div>` : ""}
    <hr class="divider">
    <div class="row">
      <div class="label">Service Requested</div>
      <div class="value">${service}</div>
    </div>
    <div class="row">
      <div class="label">Service Address</div>
      <div class="value">${address}</div>
    </div>
    ${propertyType ? `<div class="row"><div class="label">Property Type</div><div class="value" style="text-transform:capitalize">${propertyType}</div></div>` : ""}
    ${interestedInFinancing ? `<div class="row"><div class="label">Financing</div><div class="value">Interested in financing options</div></div>` : ""}
    ${message ? `<hr class="divider"><div class="row"><div class="label">Message / Details</div><div class="value" style="white-space:pre-wrap">${message}</div></div>` : ""}
    <hr class="divider">
    ${pageUrl ? `<div class="row"><div class="label">Page URL</div><div class="value"><a href="${pageUrl}">${pageUrl}</a></div></div>` : ""}
    <div class="row">
      <div class="label">Timestamp</div>
      <div class="value">${timestamp} (PT)</div>
    </div>
  </div>
  <div class="footer">Sent via HVAC Service &amp; AC Repair contact form.</div>
</div>
</body>
</html>`;

  if (!process.env.RESEND_API_KEY) {
    console.error("[contact] RESEND_API_KEY not set");
    return NextResponse.json({ error: "Service unavailable. Please call us directly." }, { status: 503 });
  }

  try {
    const { error } = await getResend().emails.send({
      from: FROM_EMAIL,
      to: LEAD_EMAIL,
      subject,
      html,
      replyTo: email || undefined,
    });

    if (error) {
      console.error("[contact] Resend error:", error.name, error.message);
      return NextResponse.json({ error: "Failed to send. Please call us directly." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Unexpected error:", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ error: "Server error. Please try again." }, { status: 500 });
  }
}
