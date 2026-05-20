"use client";

import { useState, useId } from "react";
import { SITE } from "@/lib/config/site";
import { SERVICE_AREA_COUNTIES } from "@/lib/config/locations";

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

type FormData = {
  name: string;
  phone: string;
  email: string;
  service: string;
  county: string;
  city: string;
  propertyType: "residential" | "commercial" | "";
  isEmergency: boolean;
  interestedInFinancing: boolean;
  message: string;
  website: string; // honeypot — must stay empty
};

type Errors = Partial<Record<keyof FormData, string>>;

const EMPTY: FormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  county: "",
  city: "",
  propertyType: "",
  isEmergency: false,
  interestedInFinancing: false,
  message: "",
  website: "",
};

function validate(data: FormData): Errors {
  const errs: Errors = {};
  if (!data.name.trim()) errs.name = "Name is required.";
  if (!data.phone.trim()) errs.phone = "Phone number is required.";
  else if (!/^[\d\s()\-+]{7,}$/.test(data.phone)) errs.phone = "Enter a valid phone number.";
  if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errs.email = "Enter a valid email address.";
  if (!data.service) errs.service = "Please select a service.";
  return errs;
}

type Props = {
  /** Compact mode for sidebars; full mode for dedicated contact page */
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
  const [data, setData] = useState<FormData>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isCompact = variant === "compact";

  // Derive available cities from selected county
  const countyObj = SERVICE_AREA_COUNTIES.find((c) => c.slug === data.county);
  const availableCities = countyObj?.cities ?? [];

  function set<K extends keyof FormData>(key: K, value: FormData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate(data);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        ...data,
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
      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center flex flex-col items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center">
          <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <p className="font-bold text-slate-900 text-lg">Request Received</p>
          <p className="text-slate-600 text-sm mt-1 max-w-sm">
            We&rsquo;ll be in touch shortly. For immediate help, call us directly at{" "}
            <a href={`tel:${SITE.phone}`} className="text-hvac-blue-600 font-semibold hover:underline">
              {SITE.phoneDisplay}
            </a>.
          </p>
        </div>
        <button
          onClick={() => { setData(EMPTY); setSubmitted(false); setErrors({}); }}
          className="text-sm text-slate-500 hover:text-slate-700 underline transition-colors"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Request a free HVAC estimate">
      {(heading || subheading) && (
        <div className="mb-6">
          {heading && <p className="font-bold text-slate-900 text-lg">{heading}</p>}
          {subheading && <p className="text-slate-500 text-sm mt-1">{subheading}</p>}
        </div>
      )}

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
            onChange={(e) => set("phone", e.target.value)}
            className={`form-field ${errors.phone ? "form-field-error" : ""}`}
            aria-describedby={errors.phone ? `${id}-phone-err` : undefined}
            aria-required="true"
          />
          {errors.phone && <p id={`${id}-phone-err`} className="form-error-msg" role="alert">{errors.phone}</p>}
        </div>

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
            onChange={(e) => set("email", e.target.value)}
            className={`form-field ${errors.email ? "form-field-error" : ""}`}
            aria-describedby={errors.email ? `${id}-email-err` : undefined}
          />
          {errors.email && <p id={`${id}-email-err`} className="form-error-msg" role="alert">{errors.email}</p>}
        </div>

        {/* Service selector */}
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

        {/* County + City (hidden in compact) */}
        {!isCompact && (
          <>
            <div>
              <label htmlFor={`${id}-county`} className="form-label">County</label>
              <select
                id={`${id}-county`}
                value={data.county}
                onChange={(e) => { set("county", e.target.value); set("city", ""); }}
                className="form-field"
              >
                <option value="">Select county…</option>
                {SERVICE_AREA_COUNTIES.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor={`${id}-city`} className="form-label">City</label>
              <select
                id={`${id}-city`}
                value={data.city}
                onChange={(e) => set("city", e.target.value)}
                disabled={!data.county}
                className="form-field disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">
                  {data.county ? "Select city…" : "Select county first"}
                </option>
                {availableCities.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

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
            onChange={(e) => set("message", e.target.value)}
            className="form-field resize-y"
          />
        </div>
      </div>

      {/* Honeypot — visually hidden, must stay empty */}
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
