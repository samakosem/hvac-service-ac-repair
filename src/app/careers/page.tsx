import type { Metadata } from "next";
import { SITE } from "@/lib/config/site";
import InteriorHero from "@/components/layout/InteriorHero";

export const metadata: Metadata = {
  title: "HVAC Careers in Orange County | Join Our Team — Yorba Linda, CA",
  description:
    "HVAC Service & AC Repair is hiring experienced HVAC technicians and service dispatchers in the Yorba Linda / Orange County area. Apply today.",
  alternates: { canonical: "/careers" },
};

const OPEN_ROLES = [
  {
    title: "HVAC Field Technician",
    type: "Full-Time",
    location: "Yorba Linda, CA (Field — Orange County)",
    summary:
      "Diagnose and repair residential and light commercial HVAC systems. Perform installations, replacements, and seasonal maintenance across Orange County.",
    requirements: [
      "EPA 608 certification required",
      "2+ years of residential HVAC service experience",
      "Clean driving record — company vehicle provided",
      "Ability to work in confined spaces and on rooftops",
      "Strong communication skills with homeowners",
    ],
    preferred: [
      "Experience with ductless mini-split systems",
      "Bilingual (English/Spanish) a plus",
    ],
  },
  {
    title: "HVAC Service Dispatcher",
    type: "Full-Time",
    location: "Yorba Linda, CA (Office-Based)",
    summary:
      "Coordinate daily technician scheduling, handle inbound service calls, follow up on estimates, and keep customers informed. This role is the center of our operation.",
    requirements: [
      "2+ years in customer service or dispatch (HVAC, plumbing, or home services preferred)",
      "Excellent phone communication skills",
      "Strong organizational skills — comfortable managing multiple schedules",
      "Proficient in scheduling or CRM software",
    ],
    preferred: [
      "Experience with HVAC service software",
      "Bilingual (English/Spanish) a plus",
    ],
  },
];

const BENEFITS = [
  "Competitive hourly pay commensurate with experience",
  "Company vehicle provided for field roles",
  "Tools and equipment provided",
  "Paid time off",
  "Consistent, year-round work in a growing market",
  "Small team environment — your work is noticed",
  "Room to grow as the company grows",
];

const PROCESS = [
  {
    step: "Apply",
    description: "Send us your resume and a brief note about your experience by email or phone.",
  },
  {
    step: "Phone Screen",
    description: "We&rsquo;ll call to ask a few questions and answer any you have about the role.",
  },
  {
    step: "In-Person Meeting",
    description: "We meet at our Yorba Linda office to talk through the role and your background in detail.",
  },
  {
    step: "Decision",
    description: "We move quickly. You&rsquo;ll hear from us within a few days of the interview.",
  },
];

export default function CareersPage() {
  return (
    <>
      <InteriorHero
        breadcrumbs={[{ name: "Careers", href: "/careers" }]}
        eyebrow="Join Our Team"
        heading="Work With an HVAC Team That Respects the Trade"
        description="We're a locally operated company based in Yorba Linda. We hire experienced people, pay fairly, and treat the work seriously."
      />

      {/* Open roles */}
      <section className="py-14 lg:py-20 bg-warm-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="section-label section-label-blue mb-4">Open Positions</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
              Current Openings
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {OPEN_ROLES.map((role) => (
              <div key={role.title} className="rounded-2xl border border-slate-200 bg-white shadow-card p-8 flex flex-col gap-5">
                <div>
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-block text-xs font-bold uppercase tracking-wide px-2.5 py-1 rounded-full bg-hvac-blue-100 text-hvac-blue-700">
                      {role.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-0.5">{role.title}</h3>
                  <p className="text-sm text-slate-500">{role.location}</p>
                </div>

                <p className="text-slate-600 text-sm leading-relaxed">{role.summary}</p>

                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2.5">Requirements</p>
                  <ul className="space-y-2">
                    {role.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <svg className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>

                {role.preferred.length > 0 && (
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-2.5">Nice to Have</p>
                    <ul className="space-y-2">
                      {role.preferred.map((pref) => (
                        <li key={pref} className="flex items-start gap-2.5 text-sm text-slate-500">
                          <svg className="w-4 h-4 text-slate-300 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          {pref}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <a
                  href={`mailto:${SITE.email}?subject=Application: ${role.title}`}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity mt-auto"
                >
                  Apply for This Role
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="section-label section-label-copper w-fit mb-4">Benefits</span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                What We Offer
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                We&rsquo;re a small, local operation — which means your contributions matter and
                you&rsquo;ll be part of a team, not a number.
              </p>
              <ul className="space-y-3">
                {BENEFITS.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <svg className="w-4 h-4 text-copper-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8">
              <h3 className="font-bold text-slate-900 text-base mb-6">Hiring Process</h3>
              <ol className="space-y-5">
                {PROCESS.map((step, i) => (
                  <li key={step.step} className="flex gap-4">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-copper-100 flex items-center justify-center text-copper-600 text-sm font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm mb-0.5">{step.step}</p>
                      <p className="text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: step.description }} />
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Apply CTA */}
      <section className="py-14 lg:py-20 bg-hvac-blue-700">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Ready to Apply?
          </h2>
          <p className="text-hvac-blue-100 leading-relaxed">
            Send your resume to{" "}
            <a href={`mailto:${SITE.email}`} className="text-white font-semibold hover:underline">
              {SITE.email}
            </a>{" "}
            with the role name in the subject line, or call us and ask for the hiring manager.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href={`mailto:${SITE.email}?subject=HVAC Career Application`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-copper-gradient text-white font-bold text-base hover:opacity-90 transition-opacity"
            >
              Email Your Resume
            </a>
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base border-2 border-white/30 text-white hover:border-white/70 transition-colors"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
