import type { Metadata } from "next";
import { SITE } from "@/lib/config/site";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Privacy Policy | HVAC Service & AC Repair",
  description:
    "Privacy policy for HVAC Service & AC Repair. Learn how we collect, use, and protect your personal information, including SMS opt-in data and mobile communications.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 9, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={[{ name: "Privacy Policy", href: "/privacy-policy" }]}
        heading="Privacy Policy"
        note={`Last updated: ${LAST_UPDATED}`}
        image={IMG_LENNOX_INSTALL}
      />

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-hvac space-y-10">

            <div>
              <h2>Who We Are</h2>
              <p>
                HVAC Service &amp; AC Repair is a licensed HVAC contractor serving Orange County
                and surrounding areas in Southern California. Our business address is{" "}
                {SITE.address.full}. Phone:{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>. Email:{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
              <p>
                This Privacy Policy explains how we collect, use, protect, and disclose
                information you provide when contacting us, requesting HVAC service, or
                using this website.
              </p>
            </div>

            <div>
              <h2>Information We Collect</h2>
              <p>We collect information only when you voluntarily provide it, including:</p>
              <ul>
                <li>
                  <strong>Contact and service request data</strong> — name, phone number, email
                  address, service type, property address or service city, and any description
                  you include in the message field.
                </li>
                <li>
                  <strong>SMS opt-in data</strong> — if you check the optional SMS consent
                  checkbox on our website forms, we record your consent status, the exact
                  consent text shown to you, the consent version, and the timestamp of
                  submission.
                </li>
                <li>
                  <strong>Phone call data</strong> — when you call us, your caller ID and
                  any information you share during the call.
                </li>
                <li>
                  <strong>Website analytics</strong> — we may use analytics tools that collect
                  anonymized data such as page views, browser type, and general geographic
                  region. We do not use this to identify individual visitors.
                </li>
              </ul>
              <p>
                We do not use tracking pixels, behavioral ad networks, or third-party
                advertising cookies.
              </p>
            </div>

            <div>
              <h2>How We Use Your Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul>
                <li>Respond to your HVAC service request or estimate inquiry</li>
                <li>Schedule and confirm service appointments</li>
                <li>Send appointment reminders, technician arrival updates, and service follow-ups</li>
                <li>Follow up on completed service calls if needed</li>
                <li>Communicate with you by phone, email, or SMS (only if you have opted in to SMS)</li>
                <li>Comply with legal obligations</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to any third party.
                We do not use your contact information for unsolicited marketing campaigns.
              </p>
            </div>

            <div>
              <h2>SMS / Text Messaging Communications</h2>
              <p>
                If you opt in to receive text messages from HVAC Service &amp; AC Repair, we
                may send SMS messages related to your service request, appointment scheduling,
                confirmations, reminders, technician arrival updates, service follow-ups, and
                customer care. Message frequency varies, up to 4 messages per month. Message
                and data rates may apply. You may opt out at any time by replying{" "}
                <strong>STOP</strong>. For help, reply <strong>HELP</strong> or contact us at{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>.
              </p>
              <p>
                SMS messaging is entirely optional. You can submit a service request and
                receive service without agreeing to receive SMS messages.
              </p>
            </div>

            <div>
              <h2>SMS Consent and Mobile Information</h2>
              <p>
                SMS consent is not shared with third parties or affiliates for marketing
                purposes. Mobile information, including phone numbers, SMS opt-in data, and
                SMS consent records, will not be sold, rented, shared, or disclosed to third
                parties, affiliates, or lead generators for their marketing or promotional
                purposes.
              </p>
              <p>
                We record your SMS consent, the version of the consent text you agreed to,
                and the date and time of submission. This record is maintained for compliance
                purposes and is accessible only to authorized staff.
              </p>
            </div>

            <div>
              <h2>How to Opt Out of SMS</h2>
              <p>You can opt out of SMS messages from HVAC Service &amp; AC Repair at any time by:</p>
              <ul>
                <li>Replying <strong>STOP</strong> to any SMS message you receive from us</li>
                <li>
                  Contacting us directly at{" "}
                  <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> or{" "}
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </li>
              </ul>
              <p>
                After opting out, you will receive a one-time confirmation message and will
                not receive further SMS messages unless you opt in again.
              </p>
            </div>

            <div>
              <h2>Information Sharing</h2>
              <p>
                We do not sell, rent, or share your personal information with third parties
                for their marketing or promotional purposes. We do not share your phone number,
                email address, or SMS consent status with affiliates, lead generation companies,
                or marketing partners.
              </p>
            </div>

            <div>
              <h2>Service Providers</h2>
              <p>
                We use trusted third-party service providers to operate this website and
                deliver communications — for example, email delivery services and web hosting
                providers. These providers process data on our behalf under contractual
                obligations and are not authorized to use your data for their own marketing
                purposes. We do not sell or transfer your data to these providers beyond what
                is necessary to deliver our services.
              </p>
            </div>

            <div>
              <h2>Cookies and Analytics</h2>
              <p>
                This website may use essential cookies required for basic site functionality,
                such as form state and session management. We may also use analytics tools
                (such as Google Analytics) that collect anonymized browsing data. We do not
                use advertising cookies or cross-site behavioral tracking.
              </p>
              <p>
                You can disable cookies in your browser settings. Disabling cookies may
                affect form functionality but will not prevent you from viewing website content.
              </p>
            </div>

            <div>
              <h2>Data Security</h2>
              <p>
                This website uses HTTPS encryption for all data transmitted through contact
                and service request forms. Contact requests and customer records are stored
                in our business management systems and are accessible only to authorized
                staff. We take reasonable technical and organizational measures to protect
                your information from unauthorized access, disclosure, or misuse.
              </p>
            </div>

            <div>
              <h2>Data Retention</h2>
              <p>
                We retain customer records, including service request data and SMS consent
                records, for as long as necessary to provide service, comply with legal
                obligations, and resolve disputes. If you wish to request deletion of your
                personal information, contact us at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>

            <div>
              <h2>California Privacy Rights</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA) and California Privacy
                Rights Act (CPRA), California residents have the right to:
              </p>
              <ul>
                <li>Know what personal information we have collected about them</li>
                <li>Know whether their personal information has been disclosed and to whom</li>
                <li>Request deletion of personal information</li>
                <li>
                  Opt out of the sale of personal information (we do not sell personal
                  information)
                </li>
                <li>Non-discrimination for exercising these rights</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>. We will respond
                within 45 days as required by law.
              </p>
            </div>

            <div>
              <h2>Children&rsquo;s Privacy</h2>
              <p>
                This website is not directed at children under 13. We do not knowingly
                collect personal information from children. If you believe we have
                inadvertently collected information from a child under 13, contact us
                immediately so we can delete it.
              </p>
            </div>

            <div>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. Changes will be posted
                on this page with an updated &ldquo;Last updated&rdquo; date. For material
                changes, we may notify you by email if you have provided one. Continued use
                of this website after changes are posted constitutes acceptance of the
                updated policy.
              </p>
            </div>

            <div>
              <h2>Contact Us</h2>
              <p>Questions or concerns about this Privacy Policy? Contact us:</p>
              <address className="not-italic">
                HVAC Service &amp; AC Repair<br />
                {SITE.address.full}<br />
                Phone: <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a><br />
                Email: <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </address>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
