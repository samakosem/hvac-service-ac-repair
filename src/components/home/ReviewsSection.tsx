import Link from "next/link";

const HIGHLIGHTS = [
  {
    theme: "Speed",
    icon: "⚡",
    quote: "Customers consistently mention fast response — same-day or next-morning arrival across Orange County.",
  },
  {
    theme: "Honesty",
    icon: "💬",
    quote: "We hear regularly that our technicians explain the problem clearly and don't push unnecessary repairs.",
  },
  {
    theme: "Cleanliness",
    icon: "🧹",
    quote: "Shoe covers, clean workspaces, and no mess left behind — this comes up in feedback unprompted.",
  },
  {
    theme: "Pricing",
    icon: "📋",
    quote: "Homeowners appreciate getting a written estimate before work starts and paying the quoted amount at the end.",
  },
];

export default function ReviewsSection() {
  return (
    <section className="py-16 lg:py-24 bg-section-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-label section-label-white mb-4">Customer Experience</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
            What We Hear from Customers
          </h2>
          <p className="text-slate-400 leading-relaxed">
            We&rsquo;re actively collecting Google and Yelp reviews as we build our online presence.
            In the meantime, here are the themes that come up most in direct customer feedback.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.theme}
              className={`card-navy p-6 rounded-2xl flex flex-col gap-4 animate-fade-in-up stagger-${i + 1}`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                <span className="font-bold text-white text-sm">{item.theme}</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
            </div>
          ))}
        </div>

        {/* Review invite */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center max-w-2xl mx-auto">
          <h3 className="text-white font-bold text-lg mb-2">Had service with us?</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Your review helps Orange County homeowners find reliable HVAC service — and it helps us
            improve. We read every piece of feedback.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Leave Feedback Directly
            </Link>
            <span className="text-slate-600 text-xs">Search &ldquo;HVAC Service &amp; AC Repair Yorba Linda&rdquo; on Google</span>
          </div>
        </div>
      </div>
    </section>
  );
}
