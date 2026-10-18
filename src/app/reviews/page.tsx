import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/config/site";
import CtaSection from "@/components/ui/CtaSection";
import InteriorHero from "@/components/layout/InteriorHero";
import { IMG_LENNOX_INSTALL } from "@/lib/config/images";
import { GOOGLE_PROFILE_URL } from "@/lib/content/reviews";

export const metadata: Metadata = {
  title: "Our Service Standards",
  description:
    "How we handle every HVAC call in Yorba Linda and Orange County: pricing explained up front, honest repair advice and respectful work. Read our Google reviews.",
  alternates: { canonical: "/reviews" },
};

const EXPERIENCE_THEMES = [
  {
    theme: "Transparent Pricing",
    icon: (
      <svg className="w-6 h-6 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 8.25H9m6 3H9m3 6l-3-3h1.5a3 3 0 100-6M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "We explain pricing before work starts, so there are no surprise charges at the end.",
  },
  {
    theme: "Same-Day Response",
    icon: (
      <svg className="w-6 h-6 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    description:
      "We make same-day service a priority, especially during the summer when a broken AC is more than an inconvenience.",
  },
  {
    theme: "Honest Recommendations",
    icon: (
      <svg className="w-6 h-6 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    description:
      "When a repair isn't worth it, we say so. You get an honest assessment, not a push toward an expensive fix.",
  },
  {
    theme: "Clean, Respectful Service",
    icon: (
      <svg className="w-6 h-6 text-hvac-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    description:
      "We treat your home with respect — covering work areas, cleaning up after ourselves, and not leaving until the job is done right.",
  },
];

export default function ReviewsPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={[{ name: "Reviews", href: "/reviews" }]}
        eyebrow="Service Standards"
        heading="Our Commitment to Quality HVAC Service"
        description="We don't publish fake reviews. Read genuine customer reviews on our Google Business Profile, and see below how we approach every job."
        image={IMG_LENNOX_INSTALL}
      />

      {/* Experience themes */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3">
              How We Approach Every Job
            </h2>
            <p className="text-slate-600 leading-relaxed">
              These are the standards we hold ourselves to on every service call.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EXPERIENCE_THEMES.map((item) => (
              <div key={item.theme} className="rounded-2xl border border-slate-200 bg-white shadow-card p-7 flex gap-5">
                <div className="w-12 h-12 rounded-xl bg-hvac-blue-50 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="font-bold text-slate-900 mb-1.5">{item.theme}</p>
                  <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Google review placeholder */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
            </svg>
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">See Our Reviews on Google</h2>
            <p className="text-slate-500 text-sm leading-relaxed max-w-lg">
              Read customer reviews directly from the source on our{" "}
              <a href={GOOGLE_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="text-hvac-blue-600 font-semibold hover:underline">
                Google Business Profile
              </a>
              , or search &ldquo;HVAC Service &amp; AC Repair Yorba Linda&rdquo; on Google.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-hvac-blue-600 text-white font-semibold text-sm hover:bg-hvac-blue-500 transition-colors"
            >
              Call to Ask About Our Service
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl border-2 border-slate-200 text-slate-700 font-semibold text-sm hover:border-slate-400 transition-colors"
            >
              Request an Estimate
            </Link>
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-lg font-bold text-slate-900 mb-2">Had service with us?</h2>
          <p className="text-slate-500 text-sm mb-4">
            If we serviced your system and you&rsquo;d like to share your experience, we&rsquo;d
            appreciate a review. It helps other homeowners find honest HVAC service.
          </p>
          <p className="text-sm text-slate-400">
            Search &ldquo;HVAC Service &amp; AC Repair Yorba Linda&rdquo; on Google to leave a review.
          </p>
        </div>
      </section>

      <CtaSection
        heading="Ready to Experience the Difference?"
        subtext="Request a free estimate from our local team."
        primaryLabel="Get a Free Estimate"
        primaryHref="/contact"
        variant="blue"
      />
    </>
  );
}
