import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Privacy Policy | HVAC Service & AC Repair",
  description:
    "Privacy policy for HVAC Service & AC Repair. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 2, 2026";

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
                {SITE.name} is a licensed HVAC contractor based in Yorba Linda, California.
                Our business address is {SITE.address.full}. This Privacy Policy explains
                how we handle information you provide when contacting us or using this website.
              </p>
            </div>

            <div>
              <h2>Information We Collect</h2>
              <p>We collect information only when you voluntarily provide it:</p>
              <ul>
                <li>
                  <strong>Contact and estimate requests</strong> — name, phone number, email
                  address, service type, property address or city, and any description you
                  include in the message field.
                </li>
                <li>
                  <strong>Phone calls</strong> — when you call us, your caller ID and any
                  information you share during the call.
                </li>
                <li>
                  <strong>Website analytics</strong> — if we use an analytics tool, it may
                  collect anonymized data such as page views, browser type, and general
                  geographic location (city/region). We do not use this to identify individual
                  visitors.
                </li>
              </ul>
              <p>
                We do not use tracking pixels, behavioral ad networks, or third-party cookies
                for advertising purposes.
              </p>
            </div>

            <div>
              <h2>How We Use Your Information</h2>
              <p>We use the information you provide solely to:</p>
              <ul>
                <li>Respond to your service request or estimate inquiry</li>
                <li>Schedule and confirm appointments</li>
                <li>Follow up on completed service calls if needed</li>
                <li>Send appointment reminders or service follow-ups (by phone or text, with your consent)</li>
              </ul>
              <p>
                We do not sell, rent, or trade your personal information to any third party.
                We do not use your contact information for unsolicited marketing campaigns.
              </p>
            </div>

            <div>
              <h2>How We Store and Protect Your Information</h2>
              <p>
                Contact requests submitted through this website are received by our office
                team. We retain customer records for service history purposes. Records are
                stored in our business management systems and are accessible only to authorized
                staff.
              </p>
              <p>
                This website uses HTTPS encryption for all data transmitted through the
                contact form.
              </p>
            </div>

            <div>
              <h2>Third-Party Services</h2>
              <p>
                This website may be hosted on or integrated with third-party platforms
                (such as web hosting providers, form processing services, or scheduling
                tools). These providers may process data on our behalf under their own
                privacy and security policies. We do not authorize them to use your data
                for their own purposes.
              </p>
            </div>

            <div>
              <h2>Cookies</h2>
              <p>
                This website may use essential cookies required for basic site functionality
                (such as form state). We do not use advertising or cross-site tracking cookies.
                You can disable cookies in your browser settings; this may affect form
                functionality but will not prevent you from viewing content.
              </p>
            </div>

            <div>
              <h2>Your Rights (California Residents)</h2>
              <p>
                Under the California Consumer Privacy Act (CCPA), California residents have
                the right to:
              </p>
              <ul>
                <li>Know what personal information we have collected about you</li>
                <li>Request deletion of your personal information</li>
                <li>Opt out of the sale of personal information (we do not sell personal information)</li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call us at{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>.
              </p>
            </div>

            <div>
              <h2>Children&rsquo;s Privacy</h2>
              <p>
                This website is not directed at children under 13. We do not knowingly collect
                personal information from children.
              </p>
            </div>

            <div>
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy occasionally. Changes will be posted on
                this page with an updated &ldquo;Last updated&rdquo; date. Continued use of
                this website after changes are posted constitutes acceptance of the updated
                policy.
              </p>
            </div>

            <div>
              <h2>Contact Us</h2>
              <p>Questions about this Privacy Policy? Contact us:</p>
              <address className="not-italic">
                {SITE.name}<br />
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
