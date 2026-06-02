import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";

type Props = {
  city?: string;
  variant?: "banner" | "card";
};

export default function EmergencyCallout({ city, variant = "banner" }: Props) {
  const location = city ? `in ${city}` : "across Orange County";

  if (variant === "card") {
    return (
      <div className="rounded-2xl bg-red-50 border border-red-200 p-6 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-3 w-3 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
          </span>
          <p className="font-bold text-red-700 text-sm uppercase tracking-wide">
            AC / Heat Emergency?
          </p>
        </div>
        <p className="text-red-700 text-sm leading-relaxed">
          System completely out? We offer same-day emergency service {location} — a real person answers your call.
        </p>
        <a
          href={`tel:${SITE.phone}`}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700 active:scale-[0.98] transition-all"
          aria-label={`Emergency call ${SITE.phoneDisplay}`}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
          </svg>
          Call Now — {SITE.phoneDisplay}
        </a>
        <p className="text-red-500 text-xs">
          Same-day availability · 7 days a week · Real person answers
        </p>
      </div>
    );
  }

  return (
    <div className="bg-red-600 py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white text-sm text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <p className="font-semibold">
            <strong>AC not cooling?</strong>{" "}
            Same-day emergency HVAC service available {location}.
          </p>
        </div>
        <PhoneLink
          className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 font-bold text-white text-sm transition-colors shrink-0 whitespace-nowrap"
          showIcon
          label={`Call ${SITE.phoneDisplay}`}
        />
      </div>
    </div>
  );
}
