import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";

export const metadata: Metadata = {
  title: "SMS Compliance | HVAC Service & AC Repair",
  description: "SMS compliance information for HVAC Service & AC Repair — opt-in method, opt-out instructions, message types, and contact information.",
  robots: { index: true, follow: true },
  alternates: { canonical: "/sms-compliance" },
};

export default function SmsCompliancePage() {
  return (
    <main className="py-14 lg:py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">SMS Compliance</h1>
        <p className="text-slate-500 text-sm mb-10">Last updated: June 9, 2026</p>

        <div className="prose-hvac space-y-10">

          <div>
            <h2>Business Information</h2>
            <address className="not-italic text-slate-700 space-y-1">
              <p><strong>HVAC Service &amp; AC Repair</strong></p>
              <p>{SITE.address.full}</p>
              <p>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></p>
              <p>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></p>
              <p>Website: <a href={SITE.domain}>{SITE.domain}</a></p>
            </address>
          </div>

          <div>
            <h2>SMS Program Description</h2>
            <p>
              HVAC Service &amp; AC Repair sends service-related SMS messages to customers
              and prospective customers who submit an HVAC service request through our
              website or contact us directly. Messages are used for appointment scheduling,
              confirmations, reminders, technician arrival updates, service follow-ups, and
              customer care related to AC repair, heating repair, HVAC maintenance,
              installation, and emergency HVAC service.
            </p>
          </div>

          <div>
            <h2>Opt-In Method</h2>
            <p>
              End users opt in by visiting{" "}
              <a href="https://www.hvacserviceacrepair.com/">hvacserviceacrepair.com</a> or
              a related service or contact page and submitting a service request form. The
              form collects the user&rsquo;s name, phone number, service needed, and service
              address. Near the phone number field and before the submit button, users see an
              optional, unchecked SMS consent checkbox. The checkbox states that they agree
              to receive SMS text messages from HVAC Service &amp; AC Repair about their
              HVAC service request, appointment scheduling, confirmations, reminders, and
              service follow-ups. The disclosure includes message frequency, message and data
              rates notice, STOP opt-out instructions, HELP instructions, and states that
              consent is not a condition of purchase. Users can submit the form without
              checking the SMS consent box.
            </p>
          </div>

          <div>
            <h2>Message Types</h2>
            <ul>
              <li>Appointment scheduling and confirmation</li>
              <li>Appointment reminders</li>
              <li>Technician arrival updates</li>
              <li>Service follow-ups and customer care</li>
            </ul>
            <p>
              Message frequency varies, up to 4 messages per month. Message and data rates
              may apply.
            </p>
          </div>

          <div>
            <h2>Opt-Out Instructions</h2>
            <p>
              Reply <strong>STOP</strong> to any SMS message to unsubscribe immediately. A
              one-time confirmation will be sent. Additional opt-out keywords:{" "}
              <strong>UNSUBSCRIBE</strong>, <strong>CANCEL</strong>, <strong>END</strong>,{" "}
              <strong>QUIT</strong>.
            </p>
          </div>

          <div>
            <h2>Help Instructions</h2>
            <p>
              Reply <strong>HELP</strong> to any SMS message for help, or contact us directly:
            </p>
            <ul>
              <li>Phone: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a></li>
              <li>Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            </ul>
          </div>

          <div>
            <h2>Sample Messages</h2>
            <ol>
              <li>
                HVAC Service &amp; AC Repair: Thanks for requesting HVAC service. We received
                your request and will contact you shortly to confirm availability. Reply STOP
                to opt out.
              </li>
              <li>
                HVAC Service &amp; AC Repair: Your HVAC appointment is confirmed. Reply HELP
                for help or STOP to unsubscribe.
              </li>
              <li>
                HVAC Service &amp; AC Repair: Our technician is on the way. Please make sure
                the HVAC equipment is accessible. Reply STOP to opt out.
              </li>
              <li>
                HVAC Service &amp; AC Repair: Thank you for choosing us. Contact us at{" "}
                {SITE.phoneDisplay} if you have questions. Reply STOP to opt out.
              </li>
            </ol>
          </div>

          <div>
            <h2>Consent Language</h2>
            <p>
              The following exact text is shown to users on the consent checkbox on all
              service request forms:
            </p>
            <blockquote className="border-l-4 border-copper-400 pl-4 italic text-slate-600">
              I agree to receive SMS text messages from HVAC Service &amp; AC Repair about my
              HVAC service request, appointment scheduling, confirmations, reminders, and
              service follow-ups. Message frequency varies, up to 4 messages per month.
              Message and data rates may apply. Reply STOP to unsubscribe and HELP for help.
              Consent is not a condition of purchase. View our Privacy Policy and Terms of
              Service.
            </blockquote>
          </div>

          <div>
            <h2>Privacy and Data Handling</h2>
            <p>
              SMS consent data, mobile phone numbers, and opt-in records will not be sold,
              rented, shared, or disclosed to third parties, affiliates, or lead generators
              for marketing or promotional purposes.
            </p>
          </div>

          <div>
            <h2>Legal Pages</h2>
            <ul>
              <li>
                <Link href="/privacy-policy">Privacy Policy</Link>{" "}
                — https://www.hvacserviceacrepair.com/privacy-policy
              </li>
              <li>
                <Link href="/terms">Terms of Service</Link>{" "}
                — https://www.hvacserviceacrepair.com/terms
              </li>
            </ul>
          </div>

        </div>
      </div>
    </main>
  );
}
