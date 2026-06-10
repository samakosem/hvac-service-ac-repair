"use client";

import { useState, useId } from "react";
import { useRouter } from "next/navigation";
import { SITE } from "@/lib/config/site";
import { pushEvent } from "@/lib/gtm";
import SmsConsentCheckbox, { SMS_CONSENT_TEXT, SMS_CONSENT_VERSION } from "@/components/ui/SmsConsentCheckbox";

const SERVICES = [
  "AC Repair",
  "AC Installation / Replacement",
  "AC Maintenance / Tune-Up",
  "Emergency AC Repair",
  "Heating / Furnace Repair",
  "Furnace Installation",
  "Ductless Mini-Split",
  "Heat Pump Service",
  "Air Duct Cleaning",
  "Commercial HVAC",
  "Maintenance Plan",
  "Not Sure — Need Diagnosis",
];

const LIMITS: Partial<Record<keyof FormData, number>> = { name: 100, phone: 30, service: 80, address: 200, website: 1, faxNumber: 1 };

type FormData = {
  name: string;
  phone: string;
  service: string;
  address: string;
  smsConsent: boolean;
  website: string;
  faxNumber: string;
};

type Errors = Partial<Record<"name" | "phone" | "service" | "address", string>>;

const EMPTY: FormData = { name: "", phone: "", service: "", address: "", smsConsent: false, website: "", faxNumber: "" };

function sanitize(v: string, max: number) {
  return v.slice(0, max);
}

type Props = {
  heading?: string;
  subheading?: string;
  ctaLabel?: string;
  defaultService?: string;
  variant?: "light" | "dark";
};

export default function SingleStepQuoteForm({
  heading,
  subheading,
  ctaLabel = "Get Same-Day Service",
  defaultService = "",
  variant = "light",
}: Props) {
  const id = useId();
  const router = useRouter();
  const [data, setData] = useState<FormData>({ ...EMPTY, service: defaultService });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function set<K extends keyof FormData>(key: K, value: string) {
    const limited = sanitize(value, LIMITS[key] ?? 200);
    setData((prev) => ({ ...prev, [key]: limited }));
    if (key in errors) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): Errors {
    const errs: Errors = {};
    if (!data.name.trim()) errs.name = "Name is required.";
    if (!data.phone.trim()) errs.phone = "Phone number is required.";
    else if (!/^[\d\s()\-+]{7,}$/.test(data.phone)) errs.phone = "Enter a valid phone number.";
    if (!data.service) errs.service = "Please select a service.";
    if (!data.address.trim() || data.address.trim().length < 8) errs.address = "Enter your full service address (street, city, ZIP).";
    return errs;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    if (data.website || data.faxNumber) { router.push("/thank-you"); return; }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          phone: data.phone,
          service: data.service,
          address: data.address,
          smsConsent: data.smsConsent,
          smsConsentText: data.smsConsent ? SMS_CONSENT_TEXT : "",
          smsConsentVersion: SMS_CONSENT_VERSION,
          submittedAt: new Date().toISOString(),
          website: data.website,
          faxNumber: data.faxNumber,
          pageUrl: typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const json = await res.json();
      if (!res.ok) { setSubmitError(json.error ?? "Something went wrong. Please try again."); setSubmitting(false); return; }
      pushEvent("form filled");
      router.push("/thank-you");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const labelCls = variant === "dark" ? "text-slate-200 text-sm font-medium mb-1 block" : "form-label";
  const fieldCls = variant === "dark"
    ? "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-copper-400 text-sm"
    : "form-field";

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Request same-day HVAC service">
      {(heading || subheading) && (
        <div className="mb-4">
          {heading && <p className={`font-bold text-lg ${variant === "dark" ? "text-white" : "text-slate-900"}`}>{heading}</p>}
          {subheading && <p className={`text-sm mt-1 ${variant === "dark" ? "text-slate-300" : "text-slate-500"}`}>{subheading}</p>}
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* Name */}
        <div>
          <label htmlFor={`${id}-name`} className={labelCls}>
            Full Name <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-name`}
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={data.name}
            maxLength={LIMITS.name}
            onChange={(e) => set("name", e.target.value)}
            className={`${fieldCls} ${errors.name ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1" role="alert">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor={`${id}-phone`} className={labelCls}>
            Phone Number <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-phone`}
            type="tel"
            autoComplete="tel"
            placeholder="(714) 555-0100"
            value={data.phone}
            maxLength={LIMITS.phone}
            onChange={(e) => set("phone", e.target.value)}
            className={`${fieldCls} ${errors.phone ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{errors.phone}</p>}
        </div>

        {/* Service */}
        <div>
          <label htmlFor={`${id}-service`} className={labelCls}>
            Service Needed <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <select
            id={`${id}-service`}
            value={data.service}
            onChange={(e) => set("service", e.target.value)}
            className={`${fieldCls} ${errors.service ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
          >
            <option value="">Select a service…</option>
            {SERVICES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          {errors.service && <p className="text-red-500 text-xs mt-1" role="alert">{errors.service}</p>}
        </div>

        {/* Address */}
        <div>
          <label htmlFor={`${id}-address`} className={labelCls}>
            Service Address <span className="text-red-400" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-address`}
            type="text"
            autoComplete="street-address"
            placeholder="123 Main St, Anaheim, CA 92801"
            value={data.address}
            maxLength={LIMITS.address}
            onChange={(e) => set("address", e.target.value)}
            className={`${fieldCls} ${errors.address ? "border-red-400 focus:ring-red-400" : ""}`}
            aria-required="true"
          />
          {errors.address && <p className="text-red-500 text-xs mt-1" role="alert">{errors.address}</p>}
        </div>

        {/* SMS consent — optional, unchecked by default */}
        <div className={`p-3 rounded-xl border ${variant === "dark" ? "bg-white/5 border-white/15" : "bg-slate-50 border-slate-200"}`}>
          <SmsConsentCheckbox
            id={`${id}-sms-consent`}
            checked={data.smsConsent}
            onChange={(v) => {
              setData((prev) => ({ ...prev, smsConsent: v }));
            }}
            variant={variant}
          />
        </div>

        {/* Honeypots */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <input id={`${id}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
          <input id={`${id}-fax`} type="text" name="faxNumber" tabIndex={-1} autoComplete="off" value={data.faxNumber} onChange={(e) => set("faxNumber", e.target.value)} />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed mt-1"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting…
            </>
          ) : ctaLabel}
        </button>

        {submitError && <p className="text-center text-sm text-red-500 font-medium" role="alert">{submitError}</p>}

        <p className={`text-center text-xs ${variant === "dark" ? "text-slate-400" : "text-slate-400"}`}>
          Or call:{" "}
          <a href={`tel:${SITE.phone}`} className="text-copper-400 font-semibold hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
