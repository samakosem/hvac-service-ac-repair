type TrustBadgesProps = {
  variant?: "dark" | "light";
  className?: string;
};

const BADGES = [
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    label: "Licensed & Insured",
    sublabel: "State of California",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
    label: "EPA Certified",
    sublabel: "Refrigerant Handling",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    label: "Same-Day Service",
    sublabel: "7 Days a Week",
  },
  {
    icon: (
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    label: "Local Yorba Linda Team",
    sublabel: "Southern California",
  },
];

export default function TrustBadges({ variant = "dark", className = "" }: TrustBadgesProps) {
  const isDark = variant === "dark";

  return (
    <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
      {BADGES.map((badge) => (
        <div
          key={badge.label}
          className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm ${
            isDark
              ? "bg-white/6 border border-white/10 text-white"
              : "bg-slate-50 border border-slate-200 text-slate-700 shadow-sm"
          }`}
        >
          <span className={isDark ? "text-hvac-blue-400" : "text-hvac-blue-600"}>
            {badge.icon}
          </span>
          <span>
            <span className="font-semibold text-xs">{badge.label}</span>
            {badge.sublabel && (
              <span className={`block text-[11px] leading-none mt-0.5 ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                {badge.sublabel}
              </span>
            )}
          </span>
        </div>
      ))}
    </div>
  );
}
