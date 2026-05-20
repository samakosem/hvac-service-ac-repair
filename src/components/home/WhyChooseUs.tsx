import SectionWrapper from "@/components/ui/SectionWrapper";
import { SITE } from "@/lib/config/site";

const REASONS = [
  {
    number: "01",
    title: "We're Based Here — Not a Franchise",
    description:
      "Our shop is at 18340 Yorba Linda Blvd. When you call us you're talking to someone who lives and works in Orange County, not a call center routing jobs to whoever's available.",
    accent: "blue",
  },
  {
    number: "02",
    title: "Same-Day, 7 Days a Week",
    description:
      "AC failures don't respect weekends. We schedule same-day appointments across Orange County and respond to emergencies on Sundays when most shops are closed.",
    accent: "copper",
  },
  {
    number: "03",
    title: "We Quote Before We Wrench",
    description:
      "You get a written estimate before we start any work. No surprise charges, no upsells for parts you don't need. The price we quote is the price you pay.",
    accent: "blue",
  },
  {
    number: "04",
    title: "All Major Brands Serviced",
    description:
      "Carrier, Trane, Lennox, Goodman, Rheem, Bryant, Mitsubishi, Daikin — we work on all of them. We stock common parts so most repairs don't need a second trip.",
    accent: "copper",
  },
  {
    number: "05",
    title: "We Treat Your Home With Respect",
    description:
      "Shoe covers on, tools off floors, workspace cleaned up before we leave. We know it's your home and we act accordingly on every job, every time.",
    accent: "blue",
  },
  {
    number: "06",
    title: "Parts & Labor Warranty",
    description:
      "Every repair and installation comes with clear warranty terms on both parts and labor. If something we fix fails, we come back and make it right.",
    accent: "copper",
  },
];

export default function WhyChooseUs() {
  return (
    <SectionWrapper className="bg-brand-mid" id="why-us">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="section-label section-label-white mb-4">Why Choose Us</span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4">
          A Local HVAC Company That Acts Like One
        </h2>
        <p className="text-slate-400 leading-relaxed">
          {SITE.name} is a local Orange County operation. No franchise fees, no national dispatch queues —
          just a local team that picks up the phone and shows up on time.
        </p>
      </div>

      {/* Reasons grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {REASONS.map((reason, i) => (
          <div
            key={reason.number}
            className={`card-navy group p-6 rounded-2xl flex flex-col gap-3 animate-fade-in-up stagger-${Math.min(i + 1, 6)}`}
          >
            <div className="flex items-center gap-3">
              <span className={`text-3xl font-black leading-none ${reason.accent === "copper" ? "text-copper-500/40" : "text-hvac-blue-600/40"}`}>
                {reason.number}
              </span>
              <div className={`h-px flex-1 ${reason.accent === "copper" ? "bg-copper-500/20" : "bg-hvac-blue-600/20"}`} />
            </div>
            <h3 className="text-white font-bold text-base leading-snug">{reason.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{reason.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
