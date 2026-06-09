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

// Field length limits — defence against injection / oversized payloads
const LIMITS = {
  name: 100,
  phone: 30,
  email: 120,
  service: 80,
  address: 200,
  message: 1000,
  // honeypot fields must stay empty
};

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  address: string;
  propertyType: "residential" | "commercial" | "";
  isEmergency: boolean;
  interestedInFinancing: boolean;
  message: string;
  smsConsent: boolean;
  // honeypots — must stay empty
  website: string;
  faxNumber: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  address: "",
  propertyType: "",
  isEmergency: false,
  interestedInFinancing: false,
  message: "",
  smsConsent: false,
  website: "",
  faxNumber: "",
};

function sanitize(v: string, max: number): string {
  return v.slice(0, max);
}

function validateStep1(data: FormData): Errors {
  const errs: Errors = {};
  if (!data.name.trim()) errs.name = "Name is required.";
  if (!data.phone.trim()) errs.phone = "Phone number is required.";
  else if (!/^[\d\s()\-+]{7,}$/.test(data.phone)) errs.phone = "Enter a valid phone number.";
  if (!data.service) errs.service = "Please select a service.";
  return errs;
}

function validateStep2(data: FormData): Errors {
  const errs: Errors = {};
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = "Enter a valid email address.";
  if (!data.address.trim()) errs.address = "Service address is required.";
  else if (data.address.trim().length < 8) errs.address = "Enter your full address (street, city, ZIP).";
  return errs;
}

type Props = {
  variant?: "full" | "compact";
  heading?: string;
  subheading?: string;
};

export default function QuoteForm({
  variant = "full",
  heading = "Request a Free Estimate",
  subheading = "We'll respond within 1 hour during business hours.",
}: Props) {
  const id = useId();
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isCompact = variant === "compact";

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    // Apply char limits to string fields
    const limited =
      typeof value === "string" && key in LIMITS
        ? sanitize(value as string, LIMITS[key as keyof typeof LIMITS])
        : value;
    setData((prev) => ({ ...prev, [key]: limited }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function handleNextStep(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep1(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep(2);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validateStep2(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Bot check — honeypots must be empty
    if (data.website || data.faxNumber) {
      // Silently redirect without firing GTM event
      router.push("/thank-you");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        name: data.name,
        phone: data.phone,
        email: data.email,
        service: data.service,
        address: data.address,
        propertyType: data.propertyType,
        isEmergency: data.isEmergency,
        interestedInFinancing: data.interestedInFinancing,
        message: data.message,
        smsConsent: data.smsConsent,
        smsConsentText: data.smsConsent ? SMS_CONSENT_TEXT : "",
        smsConsentVersion: SMS_CONSENT_VERSION,
        submittedAt: new Date().toISOString(),
        website: data.website,
        faxNumber: data.faxNumber,
        pageUrl: typeof window !== "undefined" ? window.location.href : "",
      };
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) {
        setSubmitError(json.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      pushEvent("form filled");
      router.push("/thank-you");
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndicator = (
    <div className="flex items-center gap-2 mb-5" aria-label="Form progress">
      {[1, 2].map((s) => (
        <div key={s} className="flex items-center gap-2">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
              step === s
                ? "bg-hvac-blue-600 text-white"
                : step > s
                ? "bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-500"
            }`}
          >
            {step > s ? (
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            ) : s}
          </div>
          <span className={`text-xs font-medium ${step === s ? "text-slate-800" : "text-slate-400"}`}>
            {s === 1 ? "Your Info" : "Details"}
          </span>
          {s < 2 && <div className={`w-8 h-px ${step > 1 ? "bg-emerald-400" : "bg-slate-200"}`} />}
        </div>
      ))}
    </div>
  );

  /* ── Step 1 ─────────────────────────────────────────────────────────────── */
  if (step === 1) {
    return (
      <form onSubmit={handleNextStep} noValidate aria-label="Request a free HVAC estimate — step 1">
        {(heading || subheading) && (
          <div className="mb-5">
            {heading && <p className="font-bold text-slate-900 text-lg">{heading}</p>}
            {subheading && <p className="text-slate-500 text-sm mt-1">{subheading}</p>}
          </div>
        )}

        {stepIndicator}

        <div className={`grid gap-4 ${isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
          {/* Name */}
          <div>
            <label htmlFor={`${id}-name`} className="form-label">
              Full Name <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-name`}
              type="text"
              autoComplete="name"
              placeholder="Jane Smith"
              value={data.name}
              maxLength={LIMITS.name}
              onChange={(e) => set("name", e.target.value)}
              className={`form-field ${errors.name ? "form-field-error" : ""}`}
              aria-describedby={errors.name ? `${id}-name-err` : undefined}
              aria-required="true"
            />
            {errors.name && <p id={`${id}-name-err`} className="form-error-msg" role="alert">{errors.name}</p>}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor={`${id}-phone`} className="form-label">
              Phone Number <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <input
              id={`${id}-phone`}
              type="tel"
              autoComplete="tel"
              placeholder="(714) 555-0100"
              value={data.phone}
              maxLength={LIMITS.phone}
              onChange={(e) => set("phone", e.target.value)}
              className={`form-field ${errors.phone ? "form-field-error" : ""}`}
              aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
              aria-required="true"
            />
            {errors.phone && <p id={`${id}-phone-err`} className="form-error-msg" role="alert">{errors.phone}</p>}
          </div>

          {/* Service */}
          <div className={isCompact ? "" : "sm:col-span-2"}>
            <label htmlFor={`${id}-service`} className="form-label">
              Service Needed <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <select
              id={`${id}-service`}
              value={data.service}
              onChange={(e) => set("service", e.target.value)}
              className={`form-field ${errors.service ? "form-field-error" : ""}`}
              aria-describedby={errors.service ? `${id}-service-err` : undefined}
              aria-required="true"
            >
              <option value="">Select a service…</option>
              {SERVICES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            {errors.service && <p id={`${id}-service-err`} className="form-error-msg" role="alert">{errors.service}</p>}
          </div>
        </div>

        {/* Honeypot 1 — visually hidden */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
          <label htmlFor={`${id}-website`}>Website</label>
          <input
            id={`${id}-website`}
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={data.website}
            onChange={(e) => set("website", e.target.value)}
          />
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base"
          >
            Continue
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          <p className="text-center text-xs text-slate-400">
            Or call us directly:{" "}
            <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 font-semibold hover:underline">
              {SITE.phoneDisplay}
            </a>
          </p>
        </div>
      </form>
    );
  }

  /* ── Step 2 ─────────────────────────────────────────────────────────────── */
  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Request a free HVAC estimate — step 2">
      {(heading || subheading) && (
        <div className="mb-5">
          {heading && <p className="font-bold text-slate-900 text-lg">{heading}</p>}
          {subheading && <p className="text-slate-500 text-sm mt-1">{subheading}</p>}
        </div>
      )}

      {stepIndicator}

      {/* Step 1 summary */}
      <div className="mb-4 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 flex items-center justify-between">
        <div className="text-sm text-slate-700 truncate">
          <span className="font-semibold">{data.name}</span>
          <span className="text-slate-400 mx-1.5">·</span>
          <span>{data.phone}</span>
          <span className="text-slate-400 mx-1.5">·</span>
          <span>{data.service}</span>
        </div>
        <button
          type="button"
          onClick={() => setStep(1)}
          className="text-xs text-hvac-blue-600 hover:underline font-medium ml-2 shrink-0"
        >
          Edit
        </button>
      </div>

      <div className={`grid gap-4 ${isCompact ? "grid-cols-1" : "grid-cols-1 sm:grid-cols-2"}`}>
        {/* Email */}
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-email`} className="form-label">
            Email Address <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <input
            id={`${id}-email`}
            type="email"
            autoComplete="email"
            placeholder="jane@example.com"
            value={data.email}
            maxLength={LIMITS.email}
            onChange={(e) => set("email", e.target.value)}
            className={`form-field ${errors.email ? "form-field-error" : ""}`}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
          />
          {errors.email && <p id={`${id}-email-err`} className="form-error-msg" role="alert">{errors.email}</p>}
        </div>

        {/* Full Service Address */}
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-address`} className="form-label">
            Full Service Address <span className="text-red-500" aria-hidden="true">*</span>
          </label>
          <input
            id={`${id}-address`}
            type="text"
            autoComplete="street-address"
            placeholder="Enter your full service address (street, city, ZIP code)"
            value={data.address}
            maxLength={LIMITS.address}
            onChange={(e) => set("address", e.target.value)}
            className={`form-field ${errors.address ? "form-field-error" : ""}`}
            aria-describedby={`${id}-address-hint${errors.address ? ` ${id}-address-err` : ""}`}
            aria-required="true"
          />
          <p id={`${id}-address-hint`} className="mt-1 text-xs text-slate-400">
            This helps us confirm service availability and provide an accurate estimate.
          </p>
          {errors.address && <p id={`${id}-address-err`} className="form-error-msg" role="alert">{errors.address}</p>}
        </div>

        {/* Property type */}
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <fieldset>
            <legend className="form-label">Property Type</legend>
            <div className="flex gap-4 mt-1">
              {(["residential", "commercial"] as const).map((t) => (
                <label key={t} className="form-check text-sm text-slate-700 capitalize cursor-pointer">
                  <input
                    type="radio"
                    name={`${id}-property`}
                    value={t}
                    checked={data.propertyType === t}
                    onChange={() => set("propertyType", t)}
                  />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        {/* Checkboxes */}
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <div className="flex flex-col gap-2.5">
            <label className="form-check text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={data.isEmergency}
                onChange={(e) => set("isEmergency", e.target.checked)}
              />
              <span>
                <span className="font-semibold text-red-600">Emergency — </span>
                my AC / heat is completely out
              </span>
            </label>
            <label className="form-check text-sm text-slate-700 cursor-pointer">
              <input
                type="checkbox"
                checked={data.interestedInFinancing}
                onChange={(e) => set("interestedInFinancing", e.target.checked)}
              />
              I&rsquo;m interested in financing options
            </label>
          </div>
        </div>

        {/* Message */}
        <div className={isCompact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${id}-message`} className="form-label">
            Tell Us More <span className="text-slate-400 font-normal">(optional)</span>
          </label>
          <textarea
            id={`${id}-message`}
            rows={isCompact ? 3 : 4}
            placeholder="Describe what's happening with your system, when it started, your home size, or anything else that would help us prepare…"
            value={data.message}
            maxLength={LIMITS.message}
            onChange={(e) => set("message", e.target.value)}
            className="form-field resize-y"
          />
          <p className="mt-1 text-xs text-slate-400 text-right">
            {data.message.length}/{LIMITS.message}
          </p>
        </div>
      </div>

      {/* SMS consent — optional, unchecked by default */}
      <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-200">
        <SmsConsentCheckbox
          id={`${id}-sms-consent`}
          checked={data.smsConsent}
          onChange={(v) => set("smsConsent", v)}
        />
      </div>

      {/* Honeypot 1 — visually hidden */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={`${id}-website`}>Website</label>
        <input
          id={`${id}-website`}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={data.website}
          onChange={(e) => set("website", e.target.value)}
        />
      </div>

      {/* Honeypot 2 — fax number (bots fill it, humans never see it) */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <label htmlFor={`${id}-fax`}>Fax Number</label>
        <input
          id={`${id}-fax`}
          type="text"
          name="faxNumber"
          tabIndex={-1}
          autoComplete="off"
          value={data.faxNumber}
          onChange={(e) => set("faxNumber", e.target.value)}
        />
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-copper-gradient text-white font-bold rounded-xl shadow-glow-copper hover:opacity-90 active:scale-[0.98] transition-all text-base disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Submitting…
            </>
          ) : (
            "Send Request"
          )}
        </button>
        {submitError && (
          <p className="text-center text-sm text-red-600 font-medium" role="alert">
            {submitError}
          </p>
        )}
        <p className="text-center text-xs text-slate-400">
          Or call us directly:{" "}
          <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 font-semibold hover:underline">
            {SITE.phoneDisplay}
          </a>
        </p>
      </div>
    </form>
  );
}
