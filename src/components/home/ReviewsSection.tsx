import Link from "next/link";

const HIGHLIGHTS = [
  {
    theme: "Fast Response",
    icon: "⚡",
    quote:
      "Customers consistently mention same-day or next-morning arrival across Orange County — even during summer heat waves.",
    detail: "Speed & availability",
  },
  {
    theme: "Honest Technicians",
    icon: "💬",
    quote:
      "Our technicians explain the problem clearly and recommend the most cost-effective solution — not the most expensive one.",
    detail: "No upsells, no pressure",
  },
  {
    theme: "Clean Workmanship",
    icon: "🧹",
    quote:
      "Shoe covers, clean work areas, and zero mess left behind. This shows up in customer feedback without being asked.",
    detail: "Professional every time",
  },
  {
    theme: "Upfront Pricing",
    icon: "📋",
    quote:
      "Homeowners receive a written estimate before work starts and pay exactly the quoted amount — no surprise charges.",
    detail: "Transparent & fair",
  },
];

function StarIcon() {
  return (
    <svg className="w-4 h-4 text-amber-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, i) => <StarIcon key={i} />)}
    </div>
  );
}

export default function ReviewsSection() {
  return (
    <section className="py-16 lg:py-24 bg-section-dark" aria-labelledby="reviews-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-4">
          <span className="section-label section-label-white mb-4">Customer Experience Highlights</span>
          <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-3">
            Why Orange County Homeowners Call Us Back
          </h2>
          {/* Google rating summary */}
          <div className="flex items-center justify-center gap-2 mt-2 mb-3">
            <Stars />
            <span className="text-white font-bold text-sm">5.0</span>
            <span className="text-slate-400 text-sm">on Google</span>
          </div>
          <p className="text-slate-400 leading-relaxed text-sm">
            Based on direct customer feedback — here are the qualities our customers mention most consistently.
          </p>
        </div>

        {/* Highlight cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {HIGHLIGHTS.map((item, i) => (
            <div
              key={item.theme}
              className={`card-navy p-6 rounded-2xl flex flex-col gap-4 animate-fade-in-up stagger-${i + 1} border border-white/6`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl" aria-hidden="true">{item.icon}</span>
                  <span className="font-bold text-white text-sm">{item.theme}</span>
                </div>
                <Stars count={5} />
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">
                &ldquo;{item.quote}&rdquo;
              </p>
              <p className="text-slate-500 text-xs font-medium uppercase tracking-wide">{item.detail}</p>
            </div>
          ))}
        </div>

        {/* Google review CTA */}
        <div className="rounded-2xl bg-white/5 border border-white/10 p-8 text-center max-w-2xl mx-auto">
          <div className="flex justify-center mb-3">
            <Stars />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Had service with us?</h3>
          <p className="text-slate-400 text-sm leading-relaxed mb-5">
            Your review helps other Orange County homeowners find honest, reliable HVAC service.
            We read every piece of feedback — it matters to us.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://www.google.com/maps/search/HVAC+Service+AC+Repair+Yorba+Linda"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors shadow-sm"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Leave a Google Review
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-copper-gradient text-white font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Leave Direct Feedback
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
