import Link from "next/link";
import PhoneLink from "@/components/ui/PhoneLink";

type Props = {
  heading?: string;
  subtext?: string;
  primaryLabel?: string;
  primaryHref?: string;
  variant?: "blue" | "copper" | "dark";
};

export default function CtaSection({
  heading = "Ready to Schedule Service?",
  subtext = "Get a free estimate on AC repair, installation, or any HVAC service across Orange County.",
  primaryLabel = "Request a Free Estimate",
  primaryHref = "/contact",
  variant = "blue",
}: Props) {
  const bg =
    variant === "dark"
      ? "bg-slate-900"
      : variant === "copper"
      ? "bg-gradient-to-br from-copper-600 to-copper-800"
      : "bg-hvac-blue-700";

  const btnBg =
    variant === "dark"
      ? "bg-copper-gradient hover:opacity-90"
      : "bg-white text-hvac-blue-700 hover:bg-slate-100";

  const btnText = variant === "dark" ? "text-white" : "text-hvac-blue-700";

  return (
    <section className={`py-14 lg:py-20 ${bg}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center gap-6">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {heading}
        </h2>
        <p className="text-white/80 text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtext}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <Link
            href={primaryHref}
            className={`inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base transition-all ${btnBg} ${variant !== "dark" ? btnText : ""}`}
          >
            {primaryLabel}
          </Link>
          <PhoneLink
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-bold text-base border-2 border-white/30 text-white hover:border-white/70 transition-colors"
            showIcon
          />
        </div>
      </div>
    </section>
  );
}
