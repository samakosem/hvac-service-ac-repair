/**
 * Business credentials the site may claim (Phase 2.3 P3).
 *
 * Every value starts unconfirmed. A badge or line that names a credential
 * renders only after the owner confirms it here, the same way review figures
 * are gated in src/lib/content/reviews.ts.
 *
 *  - cslbLicenseNumber: California Contractors State License Board license
 *    number (C-20 for HVAC). California requires the number in all contractor
 *    advertising (Business and Professions Code section 7030.5), so "licensed"
 *    claims only render together with it.
 *  - insured: owner confirms current general liability insurance.
 *  - epaCertified: owner confirms the technicians hold EPA Section 608
 *    certification for refrigerant handling.
 *  - backgroundChecked: owner confirms every technician is background checked.
 *  - confirmedOn: ISO date the owner confirmed the values above.
 */
export const CREDENTIALS: {
  cslbLicenseNumber: string | null;
  insured: boolean;
  epaCertified: boolean;
  backgroundChecked: boolean;
  confirmedOn: string | null;
} = {
  cslbLicenseNumber: null,
  insured: false,
  epaCertified: false,
  backgroundChecked: false,
  confirmedOn: null,
};

/** "Licensed & Insured", "Licensed" or null, following what is confirmed. */
export function licenseLabel(): string | null {
  if (!CREDENTIALS.cslbLicenseNumber) return null;
  return CREDENTIALS.insured ? "Licensed & Insured" : "Licensed";
}

/** "CSLB Lic. #123456", or null until the number is confirmed. */
export function licenseNumberLabel(): string | null {
  return CREDENTIALS.cslbLicenseNumber ? `CSLB Lic. #${CREDENTIALS.cslbLicenseNumber}` : null;
}

/**
 * Trust claims removed in Phase 2.3 P3 because no source supported them.
 * Kept so the owner can confirm or reject each one; do not render these.
 */
export const REMOVED_UNVERIFIED_TRUST_CLAIMS = [
  { text: "Licensed & Insured / CSLB Certified", why: "no CSLB license number on file; CSLB licenses contractors, it does not certify them" },
  { text: "EPA Certified / EPA-certified technicians", why: "no EPA Section 608 certification on file" },
  { text: "Background-checked team", why: "not confirmed by the owner" },
  { text: "We respond within 1 hour", why: "response-time promise, not confirmed" },
  { text: "Average arrival: typically 1-3 / 2-4 hours same day", why: "arrival-time statistic, no data source" },
  { text: "Same-Day Service / Same-Day Availability / Call before noon", why: "same-day promise, not confirmed; 24/7 availability is confirmed and used instead" },
  { text: "Fully stocked vans / parts on the truck / most repairs on the first visit", why: "operational claims and first-visit rates, not confirmed" },
] as const;

/** Badge labels for confirmed credentials only, e.g. ["Licensed & Insured", "EPA Certified"]. */
export function credentialBadges(): string[] {
  return [licenseLabel(), CREDENTIALS.epaCertified ? "EPA Certified" : null].filter((b): b is string => b !== null);
}

/**
 * "Why choose us" card: the license card once the CSLB number is confirmed,
 * otherwise the owner-confirmed 24/7 availability.
 */
export function licenseOrHoursPoint(): { heading: string; body: string } {
  const number = licenseNumberLabel();
  if (number) {
    return { heading: licenseLabel() as string, body: `California contractor, ${number}.` };
  }
  return {
    heading: "Open 24 Hours, 7 Days a Week",
    body: "Call any time, day or night, including for emergency heating and cooling service.",
  };
}
