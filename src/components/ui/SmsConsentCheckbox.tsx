"use client";

export const SMS_CONSENT_TEXT =
  "By checking this box, I agree to receive SMS text messages from HVAC Service & AC Repair at the phone number provided, including appointment confirmations, appointment reminders, technician arrival updates, and service-related updates. Message frequency varies. Message & data rates may apply. Reply STOP to opt out at any time. Reply HELP for assistance. Consent is not required to receive services.";

export const SMS_CONSENT_VERSION = "2026-06-a2p-10dlc-v3";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  variant?: "light" | "dark";
  error?: string;
};

export default function SmsConsentCheckbox({ checked, onChange, id, variant = "light", error }: Props) {
  const textCls =
    variant === "dark"
      ? "text-slate-300 leading-snug"
      : "text-slate-600 leading-snug";

  const linkCls =
    variant === "dark"
      ? "underline hover:text-copper-400"
      : "underline hover:text-copper-600";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-start gap-2.5">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-copper-600 focus:ring-copper-500 cursor-pointer"
          aria-describedby={`${id}-desc`}
        />
        <label htmlFor={id} className={`text-xs ${textCls} cursor-pointer`} id={`${id}-desc`}>
          By checking this box, I agree to receive SMS text messages from HVAC Service &amp; AC
          Repair at the phone number provided, including appointment confirmations, appointment
          reminders, technician arrival updates, and service-related updates. Message frequency
          varies. Message &amp; data rates may apply. Reply STOP to opt out at any time. Reply HELP
          for assistance. Consent is not required to receive services. View our{" "}
          <a
            href="https://www.hvacserviceacrepair.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            Privacy Policy
          </a>{" "}
          and{" "}
          <a
            href="https://www.hvacserviceacrepair.com/terms"
            target="_blank"
            rel="noopener noreferrer"
            className={linkCls}
          >
            Terms of Service
          </a>
          .
        </label>
      </div>
      {error && (
        <p className="text-xs text-red-500 font-medium pl-6" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
