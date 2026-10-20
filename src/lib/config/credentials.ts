/**
 * Business credentials the site may claim (Phase 2.3 P3).
 *
 * The owner confirmed on 2026-10-20 that the company is licensed and insured,
 * but asked not to publish the license number or policy details yet. California
 * rules decide what that allows:
 *
 *  - CSLB Advertising Guidelines (cslb.ca.gov, "Put your license number on all
 *    advertisements"), Business and Professions Code section 7030.5: licensed
 *    contractors must include the license number in all advertising, including
 *    websites. So "licensed" claims render only with cslbLicenseNumber.
 *  - Business and Professions Code section 7027.4(a): an advertisement may say
 *    the contractor is insured only if it names the type of insurance (for
 *    example general liability or workers' compensation). So "insured" claims
 *    render only with insuranceType.
 *
 * Fields:
 *  - cslbLicenseNumber: the CSLB license number, checked against the CSLB
 *    license lookup before it is entered here.
 *  - insuranceType: the coverage to name in "insured" claims, e.g.
 *    "General Liability". Policy numbers and amounts are never shown.
 *  - epaCertified: owner confirms technicians hold EPA Section 608 certification.
 *  - backgroundChecked: owner confirms every technician is background checked.
 *  - confirmedOn: ISO date the owner confirmed the values above.
 */
export const CREDENTIALS: {
  cslbLicenseNumber: string | null;
  insuranceType: string | null;
  epaCertified: boolean;
  backgroundChecked: boolean;
  confirmedOn: string | null;
} = {
  cslbLicenseNumber: null,
  insuranceType: null,
  epaCertified: false,
  backgroundChecked: false,
  confirmedOn: null,
};

/** "Insured (General Liability)", or null until the coverage type is confirmed. */
export function insuranceLabel(): string | null {
  return CREDENTIALS.insuranceType ? `Insured (${CREDENTIALS.insuranceType})` : null;
}

/** "Licensed & Insured", "Licensed" or null, following what is confirmed. */
export function licenseLabel(): string | null {
  if (!CREDENTIALS.cslbLicenseNumber) return null;
  return CREDENTIALS.insuranceType ? "Licensed & Insured" : "Licensed";
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
  { text: "Licensed & Insured / CSLB Certified", why: "owner confirms licensed and insured, but the license number and insurance type are not published; CSLB licenses contractors, it does not certify them" },
  { text: "EPA Certified / EPA-certified technicians", why: "no EPA Section 608 certification on file" },
  { text: "Background-checked team", why: "not confirmed by the owner" },
  { text: "We respond within 1 hour", why: "response-time promise, not confirmed" },
  { text: "Average arrival: typically 1-3 / 2-4 hours same day", why: "arrival-time statistic, no data source" },
  { text: "Call before noon / most calls get same-day service / We Fix It Today", why: "same-day rules, rates and completion promises; same-day availability itself is owner confirmed and stays" },
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
