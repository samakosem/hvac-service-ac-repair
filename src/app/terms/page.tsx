import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";

export const metadata: Metadata = {
  title: "Terms of Service | HVAC Service & AC Repair",
  description:
    "Terms of service for HVAC Service & AC Repair. Understand the conditions of using our website and scheduling HVAC services.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: false },
};

const LAST_UPDATED = "May 1, 2025";

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
                By using the {SITE.name} website (hvacserviceacrepair.com) or scheduling
                HVAC services with us, you agree to these Terms of Service. If you do not
                agree, do not use this website or request services.
              </p>
            </div>

            <div>
              <h2>Website Use</h2>
              <p>
                This website is provided for informational purposes and to allow prospective
                customers to request HVAC service estimates. You may use it for lawful
                purposes only.
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
              <h2>Service Estimates and Quotes</h2>
              <p>
                Estimates submitted through this website are requests for service — not
                binding contracts. All pricing is confirmed in person or by phone after
                a technician assesses your system. Written estimates are provided before
                any work begins.
              </p>
              <p>
                Submitting an estimate request through this website does not guarantee
                availability, a specific appointment time, or a specific price.
              </p>
            </div>

            <div>
              <h2>Service Terms</h2>
              <p>
                When you schedule HVAC services with us, the following terms apply:
              </p>
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
                General warranty and workmanship guarantees do not cover issues resulting
                from misuse, unauthorized modifications, or failure to follow recommended
                maintenance schedules.
              </p>
            </div>

            <div>
              <h2>Limitation of Liability</h2>
              <p>
                {SITE.name}&rsquo;s liability for any claim arising from services rendered
                is limited to the amount paid for those specific services. We are not liable
                for consequential, incidental, or indirect damages, including but not limited
                to lost profits, property damage unrelated to the service work, or any damage
                resulting from circumstances beyond our reasonable control.
              </p>
            </div>

            <div>
              <h2>Accuracy of Information</h2>
              <p>
                We make reasonable efforts to keep pricing, service descriptions, and
                other information on this website current and accurate. However, information
                may change without notice. Do not rely solely on website content for
                critical decisions — contact us directly to confirm current pricing,
                availability, and service details.
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
