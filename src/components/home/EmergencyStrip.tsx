import PhoneLink from "@/components/ui/PhoneLink";
import { SITE } from "@/lib/config/site";

export default function EmergencyStrip() {
  return (
    <div className="bg-emergency-strip py-3.5 px-4">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-white text-sm text-center sm:text-left">
        <div className="flex items-center gap-3 flex-wrap justify-center sm:justify-start">
          {/* Pulsing dot */}
          <span className="relative flex h-2.5 w-2.5 shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-white opacity-75"
              style={{ animation: "pulse-ring 1.4s cubic-bezier(0.215,0.61,0.355,1) infinite" }}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white" />
          </span>
          <p>
            <strong>AC not cooling this summer?</strong>{" "}
            Same-day emergency HVAC service available for homeowners and businesses nearby.
          </p>
          <span className="hidden sm:inline text-white/40">·</span>
          <span className="text-white/80 text-xs">Real people answer — no voicemail</span>
        </div>
        <PhoneLink
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 border border-white/30 font-bold text-white text-sm transition-colors shrink-0 whitespace-nowrap"
          showIcon
          label={`Call ${SITE.phoneDisplay}`}
        />
      </div>
    </div>
  );
}
