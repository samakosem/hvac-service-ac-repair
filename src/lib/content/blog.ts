export type BlogSection = {
  heading: string;
  body: string;
};

export type BlogFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  author: string;
  readingTime: number;
  relatedServices: { label: string; href: string }[];
  faqs: BlogFaq[];
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    title: "AC Repair vs. AC Replacement: How to Decide",
    slug: "ac-repair-vs-replacement",
    date: "2025-06-10",
    category: "AC Tips",
    excerpt:
      "Facing a broken AC and not sure whether to fix it or replace it? Here's a practical framework Orange County homeowners use to make the right call — without overpaying.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 7,
    relatedServices: [
      { label: "AC Repair", href: "/air-conditioning/ac-repair" },
      { label: "AC Replacement", href: "/air-conditioning/ac-replacement" },
      { label: "AC Installation", href: "/air-conditioning/ac-installation" },
    ],
    faqs: [
      {
        question: "What is the 50% rule for AC repair vs. replacement?",
        answer:
          "If the cost of a repair exceeds 50% of the price of a new system, most HVAC professionals recommend replacement. For example, if a new 3-ton AC costs $6,000 installed, a repair that quotes over $3,000 is generally not worth it — especially on a system more than 10 years old.",
      },
      {
        question: "How long does a central AC system last in Southern California?",
        answer:
          "Most central AC systems in Orange County last 12–18 years. Heat, dust, and year-round use accelerate wear compared to cooler climates. A system past 15 years that requires a major repair is usually a replacement candidate.",
      },
      {
        question: "Does a new AC system save money on electricity?",
        answer:
          "Yes. Replacing a 10-SEER system from 2010 with a modern 16–18 SEER2 unit can cut cooling costs 30–50%. In Southern California summers where AC runs 6+ months, that difference compounds quickly.",
      },
      {
        question: "What AC repairs are almost always worth doing?",
        answer:
          "Refrigerant recharges (if no leak), capacitor and contactor replacements, thermostat repairs, and clogged drain line clears are low-cost, high-impact repairs typically worth doing regardless of system age.",
      },
    ],
    sections: [
      {
        heading: "The Core Question: How Old Is Your System?",
        body: "Age is the single most important factor. An AC system under 8 years old is almost always worth repairing unless the failure is catastrophic (compressor failure on a basic unit, refrigerant leak on a phased-out R-22 system). Between 8 and 12 years, repair cost relative to replacement cost becomes the deciding variable. Over 12–15 years, replacement makes financial sense in most cases — not because the system can't be fixed, but because you're paying to extend the life of equipment that will fail again soon anyway.",
      },
      {
        heading: "The 50% Rule (and Why It Works)",
        body: "The industry-standard guidance is straightforward: if the repair costs more than 50% of what a new system would cost installed, replace it. This isn't a hard law, but the math behind it holds up. If your 14-year-old AC needs a $2,800 compressor replacement and a new comparable unit runs $5,500 installed, you're spending $2,800 to get maybe 3–4 more years out of aging equipment — while the new system would give you 15+ years, lower energy bills, and a manufacturer warranty.\n\nFor Orange County homeowners, get a real installed quote before applying the rule. A 3-ton unit for a 1,800 sq ft home typically runs $5,000–$8,500 fully installed depending on brand and efficiency tier.",
      },
      {
        heading: "R-22 Refrigerant: The Hidden Replacement Trigger",
        body: "If your system runs on R-22 (Freon) — which was phased out in 2020 — a refrigerant leak changes the calculation entirely. R-22 is no longer manufactured in the US and must come from recycled supplies. That scarcity has driven prices to $50–$100+ per pound. A system needing 5 lbs of R-22 to recharge could cost $500–$700 in refrigerant alone, not counting the leak repair itself.\n\nIf you have an R-22 system with any leak, replacement is almost always the right call. Modern systems use R-410A or R-454B, which are widely available and far cheaper.",
      },
      {
        heading: "Repairs That Are Almost Always Worth It",
        body: "Some repairs make sense regardless of system age because they're inexpensive and extend reliable life significantly:\n\n• Capacitor replacement: $100–$200. Capacitors fail frequently and are among the cheapest fixes in HVAC.\n• Contactor replacement: $150–$250. Often fails alongside a capacitor.\n• Thermostat replacement: $100–$300 depending on type. A bad thermostat can mimic major AC failure.\n• Clogged drain line clear: Under $100. Prevents water damage and keeps the system running.\n• Dirty coil cleaning: $150–$300. Dramatically improves efficiency on an otherwise functional system.\n\nThese repairs are worth doing even on a 15-year-old system because the cost is so low relative to replacement.",
      },
      {
        heading: "When Replacement Is the Clear Answer",
        body: "Replace when: (1) the system is 15+ years old and has any major failure, (2) the quoted repair exceeds $2,000 on a system over 10 years old, (3) the system uses R-22 and has a leak, (4) the compressor has failed on a system over 10 years old, or (5) your energy bills have been creeping up for 2+ years despite normal use.\n\nFor Orange County homes, replacing an aging system before peak summer is especially smart. Emergency installs during July heat waves mean longer wait times and less flexibility on equipment selection.",
      },
      {
        heading: "Getting the Right Quote",
        body: "Before deciding, get a diagnosis from a licensed HVAC technician who will give you both the repair cost and a replacement estimate in writing. Be wary of companies that recommend replacement on systems under 8 years old without a compelling reason — and equally wary of companies that recommend expensive repairs on systems over 15 years old just to avoid selling you a new unit.\n\nWe offer honest repair-vs-replace assessments at no charge. If repair makes sense, we'll say so.",
      },
    ],
  },
  {
    title: "What Size AC Unit Do I Need for My Home?",
    slug: "what-size-ac-unit-do-i-need",
    date: "2025-06-18",
    category: "AC Tips",
    excerpt:
      "AC sizing isn't just square footage — ceiling height, insulation, window exposure, and your local Orange County climate all play a role. Here's how professionals actually size a system.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 8,
    relatedServices: [
      { label: "AC Installation", href: "/air-conditioning/ac-installation" },
      { label: "AC Replacement", href: "/air-conditioning/ac-replacement" },
      { label: "AC Size Calculator", href: "/calculators/ac-size-calculator" },
    ],
    faqs: [
      {
        question: "What happens if my AC is too small for my home?",
        answer:
          "An undersized AC runs constantly trying to reach setpoint, never fully cooling the home during peak heat, driving up electricity bills, and wearing out the compressor prematurely. In Orange County summers, this is a real problem — a 2-ton unit in a 2,200 sq ft home will struggle on 100°F days.",
      },
      {
        question: "What happens if my AC is oversized?",
        answer:
          "Oversized AC short-cycles — it cools the air quickly but shuts off before removing humidity. You get a cold, clammy house, high humidity, and a system that cycles on and off dozens of times per day. Short-cycling significantly shortens equipment life and wastes energy.",
      },
      {
        question: "What is a Manual J load calculation?",
        answer:
          "Manual J is the industry standard method for sizing HVAC equipment. It accounts for square footage, ceiling height, insulation R-values, window area and orientation, local climate data, duct condition, and internal heat loads (occupants, appliances). A proper Manual J takes 30–60 minutes to complete and is far more accurate than the simple 'square footage divided by 500' rule of thumb.",
      },
      {
        question: "How many tons of AC do I need per square foot?",
        answer:
          "A common starting point is 1 ton per 400–600 square feet, but this varies significantly by home. In Orange County's climate, with good insulation and moderate window exposure, 1 ton per 500 sq ft is reasonable. Homes with poor insulation, high ceilings, or large south/west-facing windows will need more capacity.",
      },
    ],
    sections: [
      {
        heading: "Why Square Footage Alone Gets It Wrong",
        body: "Most online calculators tell you to divide your square footage by 500 and call it a day. That gives you a starting point, but it ignores everything that actually determines how much cooling a home needs: ceiling height, insulation quality, attic insulation, window area and orientation, local climate, number of occupants, and whether the home has a large open kitchen.\n\nTwo Orange County homes at 2,000 sq ft can need very different AC capacities. A single-story ranch with an uninsulated attic, large west-facing windows, and 10-foot ceilings might need a 4-ton system. A two-story home with R-38 attic insulation, modest windows, and 8-foot ceilings might be comfortable with 3 tons.",
      },
      {
        heading: "The Tonnage Basics",
        body: "AC capacity is measured in tons (1 ton = 12,000 BTUs per hour of cooling). Common residential sizes run from 1.5 tons to 5 tons in half-ton increments. For most Orange County single-family homes:\n\n• Under 1,200 sq ft: 1.5–2 tons\n• 1,200–1,600 sq ft: 2–2.5 tons\n• 1,600–2,200 sq ft: 2.5–3.5 tons\n• 2,200–3,000 sq ft: 3.5–4 tons\n• 3,000+ sq ft: 4–5 tons (or multi-zone)\n\nThese ranges assume average insulation, 8-foot ceilings, and typical SoCal construction. Your home may fall outside them.",
      },
      {
        heading: "Factors That Increase Required Capacity",
        body: "Several features push a home toward the upper end of its range:\n\n• High ceilings (10+ feet): More air volume to cool, more capacity needed.\n• Poor attic insulation: Attic temperatures in Orange County can hit 140–160°F in summer. Without adequate insulation (R-30 minimum, R-38+ preferred), that heat conducts directly into living space.\n• Large south or west-facing windows: West-facing glass absorbs afternoon heat aggressively. Homes with significant unshaded west exposure need more cooling.\n• Open floor plans: Large open kitchens adjacent to living areas create high heat loads.\n• Older ductwork with leaks: Leaky ducts in a hot attic can waste 20–30% of cooling capacity before it ever reaches living space.",
      },
      {
        heading: "Factors That Reduce Required Capacity",
        body: "Conversely, some features mean you can size slightly smaller:\n\n• Good attic insulation (R-38+) and attic ventilation\n• Low-E double-pane windows with appropriate SHGC\n• Radiant barrier in attic\n• Shaded south and west exposures from trees or overhangs\n• Single-story homes with efficient duct runs",
      },
      {
        heading: "What a Manual J Load Calculation Actually Is",
        body: "Manual J is the ACCA-standard method for sizing HVAC systems. A qualified HVAC technician measures your home's construction details, enters them into specialized software, applies local climate data from ASHRAE weather files (our region uses Los Angeles/Orange County data), and arrives at a precise cooling load in BTUs.\n\nThis takes time — typically 30–60 minutes on-site plus calculation time — but it's the only defensible way to size equipment. Any contractor who gives you a firm size recommendation without walking through your home and asking detailed questions about construction is guessing.",
      },
      {
        heading: "The Cost of Getting It Wrong",
        body: "Oversizing is the more common mistake because contractors think bigger is safer. It isn't. An oversized AC short-cycles (turns on and off frequently), fails to dehumidify properly, and wears out faster than a correctly sized unit. Orange County's coastal areas already deal with elevated humidity in spring — an oversized AC makes this worse, not better.\n\nUndersizing is rarer but happens on budget installs. The consequences are obvious: the system runs constantly and still can't keep up on hot days.\n\nThe right size, properly installed, will last 15+ years and give you consistent comfort. Our installation team performs Manual J calculations on every replacement and new installation — no guessing.",
      },
    ],
  },
  {
    title: "How Often Should You Service Your AC in Orange County?",
    slug: "how-often-service-ac-orange-county",
    date: "2025-07-02",
    category: "Maintenance",
    excerpt:
      "Orange County's long cooling season means your AC works harder than most of the country. Here's the honest answer on how often to service it — and what actually gets done during a tune-up.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 6,
    relatedServices: [
      { label: "AC Maintenance", href: "/air-conditioning/ac-maintenance" },
      { label: "AC Tune-Up", href: "/air-conditioning/ac-tune-up" },
      { label: "Maintenance Plans", href: "/maintenance-plans" },
    ],
    faqs: [
      {
        question: "How often should I have my AC serviced in Southern California?",
        answer:
          "Once a year is the minimum — ideally in March or April before the cooling season starts. Homes in coastal Orange County areas or those with older systems, pets, or heavy use benefit from twice-yearly service: once in spring and once in fall.",
      },
      {
        question: "What is included in an AC tune-up?",
        answer:
          "A proper tune-up includes cleaning or inspecting the evaporator and condenser coils, checking refrigerant charge, testing electrical components (capacitor, contactor, disconnect), lubricating moving parts, inspecting the blower, checking the drain line, testing thermostat calibration, and measuring system pressures and temperature differential.",
      },
      {
        question: "Can I skip AC maintenance if the system seems fine?",
        answer:
          "Skipping maintenance is how small problems become expensive repairs. A dirty condenser coil forces the compressor to work harder and run hotter — which is the leading cause of compressor failure. Compressor replacement costs $1,200–$2,500. An annual tune-up costs $89–$149. The math is straightforward.",
      },
      {
        question: "When is the best time to schedule AC maintenance in Orange County?",
        answer:
          "Late February through April is ideal — before the peak season rush. By May, most HVAC companies are booked weeks out with repair calls. Scheduling in spring means you get your choice of appointment time and catch any issues while you have time to address them before summer.",
      },
    ],
    sections: [
      {
        heading: "Orange County's Cooling Season Is Unusually Long",
        body: "Most of the country runs their AC from Memorial Day to Labor Day — about 3 months. In Orange County, AC runs from roughly April through October, and during heat waves in September and October, well past that. That's 6–7 months of regular use per year.\n\nCompare that to a system in the Pacific Northwest that might run 6 weeks per year. Our systems age faster, accumulate more operating hours, and need more frequent attention. The once-a-year guideline that applies nationally is the floor here, not the target.",
      },
      {
        heading: "What Actually Happens in a Proper AC Tune-Up",
        body: "Not all tune-ups are equal. A real maintenance visit should include:\n\n• Condenser coil cleaning (outdoor unit): Dirt and debris insulate the coil, reducing efficiency and raising discharge temperatures. This is the single most impactful maintenance task.\n• Evaporator coil inspection (indoor unit): Less accessible but critical — ice buildup or debris here severely restricts airflow.\n• Refrigerant charge check: Low refrigerant means the system can't cool effectively and risks compressor damage.\n• Electrical component testing: Capacitors and contactors are wear items that fail without warning. Testing them catches failures before they strand you on a hot day.\n• Blower motor inspection and lubrication\n• Drain line flush: Clogged drain lines cause water damage and trigger safety shutdowns.\n• Thermostat calibration check\n• Filter inspection\n\nA tune-up that skips coil cleaning or electrical testing is not a real tune-up.",
      },
      {
        heading: "Spring Is the Right Time — Here's Why",
        body: "March and April is the window. The system sat mostly idle through winter, seals may have dried, and any slow refrigerant leak will have gotten worse. Servicing in spring means:\n\n1. You catch problems while you have weeks to address them, not while it's 95°F and you need the system working tomorrow.\n2. HVAC companies have better appointment availability — once summer hits, repair calls crowd out maintenance slots.\n3. Your system enters the cooling season at peak efficiency.",
      },
      {
        heading: "Signs You Need Service More Than Once a Year",
        body: "Some situations call for twice-yearly service (spring + fall):\n\n• Older systems (12+ years): More wear means more things to check.\n• Homes with pets: Pet dander clogs evaporator coils faster than almost anything else.\n• High-use homes: If you keep the house at 70°F during summer, the system is running nearly continuously.\n• Coastal locations: Salt air accelerates corrosion on outdoor condenser fins and coils.\n• Anyone on a commercial maintenance plan: Commercial systems often run 24/7 and need quarterly checks.",
      },
      {
        heading: "The Cost of Skipping It",
        body: "The three most common avoidable AC failures we see — all of which a tune-up would have caught:\n\n1. Capacitor failure: A $150 repair becomes a $150 repair plus an emergency service call at a premium rate, plus a day without AC.\n2. Refrigerant leak damage: Caught early, a refrigerant leak is a straightforward repair. Caught after the compressor runs undercharged for a season, you're looking at compressor replacement.\n3. Dirty coil efficiency loss: A coil at 30% efficiency capacity costs $40–$80 more per month to run than a clean one. Over a 7-month season, that's $280–$560 per year just in energy waste.\n\nAnnual maintenance is the highest-ROI thing most homeowners can do with their HVAC system.",
      },
    ],
  },
  {
    title: "Why Is My AC Blowing Warm Air?",
    slug: "ac-blowing-warm-air",
    date: "2025-07-15",
    category: "Troubleshooting",
    excerpt:
      "AC running but the air coming out isn't cold? There are 8 common causes — most are straightforward fixes, and two of them you can check yourself right now.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 7,
    relatedServices: [
      { label: "AC Repair", href: "/air-conditioning/ac-repair" },
      { label: "Emergency AC Repair", href: "/air-conditioning/emergency-ac-repair" },
      { label: "AC Tune-Up", href: "/air-conditioning/ac-tune-up" },
    ],
    faqs: [
      {
        question: "Why is my AC running but not cooling?",
        answer:
          "The most common causes are: low refrigerant (leak), dirty condenser coil, frozen evaporator coil, failed capacitor, thermostat set to 'fan only' mode, tripped circuit breaker on the outdoor unit, or a failed compressor. Start with the simplest checks — thermostat mode and circuit breakers — before calling a technician.",
      },
      {
        question: "Can a dirty filter cause my AC to blow warm air?",
        answer:
          "Yes. A severely clogged filter restricts airflow so badly that the evaporator coil freezes. When the coil is frozen, the refrigerant can't absorb heat properly and warm air blows through. Check your filter first — if it's gray and clogged, replace it and give the system 2–3 hours to thaw before restarting.",
      },
      {
        question: "How do I know if my AC is low on refrigerant?",
        answer:
          "Signs of low refrigerant include: warm air from vents despite the system running, ice on the refrigerant lines or outdoor unit, hissing or bubbling sounds near the indoor unit, and longer-than-usual run times. Refrigerant doesn't deplete on its own — if it's low, there's a leak that needs to be found and repaired.",
      },
      {
        question: "How much does it cost to fix an AC blowing warm air?",
        answer:
          "It depends heavily on the cause. Capacitor replacement: $150–$250. Refrigerant recharge with leak repair: $250–$600 depending on refrigerant type and leak location. Dirty coil cleaning: $150–$300. Compressor replacement: $1,200–$2,500. Most warm-air calls turn out to be capacitors or refrigerant issues — not compressor failures.",
      },
    ],
    sections: [
      {
        heading: "Check These Two Things Before Calling",
        body: "Before scheduling a service call, verify these:\n\n1. Thermostat mode: Check that it's set to COOL, not HEAT and not FAN ONLY. Fan-only mode circulates room-temperature air — it feels like warm air even though the system is 'running.' This is the most common call we take that doesn't require a technician.\n\n2. Circuit breakers: Your central AC has two breakers — one for the air handler (indoor unit) and one for the condenser (outdoor unit). If only the outdoor unit breaker has tripped, the fan will blow air but the compressor won't run and you'll get warm air. Check the panel, reset any tripped breaker once. If it trips again immediately, call a technician — something is drawing excess current.",
      },
      {
        heading: "Dirty or Clogged Air Filter",
        body: "A severely dirty filter restricts airflow to the evaporator coil. When airflow drops too low, the coil temperature drops below freezing and moisture in the air freezes onto it — blocking airflow further in a cycle that ends with a frozen coil and warm air from vents.\n\nCheck your filter. If it's visibly gray and clogged, replace it. Turn the system to FAN ONLY for 2–3 hours to allow the coil to thaw completely. Then switch back to cooling. If the system cools normally, a dirty filter was the culprit. Set a reminder to check filters every 30 days.",
      },
      {
        heading: "Low Refrigerant (Most Likely Cause in Older Systems)",
        body: "Refrigerant is the medium that carries heat from inside your home to the outside. When refrigerant is low, the system can't transfer heat effectively — resulting in warm or only slightly cool air from the vents.\n\nRefrigerant doesn't deplete naturally. Low refrigerant always means a leak — either a slow leak that's developed over years (typically at brazed joints or service valve packing) or a sudden failure.\n\nSigns: warm air, ice on refrigerant lines or the outdoor unit, hissing or bubbling sounds. Fix: a technician locates and repairs the leak, then recharges to the manufacturer's specified level. Simply topping off without fixing the leak is a temporary measure.",
      },
      {
        heading: "Failed Capacitor",
        body: "Capacitors are cylindrical components that store and release electrical charge to start and run the compressor and fan motors. They're wear items — most fail between 5 and 10 years.\n\nA failed run capacitor means the compressor motor can't start properly or runs at reduced efficiency, producing little to no cooling. You might hear a humming sound from the outdoor unit as the motor tries to start and fails.\n\nCapacitor replacement is one of the cheaper AC repairs: $150–$250 including labor. It's also one of the most common warm-air causes we see in Orange County, especially after a first hot stretch in May.",
      },
      {
        heading: "Dirty Condenser Coil",
        body: "The outdoor condenser unit rejects heat from the refrigerant to the outside air. When the coil fins are coated with dirt, cottonwood fluff, grass clippings, or debris, heat can't transfer out efficiently. The refrigerant stays too warm and arrives at the indoor coil without enough capacity to absorb heat from your home.\n\nYou can rinse the condenser fins gently with a garden hose (outside-in, low pressure) to remove loose debris. For a thorough cleaning, a technician uses coil cleaner and proper rinsing to restore fin efficiency without bending the fins.",
      },
      {
        heading: "Frozen Evaporator Coil",
        body: "The evaporator coil (indoor unit) can freeze from two causes: restricted airflow (dirty filter, closed vents, duct blockage) or low refrigerant. When frozen, the ice acts as insulation — the refrigerant circulates but can't absorb heat, and warm air passes over the ice block and through the vents.\n\nFix: Turn the system off (leave the fan running) for 2–4 hours to fully thaw. Then address the root cause — clean the filter, open closed vents, or call for a refrigerant check. Never let a frozen coil defrost without finding the cause, or it will freeze again.",
      },
      {
        heading: "Compressor Failure",
        body: "The compressor is the heart of the refrigeration cycle — it pressurizes the refrigerant. A failed compressor means no refrigeration, period. The fan will still blow air, but it won't be cooled.\n\nSigns: outdoor unit starts and hums but immediately shuts off, loud clunking or grinding from outdoor unit, or the outdoor unit doesn't start at all while the indoor air handler runs.\n\nCompressor replacement is expensive ($1,200–$2,500) and often tips older systems into replacement territory. If your system is over 10 years old and the compressor has failed, get a replacement quote before committing to the repair.",
      },
    ],
  },
  {
    title: "Ductless Mini Split vs. Central AC: Which Is Right for Your Home?",
    slug: "ductless-mini-split-vs-central-ac",
    date: "2025-07-28",
    category: "AC Tips",
    excerpt:
      "Central AC and ductless mini splits each have real advantages. The right choice depends on your home's duct condition, layout, budget, and how you use your space. Here's a clear breakdown.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 8,
    relatedServices: [
      { label: "Ductless Mini Split", href: "/ductless/ductless-mini-split" },
      { label: "Mini Split Installation", href: "/ductless/mini-split-installation" },
      { label: "AC Installation", href: "/air-conditioning/ac-installation" },
    ],
    faqs: [
      {
        question: "Is a ductless mini split more efficient than central AC?",
        answer:
          "Mini splits are generally more efficient because they eliminate duct losses — central AC systems lose 20–30% of conditioned air through leaky or uninsulated ducts in hot attics. High-efficiency mini splits also have SEER2 ratings of 18–28+, compared to 14–18 for most central AC installations. However, central AC becomes more efficient when paired with well-sealed, insulated ductwork.",
      },
      {
        question: "Can a mini split heat as well as cool?",
        answer:
          "Yes. All mini splits are heat pumps — they reverse the refrigeration cycle to provide heat in winter. In Orange County's mild climate, a mini split can be your primary heating and cooling system, replacing both your AC and furnace for all but the coldest nights.",
      },
      {
        question: "How many rooms can one mini split handle?",
        answer:
          "A single-zone mini split handles one room or open area. Multi-zone systems use one outdoor unit connected to 2–5 indoor air handlers, each independently controlled. This lets you heat or cool only occupied rooms, which is a significant efficiency advantage over central AC in homes where some rooms are rarely used.",
      },
      {
        question: "Is mini split installation more expensive than central AC?",
        answer:
          "Per zone, mini splits are typically more expensive than central AC (roughly $2,500–$5,000 per zone installed vs. $5,000–$8,500 for a whole-house central system). For whole-house coverage in a home with existing ductwork, central AC is usually cheaper. For homes without ducts, additions, or targeted zone control, mini splits are often the more economical choice.",
      },
    ],
    sections: [
      {
        heading: "The Core Difference",
        body: "Central AC uses a network of ducts to distribute conditioned air throughout the home. One outdoor unit, one indoor air handler, and ductwork that reaches every room. A ductless mini split (also called a ductless heat pump) mounts an indoor air handler directly in the space it conditions — no ductwork required. One outdoor unit can connect to multiple indoor heads, each controlled independently.",
      },
      {
        heading: "When Central AC Wins",
        body: "Central AC makes the most sense when:\n\n• The home already has functional, well-sealed ductwork. Replacing a central system is much cheaper than retro-installing mini splits in a home built around ducts.\n• You want consistent whole-home cooling from a single thermostat without managing zones.\n• Budget favors a single installation rather than multiple zones.\n• The home's layout is open-plan with good airflow between spaces.\n\nFor most Orange County homes built after 1980 with existing ductwork, central AC replacement is the default recommendation unless there's a specific reason to go ductless.",
      },
      {
        heading: "When Mini Splits Win",
        body: "Mini splits make the most sense when:\n\n• The home has no existing ductwork (older homes, converted garages, room additions).\n• Ductwork is in poor condition — leaky ducts in a hot attic can waste 25–30% of conditioned air.\n• You need zone control — separate bedrooms at different temperatures, or cooling only certain areas of the house.\n• You're adding a room, ADU, or garage conversion and don't want to extend the central system.\n• You want heating and cooling from a single system in a milder climate like coastal OC.\n\nOrange County's mild winters are ideal for heat pump mini splits — they operate efficiently at the temperatures we see, unlike in cold climates where resistance heating becomes necessary.",
      },
      {
        heading: "Efficiency: The Duct Loss Problem",
        body: "One of mini splits' biggest real-world advantages is eliminating duct losses. In Orange County's typical construction — ducts running through unconditioned attics that hit 140–160°F in summer — a well-sealed central system still loses 15–20% of its cooling to heat gain in the attic. Leaky ducts lose 25–30%.\n\nA 3-ton central AC with 20% duct loss is delivering the effective cooling of a 2.4-ton unit. A 1.5-ton mini split with zero duct loss delivers all 1.5 tons to the space.\n\nIf your ductwork was never sealed or hasn't been tested, a duct leakage test can quantify the loss and help you decide whether resealing or going ductless is the better investment.",
      },
      {
        heading: "Noise, Aesthetics, and Comfort",
        body: "Mini splits are quieter at the indoor unit (many run at 19–22 dB, near the threshold of human hearing) but do require a wall-mounted air handler visible in the room. Some homeowners dislike the look; others don't notice it.\n\nCentral AC is invisible once installed — just vents in the ceiling. But it can also create hot and cold spots in homes with unbalanced duct systems, and the single thermostat can't account for rooms with different heat loads (a room with west-facing glass vs. an interior bedroom).\n\nModern multi-zone mini splits solve the comfort problem by letting different rooms run at different setpoints — the master bedroom cooler than the living room, for example.",
      },
      {
        heading: "Making the Decision",
        body: "Start with your ductwork. If it's in good shape, a central system replacement is almost always the right call for whole-home cooling. If it's leaky, damaged, or nonexistent, mini splits should be part of the conversation.\n\nFor targeted additions — a room addition, a garage conversion, a home office — mini splits are almost always the right choice regardless of what the rest of the house uses.\n\nWe evaluate both options on every estimate and recommend based on your home's actual conditions, not on what's easiest for us to install.",
      },
    ],
  },
  {
    title: "SEER2 Ratings Explained for California Homeowners",
    slug: "seer2-ratings-explained-california",
    date: "2025-08-05",
    category: "Buying Guide",
    excerpt:
      "SEER2 replaced SEER as California's efficiency standard in 2023. Here's what the numbers actually mean, how to choose the right efficiency tier for Southern California's climate, and whether higher SEER2 is worth the premium.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 7,
    relatedServices: [
      { label: "AC Installation", href: "/air-conditioning/ac-installation" },
      { label: "AC Replacement", href: "/air-conditioning/ac-replacement" },
      { label: "SEER2 Savings Calculator", href: "/calculators/seer2-savings-calculator" },
    ],
    faqs: [
      {
        question: "What is the minimum SEER2 rating required in California?",
        answer:
          "As of January 1, 2023, California requires a minimum SEER2 of 13.4 for split-system central AC units (formerly 14 SEER under the old test standard). Equipment sold in California must meet the Southwest/Southeast regional minimum, which is higher than the national minimum of 13 SEER2.",
      },
      {
        question: "Is SEER2 the same as SEER?",
        answer:
          "No. SEER2 uses a more rigorous test procedure (M1 external static pressure test) that better reflects real-world installation conditions. A 16 SEER2 unit is roughly equivalent to an 18 SEER unit under the old test standard. Direct number comparisons between SEER and SEER2 ratings are not valid.",
      },
      {
        question: "What SEER2 rating should I choose for Orange County?",
        answer:
          "For most Orange County homeowners, 15–17 SEER2 hits the sweet spot. The energy savings over 13.4 SEER2 are meaningful given our long cooling season, and the payback period is typically 4–7 years. High-efficiency 18–21 SEER2 makes sense in larger homes with high cooling loads or where long-term occupancy is planned.",
      },
      {
        question: "Does a higher SEER2 rating qualify for rebates in California?",
        answer:
          "Yes. SoCalGas and Southern California Edison offer rebates for qualifying high-efficiency HVAC equipment. Heat pumps at or above certain SEER2/HSPF2 thresholds also qualify for federal tax credits under the Inflation Reduction Act — up to 30% of equipment cost, capped at $2,000 per year for heat pumps.",
      },
    ],
    sections: [
      {
        heading: "What SEER2 Actually Measures",
        body: "SEER2 stands for Seasonal Energy Efficiency Ratio 2. It measures how much cooling (in BTUs) a system produces per watt-hour of electricity over a typical cooling season. Higher SEER2 = lower electricity cost per unit of cooling.\n\nThe '2' indicates the updated test procedure introduced in 2023. The old SEER test was conducted at low external static pressure (0.1 in. w.c.), which didn't reflect real duct systems. SEER2 tests at 0.5 in. w.c., which better represents actual installed conditions — so SEER2 ratings are meaningfully lower than equivalent SEER ratings for the same equipment.",
      },
      {
        heading: "The California Minimums",
        body: "California participates in the Southwest/Southeast regional standards, which are stricter than the federal baseline:\n\n• Split-system central AC: 13.4 SEER2 minimum (equivalent to ~15 SEER under old standard)\n• Split-system heat pump (cooling): 14.3 SEER2 minimum\n• Single-package units: 13.4 SEER2\n\nThis means the cheapest compliant equipment in California is already meaningfully efficient. The minimum isn't 'bad' — it's a solid baseline. But for Southern California's 6–7 month cooling season, stepping up pays off.",
      },
      {
        heading: "Payback Period: Does Higher Efficiency Pay Off?",
        body: "Whether upgrading to higher SEER2 is worth it depends on three variables: cooling load, electricity cost, and how long you'll stay in the home.\n\nOrange County electricity rates (SCE TOU plans) average $0.25–$0.35/kWh for most households. A home with a 3-ton AC running 2,000 hours per cooling season:\n\n• 13.4 SEER2: ~$540/season (at $0.30/kWh)\n• 16 SEER2: ~$450/season\n• 18 SEER2: ~$400/season\n\nThe premium for 16 vs. 13.4 SEER2 is typically $500–$1,200 on equipment cost. At $90/year in savings, payback is 5–7 years — reasonable for most homeowners planning to stay. The jump to 18+ SEER2 narrows the incremental return further and payback stretches to 8–12 years for average homes.",
      },
      {
        heading: "Variable-Speed vs. Single-Stage: The Real Efficiency Difference",
        body: "SEER2 ratings measure seasonal average performance, but how a system achieves that efficiency matters for day-to-day comfort.\n\nSingle-stage systems run at full blast or off. Two-stage systems run at low or high capacity. Variable-speed (inverter-driven) systems modulate from roughly 30% to 100% capacity continuously.\n\nIn moderate weather — most of Orange County's spring and fall — a variable-speed system runs at low capacity for hours at a time. This provides better dehumidification (longer run times at lower output), quieter operation, and real-world efficiency that exceeds the SEER2 nameplate.\n\nFor coastal Orange County cities (Irvine, Laguna Beach, Dana Point) where humidity is a comfort factor even when temperatures are mild, variable-speed systems provide noticeably better comfort than single-stage units with the same SEER2 rating.",
      },
      {
        heading: "Heat Pumps and the IRA Tax Credit",
        body: "The Inflation Reduction Act (IRA) offers a 30% federal tax credit on qualifying heat pump installations, capped at $2,000 per year. For a $7,000 heat pump installation, that's $2,000 back at tax time.\n\nTo qualify, the heat pump must meet or exceed the efficiency thresholds set by the ENERGY STAR program. Most 15 SEER2+ inverter heat pumps qualify. This makes the economics of a high-efficiency heat pump installation substantially different from a standard AC: the $2,000 credit effectively cuts the premium cost of a high-efficiency unit significantly.\n\nAsk your contractor to confirm the specific model qualifies and to provide documentation for the tax credit claim.",
      },
      {
        heading: "Practical Recommendation for Orange County",
        body: "For most homeowners replacing a central AC:\n\n• Minimum (13.4 SEER2): Acceptable, especially for shorter occupancy or tight budgets. Meets code.\n• Mid-range (15–17 SEER2): Best overall value for most homes. Meaningful savings over 13.4, reasonable payback, often includes two-stage operation.\n• High-efficiency (18–21+ SEER2): Best for large homes, high cooling loads, or homeowners planning 10+ years in the house. Variable-speed units in this range deliver superior dehumidification and comfort.\n\nDon't let a contractor tell you minimum efficiency is 'good enough' without doing the math for your specific home. And don't let anyone sell you 21 SEER2 for a small, well-insulated home where the payback won't materialize.",
      },
    ],
  },
  {
    title: "Commercial HVAC Maintenance Checklist for Orange County Businesses",
    slug: "commercial-hvac-maintenance-checklist",
    date: "2025-08-20",
    category: "Commercial",
    excerpt:
      "Commercial HVAC systems fail at the worst times — during peak business hours, in summer heat, when you have a full house. This is the maintenance checklist that keeps them running.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 9,
    relatedServices: [
      { label: "Commercial HVAC", href: "/commercial-hvac" },
      { label: "Commercial Maintenance Plan", href: "/commercial-hvac/commercial-maintenance-plan" },
    ],
    faqs: [
      {
        question: "How often should commercial HVAC be serviced?",
        answer:
          "Most commercial systems should be serviced quarterly — four times per year. Light commercial systems with lower run hours (small offices under 3,000 sq ft) can often get by with twice-yearly service. High-load environments (restaurants, gyms, retail with high foot traffic) may need monthly filter checks and bi-monthly full inspections.",
      },
      {
        question: "What is a commercial HVAC maintenance agreement?",
        answer:
          "A maintenance agreement (also called a service contract or preventive maintenance plan) is a scheduled service program where an HVAC contractor visits on a fixed schedule to inspect, clean, and tune all HVAC equipment. Most commercial agreements include priority response for service calls and discounted repair rates.",
      },
      {
        question: "What happens if we skip commercial HVAC maintenance?",
        answer:
          "Deferred maintenance compounds quickly in commercial systems. Dirty filters restrict airflow, forcing equipment to work harder. Dirty coils reduce heat transfer efficiency. Worn belts and bearings fail without warning. The HVAC industry rule of thumb: for every dollar not spent on preventive maintenance, expect $3–$5 in deferred repair costs.",
      },
      {
        question: "Does commercial HVAC maintenance affect indoor air quality?",
        answer:
          "Yes, significantly. Commercial buildings cycle large volumes of air through filtration systems. Dirty filters, contaminated coils, and blocked drain pans all degrade indoor air quality. Post-COVID, IAQ has become a compliance and liability issue for many businesses — MERV 13 filtration and regular coil cleaning are now standard expectations in occupied commercial spaces.",
      },
    ],
    sections: [
      {
        heading: "Why Commercial HVAC Needs More Attention Than Residential",
        body: "Commercial HVAC systems run longer hours, serve more people, operate under higher loads, and cost far more to repair or replace than residential equipment. A rooftop unit (RTU) failure at a retail location during August in Orange County isn't just uncomfortable — it can close the business and cost thousands in lost revenue per day.\n\nPreventive maintenance for commercial systems isn't optional — it's risk management.",
      },
      {
        heading: "Monthly Tasks (Every Month, Year-Round)",
        body: "These checks should happen every month, ideally at the start:\n\n• Air filter inspection and replacement: Commercial environments — especially those with foot traffic, food service, or manufacturing — load filters faster than residential. Check monthly, replace when pressure drop across the filter exceeds manufacturer spec or visible loading is significant. Using MERV 8–13 filters is now standard in occupied commercial spaces.\n• Thermostat/building automation system (BAS) check: Verify setpoints are appropriate for season and occupancy schedule. Confirm occupancy scheduling is programmed correctly — HVAC running at full setpoint during unoccupied hours is one of the most common sources of commercial energy waste.\n• Visual inspection of rooftop units: Check for obvious damage, standing water in drain pans, debris around units, disconnected ductwork.",
      },
      {
        heading: "Quarterly Tasks (Every 3 Months)",
        body: "Full inspection and maintenance should happen four times per year:\n\n• Coil cleaning (evaporator and condenser): Commercial coils accumulate biological growth (mold, algae) in drain pans and on coil surfaces. This restricts airflow, reduces heat transfer efficiency, and is an IAQ concern. Quarterly cleaning maintains performance and prevents the deep fouling that requires more aggressive cleaning.\n• Belt inspection and tension: Belt-driven commercial systems (older air handlers, some RTUs) require belt inspection for cracking and proper tension. A failed belt shuts down airflow completely — a 10-minute check prevents an emergency call.\n• Electrical component inspection: Check contactors, capacitors, and disconnect fuses for wear, corrosion, or heat damage. Clean electrical connections at the compressor and disconnect.\n• Refrigerant pressure check: Commercial systems run hard. Refrigerant leaks that develop slowly can go unnoticed for months — a quarterly pressure check catches them early.\n• Drain pan and drain line inspection: Clear drain pans of standing water. Flush drain lines with a biocide solution to prevent algae growth that causes clogs and water overflow.\n• Economizer function test (if equipped): Many commercial RTUs have economizers that use outside air for free cooling when conditions allow. Economizers fail in ways that can either lock out free cooling (costing money) or fail to modulate (dumping uncontrolled outside air into the building). Test actuator movement and sensor calibration quarterly.",
      },
      {
        heading: "Semi-Annual Tasks",
        body: "Twice-yearly, deeper inspection tasks:\n\n• Refrigerant charge verification: Full pressure/temperature measurement to verify system is operating at design charge.\n• Heat exchanger inspection (gas heating systems): Cracked heat exchangers allow combustion gases into supply air — a safety issue. Inspect annually minimum, twice yearly on aging equipment.\n• Duct inspection: Check accessible ductwork for disconnections, tears, or blockage. Commercial duct systems in older buildings often have significant leakage.\n• Compressor amp draw: Measure compressor amperage against nameplate rating. Abnormal amp draw is an early indicator of compressor issues.\n• Fan blade inspection: Check for cracking, imbalance, or debris accumulation. Imbalanced fan blades cause bearing wear and vibration.",
      },
      {
        heading: "Annual Tasks",
        body: "Once-yearly, comprehensive inspection:\n\n• Combustion analysis (gas heat): Measure flue gas CO, CO₂, O₂, and stack temperature. Tune burners for efficiency and safety.\n• Full system performance test: Measure supply air temperature, return air temperature, and airflow at all supply registers. Compare to design specs — deviations indicate duct problems, equipment degradation, or zoning issues.\n• Controls calibration: Calibrate all temperature sensors, economizer sensors, and pressure sensors against reference instruments.\n• Full electrical inspection: Torque all electrical connections at panels, disconnects, and equipment. Thermal imaging of electrical panels (if available) catches hot connections before they cause failures.\n• Documentation update: Update maintenance logs, equipment records, and any changes to the system. Accurate records are essential for warranty claims and service history.",
      },
      {
        heading: "Building a Commercial Maintenance Agreement",
        body: "For most Orange County businesses, a quarterly service agreement is the right structure. Key elements to verify in any agreement:\n\n• Specific tasks performed at each visit (ask for a written checklist, not just 'inspection')\n• Filter replacement: who supplies filters and at what MERV rating\n• Emergency response time commitment — 4 hours or same business day?\n• Diagnostic labor rate for repairs outside the agreement\n• Equipment coverage: all units, or specific systems?\n\nWe offer commercial maintenance agreements for businesses from small offices to multi-tenant retail and light industrial. Contact us for a site assessment and agreement quote.",
      },
    ],
  },
  {
    title: "How to Lower Cooling Costs During Southern California Heat Waves",
    slug: "lower-cooling-costs-southern-california-heat-waves",
    date: "2025-09-01",
    category: "Energy Savings",
    excerpt:
      "Southern California heat waves push electricity bills into the stratosphere. These evidence-based strategies can cut your cooling costs 20–40% without replacing your AC system.",
    author: "HVAC Service & AC Repair Team",
    readingTime: 8,
    relatedServices: [
      { label: "AC Tune-Up", href: "/air-conditioning/ac-tune-up" },
      { label: "AC Maintenance", href: "/air-conditioning/ac-maintenance" },
      { label: "Maintenance Plans", href: "/maintenance-plans" },
    ],
    faqs: [
      {
        question: "What temperature should I set my thermostat during a heat wave?",
        answer:
          "DOE recommends 78°F when home, 85°F when away, and 82°F when sleeping. In practice, most people find 78°F comfortable with ceiling fans running (which allow a 4°F thermostat setback). Every degree higher saves 3–5% on cooling costs. During extreme heat (100°F+), your system may struggle to maintain anything below 76–78°F regardless of setpoint.",
      },
      {
        question: "Does closing vents in unused rooms save money?",
        answer:
          "No — closing vents in a central air system increases static pressure on the air handler, which reduces airflow, stresses the blower motor, and can cause the evaporator coil to freeze. Keep all vents open. If you want zone control, consider a zoning system or mini splits.",
      },
      {
        question: "What is a time-of-use electricity rate and how does it affect cooling costs?",
        answer:
          "SoCal Edison's TOU plans charge more for electricity during peak hours (typically 4–9 PM) and less during off-peak hours (9 PM–8 AM). Pre-cooling your home in the morning when rates are low, then raising the setpoint during peak hours, can cut electricity costs 20–30% with no reduction in comfort.",
      },
      {
        question: "How much does attic insulation affect cooling costs?",
        answer:
          "Significantly. An attic at R-19 (common in older Orange County homes) vs. R-38 can account for 15–25% of cooling load difference. Adding blown-in insulation to bring an attic from R-19 to R-38 typically costs $1,200–$2,500 and pays back in 3–5 years in energy savings alone, not counting improved comfort.",
      },
    ],
    sections: [
      {
        heading: "Why Heat Waves Hit So Hard in Southern California",
        body: "Southern California heat waves are characterized by high temperatures combined with offshore Santa Ana-type winds that reduce overnight cooling. Unlike Midwest or East Coast heat waves, marine layer relief is minimal during inland heat events — temperatures sometimes stay above 85°F overnight, which means homes never fully cool before the next day's peak.\n\nThis eliminates one of the most effective heat management strategies (ventilating at night) and puts continuous load on AC systems that weren't designed for 100°F+ ambient temperatures for days at a stretch.",
      },
      {
        heading: "Pre-Cool Your Home Using TOU Rate Strategy",
        body: "If you're on a time-of-use electricity plan (most SCE customers are by default), electricity is cheapest in the mornings and overnight. Peak rates typically apply 4–9 PM — exactly when afternoon heat is at its worst.\n\nStrategy: Set your thermostat to 72–74°F from 8 AM to 2 PM using cheap off-peak electricity to cool the thermal mass of the home (floors, walls, furniture). Then raise the setpoint to 78–80°F during the 4–9 PM peak rate window. The thermal mass you cooled in the morning absorbs afternoon heat, and you're not running the AC hard during the most expensive rate period.\n\nDone correctly, this approach can cut peak-period electricity costs 25–35% with no decrease in comfort.",
      },
      {
        heading: "Window Management Is Underrated",
        body: "West and south-facing windows are the largest sources of afternoon heat gain in Orange County homes. During a heat wave:\n\n• Close blinds or curtains on west-facing windows before noon — before direct sun hits them, not after.\n• Cellular shades or blackout curtains block more heat than standard horizontal blinds.\n• Exterior shading (awnings, shade screens, or trees) is more effective than interior treatments because it stops heat before it enters the glass.\n\nA west-facing window with no shading admits roughly 200–300 BTUs per square foot during peak afternoon hours. A 50 sq ft west-facing sliding door is adding 10,000–15,000 BTUs of heat — the equivalent of a 1-ton AC just to offset one door.",
      },
      {
        heading: "Your AC Efficiency Depends on a Clean System",
        body: "A dirty condenser coil — coated with a season of dust, cottonwood fluff, or debris — forces the compressor to work harder and run hotter. At 100°F ambient with a clean coil, a properly sized 3-ton AC handles the load. At 100°F with a 30% efficiency loss from a dirty coil, that same unit struggles, runs longer, and uses significantly more electricity.\n\nBefore heat wave season, wash the condenser coil (outdoor unit) with a garden hose. Spray from the inside out through the fins to push debris outward. For thorough cleaning, a professional tune-up includes coil cleaning with appropriate coil cleaner.\n\nAlso check and replace air filters. Restricted airflow from a dirty filter is the single most common cause of AC strain during heat events.",
      },
      {
        heading: "Ceiling Fans and the Windchill Effect",
        body: "Ceiling fans don't cool air — they make you feel cooler by increasing evaporative cooling from your skin. The 'windchill' effect allows you to raise your thermostat 4°F with no reduction in perceived comfort.\n\nAt 78°F with no fan, you're uncomfortable. At 78°F with a ceiling fan moving at 200 CFM, you feel like 74°F.\n\nThe math: raising the thermostat from 74°F to 78°F saves roughly 12–16% on cooling costs. The fan uses 30–80 watts — negligible compared to a 3,500-watt AC compressor.\n\nOne critical rule: turn fans off when you leave the room. Fans cool people, not rooms. Running a fan in an empty room wastes electricity without any benefit.",
      },
      {
        heading: "Address the Attic",
        body: "Attic temperatures in Orange County during a heat wave regularly exceed 140–160°F. Without adequate insulation, that heat conducts through the ceiling into your living space continuously — every hour the heat wave lasts.\n\nTwo cost-effective attic improvements:\n\n1. Attic insulation: Bringing R-value from R-19 (common in homes built before 1990) to R-38 typically costs $1,200–$2,500 and reduces cooling load by 15–20%. It also keeps the home warmer in winter.\n\n2. Radiant barrier: A reflective foil material installed on the underside of roof rafters reflects radiant heat before it reaches the insulation. Effective in hot, sunny climates like ours — studies show 5–10% cooling energy reduction in Southern California. Cost is typically $1,000–$2,500 installed.\n\nBoth are long-term investments that pay back through reduced energy use every summer.",
      },
      {
        heading: "When Your AC Can't Keep Up",
        body: "During extreme heat (ambient temperatures 105°F+), even a properly maintained, correctly sized AC may not maintain setpoint. This is normal — systems are typically sized to handle 95–100°F design temperatures, not 110°F. Signs the system is doing its best but hitting limits: compressor running continuously, home temperature slowly rising despite system running.\n\nIf this happens, focus on minimizing heat gain: close all blinds, avoid using the oven, minimize foot traffic through doors, and consider a portable spot cooler for a critical room like a bedroom for sleeping.\n\nIf the system can't keep up at 90°F, that's a sign of a problem — low refrigerant, dirty coil, failed component, or undersizing — not a normal heat wave response.",
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((post) => post.category === category);
}

export const blogCategories = [...new Set(blogPosts.map((p) => p.category))];
