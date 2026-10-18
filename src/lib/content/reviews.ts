/**
 * Single source of truth for customer reviews shown anywhere on the site.
 *
 * Rules (see SEO_PHASE_2_AUDIT.md, section 4):
 *  - Only reviews a real customer posted on a public platform belong here.
 *  - Text is verbatim. Do not edit, shorten into new claims, or attribute a
 *    review to a city the customer did not name.
 *  - Never generate testimonials in templates. Pages that need social proof
 *    should read from this file.
 *
 * Status values:
 *  - "verified":    owner matched the review to its original Google review
 *                   and recorded the date in `verifiedOn`. Only these are
 *                   displayed (see isDisplayable).
 *  - "unconfirmed": copied from the Google Business Profile on 2026-07-13 (git
 *                   history) but not yet matched to its source. Not displayed.
 *  - "flagged":     needs owner review (e.g. written in the business voice).
 *                   Not displayed.
 *
 * `relativeDate` is the age Google showed when the text was copied on
 * REVIEWS_CAPTURED_ON. It is not updated automatically, so it goes stale.
 */

export type ReviewStatus = "verified" | "unconfirmed" | "flagged";

export type Review = {
  id: string;
  source: "google";
  reviewerName: string;
  initials: string;
  reviewerImage?: string;
  rating: number;
  reviewText: string;
  /** Age shown by Google on REVIEWS_CAPTURED_ON, e.g. "3 months ago". */
  relativeDate: string;
  googleReviewUrl?: string;
  status: ReviewStatus;
  /** ISO date the owner matched this review to the live profile. */
  verifiedOn?: string;
  note?: string;
};

/** Date the review text below was copied from Google (from git history). */
export const REVIEWS_CAPTURED_ON = "2026-07-13";

/** Public link to the Google Business Profile reviews. */
export const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA";

/**
 * Aggregate figures for any "X reviews" or star-rating claim on the site.
 * null means unknown: owner must read them off the live profile. Until all
 * three are set, verifiedReviewSummary() returns null and no page shows a
 * review count or average rating.
 */
export const REVIEW_PROFILE: {
  googleRatingValue: number | null;
  googleReviewCount: number | null;
  checkedOn: string | null;
} = {
  googleRatingValue: null,
  googleReviewCount: null,
  checkedOn: null,
};

/**
 * Rating claims the site displayed before 2026-10-18, removed because no
 * source supported them. Kept so the owner can check them against the live
 * profile; do not render these.
 */
export const REMOVED_UNVERIFIED_CLAIMS = [
  { text: "5.0 · 100+ Google reviews", where: "city service pages, Google Ads pages, /air-conditioning/ac-repair (367 pages)" },
  { text: "5-Star Rated", where: "Google Ads page trust badges (181 pages)" },
  { text: "5.0 on Google", where: "homepage reviews section" },
  { text: "5 star rating (star icons)", where: "homepage hero, next to \"500+ Local Homeowners\"" },
  { text: "5-Star Google Rated", where: "/orange-county-ac-repair \"why choose us\" card heading" },
] as const;

/** Rating and review count for display, or null until verified. */
export function verifiedReviewSummary(): { ratingValue: number; reviewCount: number; checkedOn: string } | null {
  const { googleRatingValue, googleReviewCount, checkedOn } = REVIEW_PROFILE;
  if (googleRatingValue === null || googleReviewCount === null || !checkedOn) return null;
  return { ratingValue: googleRatingValue, reviewCount: googleReviewCount, checkedOn };
}

export const REVIEWS: Review[] = [
  {
    id: "google-barel-ben-avi",
    source: "google",
    reviewerName: "Barel Ben avi",
    initials: "BB",
    rating: 5,
    reviewText:
      "I had a great experience with HVAC Service & AC Repair! From the first call to the final repair, everything was smooth and professional. The technician arrived on time, quickly diagnosed the issue, and explained everything clearly before starting the work.\n\nThe service was fast, honest, and the pricing was very fair. You can really tell they know what they’re doing. My system is now working perfectly!\n\nHighly recommend HVAC Service & AC Repair to anyone looking for reliable and professional HVAC service. Definitely a 5-star company!",
    relativeDate: "3 months ago",
    status: "unconfirmed",
  },
  {
    id: "google-eric-smith",
    source: "google",
    reviewerName: "Eric Smith",
    initials: "ES",
    rating: 5,
    reviewText:
      "Great service he fixed out AC super quick! David was very helpful and very affordable as well, I highly recommend",
    relativeDate: "3 months ago",
    status: "unconfirmed",
  },
  {
    id: "google-ron-b",
    source: "google",
    reviewerName: "Ron B",
    initials: "RB",
    rating: 5,
    reviewText:
      "Thank you for great repair at late hour, we are happy with the price and fast servic",
    relativeDate: "2 months ago",
    status: "unconfirmed",
  },
  {
    id: "google-etay-amit",
    source: "google",
    reviewerName: "etay amit",
    initials: "EA",
    rating: 5,
    reviewText:
      "Thank you for helping during this hot day so quickly and walking me through the prices, great prices too.",
    relativeDate: "3 months ago",
    status: "unconfirmed",
  },
  {
    id: "google-wiwin-syabilla",
    source: "google",
    reviewerName: "WIWIN SYABILLA",
    initials: "WS",
    rating: 5,
    reviewText:
      "Friendly staff and competitive pricing. What more could you ask for.",
    relativeDate: "a month ago",
    status: "unconfirmed",
  },
  {
    id: "google-jack-costa",
    source: "google",
    reviewerName: "Jack Costa",
    initials: "JC",
    rating: 5,
    reviewText:
      "Impressed with their prompt service and quality workmanship!",
    relativeDate: "a month ago",
    status: "unconfirmed",
  },
  {
    id: "google-shai",
    source: "google",
    reviewerName: "shai",
    initials: "S",
    rating: 5,
    reviewText:
      "I had an excellent experience with my AC technician! He was incredibly professional, courteous, and his prices were more than fair. I will definitely be calling him again for any future needs. Highly recommend!",
    relativeDate: "2 months ago",
    status: "unconfirmed",
  },
  {
    id: "google-bradley-a-wilson",
    source: "google",
    reviewerName: "Bradley A. Wilson",
    initials: "BW",
    rating: 5,
    reviewText:
      "Excellent service is provided by HVAC Service & AC Repair. We requested an A/C repair from them. Adam, their technician, showed up within the allotted time frame. He was well-mannered, extremely competent, and swift in identifying the problem and its solution. We heartily suggest Air Professionals based on our prior usage of them.",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-john-f-cipriano",
    source: "google",
    reviewerName: "John F. Cipriano",
    initials: "JC",
    rating: 5,
    reviewText:
      "The technicians who came to fix my boiler have been extremely professional and very beneficial. They defined what my heating troubles had been and what had to be fixed and did not pressure me to buy the element wanted. They have been very personable and pleasant and showed up quickly on short be aware before they have been going home. I am very grateful for them and could name them once more for my heating and A/C desires!",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-verney-gour",
    source: "google",
    reviewerName: "Verney Gour",
    initials: "VG",
    rating: 5,
    reviewText:
      "I needed my office A/C and filters checked in preparation for summer. Tony came over and he was very professional, knowledgeable, and took care of all our concerns. I highly recommend and will be using this company from here on.",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-emely-sheppard",
    source: "google",
    reviewerName: "Emely Sheppard",
    initials: "ES",
    rating: 5,
    reviewText:
      "This company did very good job to removed old Heating system and installed a new Lenox HVAC system in two working days. We had installation technicians Ernie, Jonathan & David who had very well knowledgeable about the job and did very good.",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-chandrappa-chandru",
    source: "google",
    reviewerName: "Chandrappa Chandru",
    initials: "CC",
    rating: 5,
    reviewText:
      "Fixed my A/C asap! Was able to identify the problem and fix it very quickly.",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-liel-levi",
    source: "google",
    reviewerName: "Liel Levi",
    initials: "LL",
    rating: 5,
    reviewText:
      "Amazing service best price very professional and quick",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-ofek-cohen",
    source: "google",
    reviewerName: "Ofek Cohen",
    initials: "OC",
    rating: 5,
    reviewText:
      "Thx for good service, highly recommend!!",
    relativeDate: "2 years ago",
    status: "unconfirmed",
  },
  {
    id: "google-yan-yau-fung",
    source: "google",
    reviewerName: "YAN YAU FUNG",
    initials: "YY",
    rating: 5,
    reviewText:
      "Breathe easy with our AC maintenance plans! Regular tune-ups ensure efficient performance and extend your system's lifespan.",
    relativeDate: "a month ago",
    status: "flagged",
    note: "Written in the business voice (\"our technicians\", \"contact us\"), not a customer describing a job. Owner to confirm on the Google Business Profile before it stays on the site.",
  },
  {
    id: "google-hotaru-tashiro",
    source: "google",
    reviewerName: "HOTARU TASHIRO",
    initials: "HT",
    rating: 5,
    reviewText:
      "Beat the heat! Our expert technicians provide prompt and reliable AC repair services to keep you cool and comfortabl",
    relativeDate: "a month ago",
    status: "flagged",
    note: "Written in the business voice (\"our technicians\", \"contact us\"), not a customer describing a job. Owner to confirm on the Google Business Profile before it stays on the site.",
  },
  {
    id: "google-yin-fei-chan",
    source: "google",
    reviewerName: "YIN FEI CHAN",
    initials: "YC",
    rating: 5,
    reviewText:
      "Cool comfort guaranteed! Contact us for same-day AC repair and emergency services.",
    relativeDate: "a month ago",
    status: "flagged",
    note: "Written in the business voice (\"our technicians\", \"contact us\"), not a customer describing a job. Owner to confirm on the Google Business Profile before it stays on the site.",
  },
  {
    id: "google-chun-yiu-chiu",
    source: "google",
    reviewerName: "CHUN YIU CHIU",
    initials: "CC",
    rating: 5,
    reviewText:
      "From installation to repair, we've got you covered! Trust our experts for all your HVAC needs.",
    relativeDate: "a month ago",
    status: "flagged",
    note: "Written in the business voice (\"our technicians\", \"contact us\"), not a customer describing a job. Owner to confirm on the Google Business Profile before it stays on the site.",
  },
];

/** A review may be shown on the site only once the owner has verified it. */
export function isDisplayable(review: Review): boolean {
  return review.status === "verified" && Boolean(review.verifiedOn);
}

export const DISPLAYABLE_REVIEWS: Review[] = REVIEWS.filter(isDisplayable);
