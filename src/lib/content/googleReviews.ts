/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GOOGLE REVIEWS — real customer reviews for the homepage carousel
 * ─────────────────────────────────────────────────────────────────────────────
 *
 *  ⚠️  THE ENTRIES BELOW ARE PLACEHOLDERS. REPLACE THEM WITH YOUR REAL REVIEWS.
 *
 *  Google Maps loads reviews with JavaScript, so they can't be scraped
 *  automatically. Open your Google Business Profile and copy each real
 *  5-star review into the array below.
 *
 *  Your reviews page:
 *  https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA
 *  → click the reviews tab, filter/scroll to your 5-star reviews.
 *
 *  HOW TO ADD / EDIT / REMOVE A REVIEW
 *  -----------------------------------
 *  Each review is one object in the GOOGLE_REVIEWS array. To ADD one, copy a
 *  block and fill it in. To REMOVE one, delete its block. To EDIT, change the
 *  fields. Only include real 5-star reviews (the carousel shows rating === 5).
 *
 *  FIELDS
 *  ------
 *  reviewerName    string   — exactly as shown on Google.
 *  initials        string   — 1–2 letters, used when no photo (e.g. "JD").
 *  reviewerImage   string?  — optional. Leave undefined to show the initials
 *                             avatar. If you use a photo, download it to
 *                             /public/images/reviews/ and set e.g.
 *                             "/images/reviews/jane.jpg". (Do NOT hotlink the
 *                             Google-hosted avatar URL — it expires.)
 *  rating          number   — should be 5 (only 5-star reviews are shown).
 *  reviewText      string   — the full review text, verbatim.
 *  reviewDate      string   — the age Google shows, e.g. "3 months ago".
 *  googleReviewUrl string?  — optional deep link to the review, else falls back
 *                             to GOOGLE_PROFILE_URL for the "Read more" link.
 */

export type GoogleReview = {
  reviewerName: string;
  initials: string;
  reviewerImage?: string;
  rating: number;
  reviewText: string;
  reviewDate: string;
  googleReviewUrl?: string;
};

/** Public link to the full Google Business Profile / reviews. */
export const GOOGLE_PROFILE_URL = "https://maps.app.goo.gl/q3tdaVN6JDbXpVPKA";

/**
 * Set to `true` once you have pasted your REAL reviews below and deleted the
 * placeholders. While `false`, the carousel renders a "reviews coming soon"
 * state instead of showing placeholder content in production.
 */
export const REVIEWS_ARE_REAL = true;

// Real 5-star reviews from the Google Business Profile. Text is verbatim —
// small spelling issues are kept intentionally to stay authentic. Do not rewrite.
export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    reviewerName: "Barel Ben avi",
    initials: "BB",
    rating: 5,
    reviewDate: "3 months ago",
    reviewText:
      "I had a great experience with HVAC Service & AC Repair! From the first call to the final repair, everything was smooth and professional. The technician arrived on time, quickly diagnosed the issue, and explained everything clearly before starting the work.\n\nThe service was fast, honest, and the pricing was very fair. You can really tell they know what they’re doing. My system is now working perfectly!\n\nHighly recommend HVAC Service & AC Repair to anyone looking for reliable and professional HVAC service. Definitely a 5-star company!",
  },
  {
    reviewerName: "Eric Smith",
    initials: "ES",
    rating: 5,
    reviewDate: "3 months ago",
    reviewText:
      "Great service he fixed out AC super quick! David was very helpful and very affordable as well, I highly recommend",
  },
  {
    reviewerName: "Ron B",
    initials: "RB",
    rating: 5,
    reviewDate: "2 months ago",
    reviewText:
      "Thank you for great repair at late hour, we are happy with the price and fast servic",
  },
  {
    reviewerName: "etay amit",
    initials: "EA",
    rating: 5,
    reviewDate: "3 months ago",
    reviewText:
      "Thank you for helping during this hot day so quickly and walking me through the prices, great prices too.",
  },
  {
    reviewerName: "WIWIN SYABILLA",
    initials: "WS",
    rating: 5,
    reviewDate: "a month ago",
    reviewText:
      "Friendly staff and competitive pricing. What more could you ask for.",
  },
  {
    reviewerName: "Jack Costa",
    initials: "JC",
    rating: 5,
    reviewDate: "a month ago",
    reviewText: "Impressed with their prompt service and quality workmanship!",
  },
  {
    reviewerName: "shai",
    initials: "S",
    rating: 5,
    reviewDate: "2 months ago",
    reviewText:
      "I had an excellent experience with my AC technician! He was incredibly professional, courteous, and his prices were more than fair. I will definitely be calling him again for any future needs. Highly recommend!",
  },
  {
    reviewerName: "Bradley A. Wilson",
    initials: "BW",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText:
      "Excellent service is provided by HVAC Service & AC Repair. We requested an A/C repair from them. Adam, their technician, showed up within the allotted time frame. He was well-mannered, extremely competent, and swift in identifying the problem and its solution. We heartily suggest Air Professionals based on our prior usage of them.",
  },
  {
    reviewerName: "John F. Cipriano",
    initials: "JC",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText:
      "The technicians who came to fix my boiler have been extremely professional and very beneficial. They defined what my heating troubles had been and what had to be fixed and did not pressure me to buy the element wanted. They have been very personable and pleasant and showed up quickly on short be aware before they have been going home. I am very grateful for them and could name them once more for my heating and A/C desires!",
  },
  {
    reviewerName: "Verney Gour",
    initials: "VG",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText:
      "I needed my office A/C and filters checked in preparation for summer. Tony came over and he was very professional, knowledgeable, and took care of all our concerns. I highly recommend and will be using this company from here on.",
  },
  {
    reviewerName: "Emely Sheppard",
    initials: "ES",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText:
      "This company did very good job to removed old Heating system and installed a new Lenox HVAC system in two working days. We had installation technicians Ernie, Jonathan & David who had very well knowledgeable about the job and did very good.",
  },
  {
    reviewerName: "Chandrappa Chandru",
    initials: "CC",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText:
      "Fixed my A/C asap! Was able to identify the problem and fix it very quickly.",
  },
  {
    reviewerName: "Liel Levi",
    initials: "LL",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText: "Amazing service best price very professional and quick",
  },
  {
    reviewerName: "Ofek Cohen",
    initials: "OC",
    rating: 5,
    reviewDate: "2 years ago",
    reviewText: "Thx for good service, highly recommend!!",
  },
  {
    reviewerName: "YAN YAU FUNG",
    initials: "YY",
    rating: 5,
    reviewDate: "a month ago",
    reviewText:
      "Breathe easy with our AC maintenance plans! Regular tune-ups ensure efficient performance and extend your system's lifespan.",
  },
  {
    reviewerName: "HOTARU TASHIRO",
    initials: "HT",
    rating: 5,
    reviewDate: "a month ago",
    reviewText:
      "Beat the heat! Our expert technicians provide prompt and reliable AC repair services to keep you cool and comfortabl",
  },
  {
    reviewerName: "YIN FEI CHAN",
    initials: "YC",
    rating: 5,
    reviewDate: "a month ago",
    reviewText:
      "Cool comfort guaranteed! Contact us for same-day AC repair and emergency services.",
  },
  {
    reviewerName: "CHUN YIU CHIU",
    initials: "CC",
    rating: 5,
    reviewDate: "a month ago",
    reviewText:
      "From installation to repair, we've got you covered! Trust our experts for all your HVAC needs.",
  },
];

/** Only 5-star reviews are shown in the carousel. */
export const FIVE_STAR_REVIEWS = GOOGLE_REVIEWS.filter((r) => r.rating === 5);
