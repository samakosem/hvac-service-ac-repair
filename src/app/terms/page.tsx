import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Terms of Service | HVAC Service & AC Repair",
  description:
    "Terms of service for HVAC Service & AC Repair, including SMS text messaging terms, opt-out instructions, and the conditions of using our website and scheduling HVAC services.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

const LAST_UPDATED = "June 9, 2026";

export default function TermsPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={[{ name: "Terms of Service", href: "/terms" }]}
        heading="Terms of Service"
        note={`Last updated: ${LAST_UPDATED}`}
        image={IMG_LENNOX_INSTALL}
      />

      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose-hvac space-y-10">

            <div>
              <h2>Agreement to Terms</h2>
              <p>
                By using the HVAC Service &amp; AC Repair website (hvacserviceacrepair.com)
                or scheduling HVAC services with us, you agree to these Terms of Service.
                If you do not agree, do not use this website or request services.
              </p>
            </div>

            <div>
              <h2>Website Use</h2>
              <p>
                This website is provided for informational purposes and to allow prospective
                and existing customers to request HVAC service estimates and contact us. You
                may use it for lawful purposes only.
              </p>
              <p>You agree not to:</p>
              <ul>
                <li>Submit false, misleading, or fraudulent service requests</li>
                <li>Attempt to interfere with or disrupt the website&rsquo;s operation</li>
                <li>Scrape, harvest, or automatically collect data from this site</li>
                <li>Use this site to transmit spam or unsolicited communications</li>
              </ul>
            </div>

            <div>
              <h2>Service Requests and Estimates</h2>
              <p>
                Estimates submitted through this website are requests for service — not
                binding contracts. All pricing is confirmed in person or by phone after a
                technician assesses your system. Written estimates are provided before any
                work begins.
              </p>
              <p>
                Submitting a service request through this website does not guarantee
                availability, a specific appointment time, or a specific price.
              </p>
            </div>

            <div>
              <h2>Scheduling and Availability</h2>
              <p>
                We make every effort to schedule service appointments promptly. Same-day
                and emergency appointments are subject to technician availability.
                Appointment windows are estimates — actual arrival times may vary due to
                prior job complexity or traffic.
              </p>
            </div>

            <div>
              <h2>Pricing and Payment</h2>
              <ul>
                <li>
                  <strong>Written estimates</strong> — We provide a written estimate
                  before beginning any paid work. Your approval is required before we start.
                </li>
                <li>
                  <strong>Payment</strong> — Payment is due upon completion of service
                  unless other arrangements have been made in writing. We accept major
                  credit cards, check, and cash.
                </li>
                <li>
                  <strong>Access</strong> — You agree to provide safe, reasonable access
                  to the equipment and work area. Our technicians reserve the right to
                  decline work in unsafe conditions.
                </li>
                <li>
                  <strong>Cancellations</strong> — Please notify us at least 24 hours in
                  advance if you need to cancel or reschedule a scheduled appointment.
                </li>
              </ul>
            </div>

            <div>
              <h2>Warranty and Workmanship</h2>
              <p>
                We stand behind our work. Specific warranty terms (labor and parts) are
                provided in your written service agreement at the time of service. Equipment
                warranties are governed by the manufacturer&rsquo;s warranty policy.
              </p>
              <p>
                Warranty and workmanship guarantees do not cover issues resulting from
                misuse, unauthorized modifications, or failure to follow recommended
                maintenance schedules.
              </p>
            </div>

            <div>
              <h2>SMS / Text Messaging Terms</h2>
              <p>
                By checking the optional SMS consent box on our website forms, you agree to
                receive SMS text messages from HVAC Service &amp; AC Repair related to your
                HVAC service request, appointment scheduling, confirmations, reminders,
                technician arrival updates, service follow-ups, and customer care. Message
                frequency varies, up to 4 messages per month. Message and data rates may
                apply. Reply <strong>STOP</strong> to unsubscribe at any time. Reply{" "}
                <strong>HELP</strong> for help. Consent to receive SMS messages is not a
                condition of purchase or service.
              </p>
              <p>
                The SMS consent checkbox on our forms is optional and is not checked by
                default. You can submit a service request and receive HVAC service without
                opting in to SMS messages.
              </p>
            </div>

            <div>
              <h2>SMS Opt-Out Instructions</h2>
              <p>
                To stop receiving SMS messages from HVAC Service &amp; AC Repair, reply{" "}
                <strong>STOP</strong> to any message you receive from us. You will receive
                a one-time confirmation that you have been unsubscribed. You will not receive
                further SMS messages unless you opt in again.
              </p>
              <p>
                For SMS help, reply <strong>HELP</strong> or contact HVAC Service &amp; AC
                Repair at{" "}
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a> or{" "}
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
              </p>
            </div>

            <div>
              <h2>Privacy</h2>
              <p>
                Your privacy is important to us. Our{" "}
                <Link href="/privacy-policy" className="underline">
                  Privacy Policy
                </Link>{" "}
                is incorporated into these Terms by reference and explains how we collect,
                use, and protect your personal information, including SMS opt-in data and
                mobile information. We do not sell, share, or disclose your phone number
                or SMS consent data to third parties, affiliates, or lead generators for
                marketing or promotional purposes.
              </p>
            </div>

            <div>
              <h2>Third-Party Links</h2>
              <p>
                This website may contain links to third-party websites (such as financing
                partners or equipment manufacturers). We are not responsible for the content,
                accuracy, or privacy practices of those sites.
              </p>
            </div>

            <div>
              <h2>Limitation of Liability</h2>
              <p>
                HVAC Service &amp; AC Repair&rsquo;s liability for any claim arising from
                services rendered is limited to the amount paid for those specific services.
                We are not liable for consequential, incidental, or indirect damages,
                including but not limited to lost profits, property damage unrelated to the
                service work, or damage resulting from circumstances beyond our reasonable
                control.
              </p>
            </div>

            <div>
              <h2>Governing Law</h2>
              <p>
                These Terms are governed by the laws of the State of California. Any
                disputes arising from these Terms or from services provided shall be resolved
                in Orange County, California.
              </p>
            </div>

            <div>
              <h2>Changes to These Terms</h2>
              <p>
                We may update these Terms periodically. Changes are effective when posted
                on this page with an updated date. Continued use of this website after
                changes are posted constitutes acceptance of the updated Terms.
              </p>
            </div>

            <div>
              <h2>Contact Us</h2>
              <p>Questions about these Terms? Contact us:</p>
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
