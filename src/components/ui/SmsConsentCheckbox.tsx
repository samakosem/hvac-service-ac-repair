"use client";

import Link from "next/link";

export const SMS_CONSENT_TEXT =
  "I agree to receive SMS text messages from HVAC Service & AC Repair about my HVAC service request, appointment scheduling, confirmations, reminders, and service follow-ups. Message frequency varies, up to 4 messages per month. Message and data rates may apply. Reply STOP to unsubscribe and HELP for help. Consent is not a condition of purchase. View our Privacy Policy and Terms of Service.";

export const SMS_CONSENT_VERSION = "2026-06-a2p-10dlc-v1";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  id: string;
  variant?: "light" | "dark";
};

export default function SmsConsentCheckbox({ checked, onChange, id, variant = "light" }: Props) {
  const textCls =
    variant === "dark"
      ? "text-slate-400 leading-snug"
      : "text-slate-500 leading-snug";

  return (
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
        I agree to receive SMS text messages from HVAC Service &amp; AC Repair about my HVAC
        service request, appointment scheduling, confirmations, reminders, and service
        follow-ups. Message frequency varies, up to 4 messages per month. Message and data
        rates may apply. Reply STOP to unsubscribe and HELP for help. Consent is not a
        condition of purchase. View our{" "}
        <Link href="/privacy-policy" className="underline hover:text-copper-500">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="underline hover:text-copper-500">
          Terms of Service
        </Link>
        .
      </label>
    </div>
  );
}
