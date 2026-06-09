import type { PPCCity } from "@/lib/config/ppc-cities";

// ─── Image pools (rotate by city index) ──────────────────────────────────────
const HERO_IMAGES = [
  { src: "/uploads/ac repair service in California  (1).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (2).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (3).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (4).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (5).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (6).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (8).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (9).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (10).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (11).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (12).jpeg", width: 900, height: 1200 },
  { src: "/uploads/ac repair service in California  (13).jpeg", width: 900, height: 1200 },
  { src: "/uploads/AC REPAIR SERVICE (1).jpeg", width: 900, height: 1200 },
  { src: "/uploads/AC REPAIR SERVICE (2).jpeg", width: 900, height: 1200 },
  { src: "/uploads/AC REPAIR SERVICE (6).jpeg", width: 900, height: 1200 },
  { src: "/uploads/AC REPAIR SERVICE (8).jpeg", width: 900, height: 1200 },
  { src: "/uploads/AC REPAIR SERVICE (14).jpeg", width: 900, height: 1200 },
];

const REPAIR_IMAGES = [
  { src: "/uploads/ac-repair (1).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (2).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (3).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (4).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (5).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (6).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (7).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (8).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (9).jpeg", width: 1200, height: 900 },
  { src: "/uploads/ac-repair (10).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (1).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (2).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (3).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (4).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (5).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (6).jpeg", width: 1200, height: 900 },
  { src: "/uploads/hvac repair service ac  (7).jpeg", width: 1200, height: 900 },
];

const INSTALL_IMAGES = [
  { src: "/uploads/ac-unit-installation (1).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (2).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (3).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (4).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (6).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (7).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (8).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (9).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (10).jpeg", width: 1152, height: 1536 },
  { src: "/uploads/ac-unit-installation (11).jpeg", width: 1152, height: 1536 },
];

function pick<T>(arr: T[], idx: number): T {
  return arr[idx % arr.length];
}

// ─── Region definitions ───────────────────────────────────────────────────────
type Region =
  | "sf-valley"
  | "greater-la"
  | "orange-county"
  | "ventura"
  | "santa-barbara"
  | "riverside"
  | "san-bernardino";

type CityEntry = {
  slug: string;
  name: string;
  region: Region;
  county: string;
  /** Override blurb — used in localContext if provided */
  localNote?: string;
};

// ─── Full city list ───────────────────────────────────────────────────────────
// Existing hand-written slugs: pasadena, los-angeles, orange-county, malibu, santa-clarita, laguna-niguel
const GENERATED_CITIES: CityEntry[] = [
  // San Fernando Valley
  { slug: "north-hollywood", name: "North Hollywood", region: "sf-valley", county: "Los Angeles County" },
  { slug: "van-nuys", name: "Van Nuys", region: "sf-valley", county: "Los Angeles County" },
  { slug: "sherman-oaks", name: "Sherman Oaks", region: "sf-valley", county: "Los Angeles County" },
  { slug: "encino", name: "Encino", region: "sf-valley", county: "Los Angeles County" },
  { slug: "tarzana", name: "Tarzana", region: "sf-valley", county: "Los Angeles County" },
  { slug: "woodland-hills", name: "Woodland Hills", region: "sf-valley", county: "Los Angeles County" },
  { slug: "canoga-park", name: "Canoga Park", region: "sf-valley", county: "Los Angeles County" },
  { slug: "chatsworth", name: "Chatsworth", region: "sf-valley", county: "Los Angeles County" },
  { slug: "northridge", name: "Northridge", region: "sf-valley", county: "Los Angeles County" },
  { slug: "granada-hills", name: "Granada Hills", region: "sf-valley", county: "Los Angeles County" },
  { slug: "porter-ranch", name: "Porter Ranch", region: "sf-valley", county: "Los Angeles County" },
  { slug: "reseda", name: "Reseda", region: "sf-valley", county: "Los Angeles County" },
  { slug: "winnetka", name: "Winnetka", region: "sf-valley", county: "Los Angeles County" },
  { slug: "panorama-city", name: "Panorama City", region: "sf-valley", county: "Los Angeles County" },
  { slug: "pacoima", name: "Pacoima", region: "sf-valley", county: "Los Angeles County" },
  { slug: "sylmar", name: "Sylmar", region: "sf-valley", county: "Los Angeles County" },
  { slug: "sun-valley", name: "Sun Valley", region: "sf-valley", county: "Los Angeles County" },
  { slug: "studio-city", name: "Studio City", region: "sf-valley", county: "Los Angeles County" },
  { slug: "valley-village", name: "Valley Village", region: "sf-valley", county: "Los Angeles County" },
  { slug: "toluca-lake", name: "Toluca Lake", region: "sf-valley", county: "Los Angeles County" },
  { slug: "san-fernando", name: "San Fernando", region: "sf-valley", county: "Los Angeles County" },
  { slug: "burbank", name: "Burbank", region: "sf-valley", county: "Los Angeles County" },
  { slug: "glendale", name: "Glendale", region: "sf-valley", county: "Los Angeles County" },
  { slug: "calabasas", name: "Calabasas", region: "sf-valley", county: "Los Angeles County" },
  { slug: "hidden-hills", name: "Hidden Hills", region: "sf-valley", county: "Los Angeles County" },

  // Greater LA
  { slug: "long-beach", name: "Long Beach", region: "greater-la", county: "Los Angeles County" },
  { slug: "lancaster", name: "Lancaster", region: "greater-la", county: "Los Angeles County", localNote: "Lancaster's high desert climate brings extreme heat in summer — over 100°F regularly — plus cold winters, making year-round HVAC reliability critical." },
  { slug: "palmdale", name: "Palmdale", region: "greater-la", county: "Los Angeles County", localNote: "Palmdale's Antelope Valley location delivers some of the hottest summer temperatures in LA County, regularly exceeding 105°F, along with freezing winters." },
  { slug: "quartz-hill", name: "Quartz Hill", region: "greater-la", county: "Los Angeles County", localNote: "Quartz Hill's unincorporated high desert setting near Palmdale means intense summer heat and windy, dusty conditions that accelerate HVAC filter fouling." },
  { slug: "lake-los-angeles", name: "Lake Los Angeles", region: "greater-la", county: "Los Angeles County" },
  { slug: "castaic", name: "Castaic", region: "greater-la", county: "Los Angeles County" },
  { slug: "stevenson-ranch", name: "Stevenson Ranch", region: "greater-la", county: "Los Angeles County" },
  { slug: "acton", name: "Acton", region: "greater-la", county: "Los Angeles County" },
  { slug: "pomona", name: "Pomona", region: "greater-la", county: "Los Angeles County" },
  { slug: "torrance", name: "Torrance", region: "greater-la", county: "Los Angeles County" },
  { slug: "santa-monica", name: "Santa Monica", region: "greater-la", county: "Los Angeles County", localNote: "Santa Monica's coastal location keeps it cooler than inland LA, but salt air causes accelerated coil corrosion — a key maintenance concern for oceanfront properties." },
  { slug: "inglewood", name: "Inglewood", region: "greater-la", county: "Los Angeles County" },
  { slug: "compton", name: "Compton", region: "greater-la", county: "Los Angeles County" },
  { slug: "hawthorne", name: "Hawthorne", region: "greater-la", county: "Los Angeles County" },
  { slug: "whittier", name: "Whittier", region: "greater-la", county: "Los Angeles County" },
  { slug: "alhambra", name: "Alhambra", region: "greater-la", county: "Los Angeles County" },
  { slug: "downey", name: "Downey", region: "greater-la", county: "Los Angeles County" },
  { slug: "west-covina", name: "West Covina", region: "greater-la", county: "Los Angeles County" },
  { slug: "norwalk", name: "Norwalk", region: "greater-la", county: "Los Angeles County" },
  { slug: "carson", name: "Carson", region: "greater-la", county: "Los Angeles County" },
  { slug: "lakewood", name: "Lakewood", region: "greater-la", county: "Los Angeles County" },
  { slug: "bellflower", name: "Bellflower", region: "greater-la", county: "Los Angeles County" },
  { slug: "gardena", name: "Gardena", region: "greater-la", county: "Los Angeles County" },
  { slug: "glendora", name: "Glendora", region: "greater-la", county: "Los Angeles County" },
  { slug: "huntington-park", name: "Huntington Park", region: "greater-la", county: "Los Angeles County" },
  { slug: "la-mirada", name: "La Mirada", region: "greater-la", county: "Los Angeles County" },
  { slug: "la-verne", name: "La Verne", region: "greater-la", county: "Los Angeles County" },
  { slug: "lynwood", name: "Lynwood", region: "greater-la", county: "Los Angeles County" },
  { slug: "manhattan-beach", name: "Manhattan Beach", region: "greater-la", county: "Los Angeles County", localNote: "Manhattan Beach's oceanfront location means salt air corrosion is the primary HVAC threat — coastal homeowners should schedule annual coil cleaning." },
  { slug: "redondo-beach", name: "Redondo Beach", region: "greater-la", county: "Los Angeles County" },
  { slug: "hermosa-beach", name: "Hermosa Beach", region: "greater-la", county: "Los Angeles County" },
  { slug: "el-segundo", name: "El Segundo", region: "greater-la", county: "Los Angeles County" },
  { slug: "montebello", name: "Montebello", region: "greater-la", county: "Los Angeles County" },
  { slug: "monterey-park", name: "Monterey Park", region: "greater-la", county: "Los Angeles County" },
  { slug: "culver-city", name: "Culver City", region: "greater-la", county: "Los Angeles County" },
  { slug: "beverly-hills", name: "Beverly Hills", region: "greater-la", county: "Los Angeles County" },
  { slug: "west-hollywood", name: "West Hollywood", region: "greater-la", county: "Los Angeles County" },
  { slug: "rancho-palos-verdes", name: "Rancho Palos Verdes", region: "greater-la", county: "Los Angeles County", localNote: "Rancho Palos Verdes perches on coastal bluffs where salt air and marine layer keep temperatures mild but accelerate equipment corrosion." },
  { slug: "palos-verdes-estates", name: "Palos Verdes Estates", region: "greater-la", county: "Los Angeles County" },
  { slug: "san-dimas", name: "San Dimas", region: "greater-la", county: "Los Angeles County" },
  { slug: "san-gabriel", name: "San Gabriel", region: "greater-la", county: "Los Angeles County" },
  { slug: "san-marino", name: "San Marino", region: "greater-la", county: "Los Angeles County" },
  { slug: "santa-fe-springs", name: "Santa Fe Springs", region: "greater-la", county: "Los Angeles County" },
  { slug: "south-gate", name: "South Gate", region: "greater-la", county: "Los Angeles County" },
  { slug: "temple-city", name: "Temple City", region: "greater-la", county: "Los Angeles County" },
  { slug: "walnut", name: "Walnut", region: "greater-la", county: "Los Angeles County" },
  { slug: "westlake-village", name: "Westlake Village", region: "greater-la", county: "Los Angeles County" },
  { slug: "agoura-hills", name: "Agoura Hills", region: "greater-la", county: "Los Angeles County" },

  // Orange County
  { slug: "anaheim", name: "Anaheim", region: "orange-county", county: "Orange County" },
  { slug: "irvine", name: "Irvine", region: "orange-county", county: "Orange County" },
  { slug: "huntington-beach", name: "Huntington Beach", region: "orange-county", county: "Orange County", localNote: "Huntington Beach's surf city reputation comes with salt air — coastal homeowners need annual coil inspections to prevent corrosion-related failures." },
  { slug: "santa-ana", name: "Santa Ana", region: "orange-county", county: "Orange County" },
  { slug: "garden-grove", name: "Garden Grove", region: "orange-county", county: "Orange County" },
  { slug: "fullerton", name: "Fullerton", region: "orange-county", county: "Orange County" },
  { slug: "orange", name: "Orange", region: "orange-county", county: "Orange County" },
  { slug: "costa-mesa", name: "Costa Mesa", region: "orange-county", county: "Orange County" },
  { slug: "newport-beach", name: "Newport Beach", region: "orange-county", county: "Orange County", localNote: "Newport Beach's harbor and coastal setting means salt air corrosion is the dominant HVAC concern — especially for waterfront properties." },
  { slug: "mission-viejo", name: "Mission Viejo", region: "orange-county", county: "Orange County" },
  { slug: "lake-forest", name: "Lake Forest", region: "orange-county", county: "Orange County" },
  { slug: "tustin", name: "Tustin", region: "orange-county", county: "Orange County" },
  { slug: "yorba-linda", name: "Yorba Linda", region: "orange-county", county: "Orange County", localNote: "Yorba Linda's hillside homes and inland location produce summer temperatures regularly above 95°F — equipment works hard June through October." },
  { slug: "placentia", name: "Placentia", region: "orange-county", county: "Orange County" },
  { slug: "brea", name: "Brea", region: "orange-county", county: "Orange County" },
  { slug: "buena-park", name: "Buena Park", region: "orange-county", county: "Orange County" },
  { slug: "cypress", name: "Cypress", region: "orange-county", county: "Orange County" },
  { slug: "la-habra", name: "La Habra", region: "orange-county", county: "Orange County" },
  { slug: "la-palma", name: "La Palma", region: "orange-county", county: "Orange County" },
  { slug: "stanton", name: "Stanton", region: "orange-county", county: "Orange County" },
  { slug: "westminster", name: "Westminster", region: "orange-county", county: "Orange County" },
  { slug: "seal-beach", name: "Seal Beach", region: "orange-county", county: "Orange County" },
  { slug: "los-alamitos", name: "Los Alamitos", region: "orange-county", county: "Orange County" },
  { slug: "fountain-valley", name: "Fountain Valley", region: "orange-county", county: "Orange County" },
  { slug: "aliso-viejo", name: "Aliso Viejo", region: "orange-county", county: "Orange County" },
  { slug: "dana-point", name: "Dana Point", region: "orange-county", county: "Orange County" },
  { slug: "san-clemente", name: "San Clemente", region: "orange-county", county: "Orange County" },
  { slug: "san-juan-capistrano", name: "San Juan Capistrano", region: "orange-county", county: "Orange County" },
  { slug: "rancho-santa-margarita", name: "Rancho Santa Margarita", region: "orange-county", county: "Orange County" },
  { slug: "coto-de-caza", name: "Coto de Caza", region: "orange-county", county: "Orange County" },
  { slug: "ladera-ranch", name: "Ladera Ranch", region: "orange-county", county: "Orange County" },
  { slug: "foothill-ranch", name: "Foothill Ranch", region: "orange-county", county: "Orange County" },
  { slug: "villa-park", name: "Villa Park", region: "orange-county", county: "Orange County" },
  { slug: "anaheim-hills", name: "Anaheim Hills", region: "orange-county", county: "Orange County" },

  // Ventura County
  { slug: "oxnard", name: "Oxnard", region: "ventura", county: "Ventura County", localNote: "Oxnard's coastal-meets-agricultural setting brings salt air near the beach and dusty conditions inland — both hard on HVAC equipment." },
  { slug: "thousand-oaks", name: "Thousand Oaks", region: "ventura", county: "Ventura County" },
  { slug: "simi-valley", name: "Simi Valley", region: "ventura", county: "Ventura County", localNote: "Simi Valley's valley topography traps heat in summer — temperatures regularly exceed 95°F, and Santa Ana wind events can push units into overdrive." },
  { slug: "ventura", name: "Ventura", region: "ventura", county: "Ventura County" },
  { slug: "camarillo", name: "Camarillo", region: "ventura", county: "Ventura County" },
  { slug: "moorpark", name: "Moorpark", region: "ventura", county: "Ventura County" },
  { slug: "santa-paula", name: "Santa Paula", region: "ventura", county: "Ventura County" },
  { slug: "fillmore", name: "Fillmore", region: "ventura", county: "Ventura County" },
  { slug: "port-hueneme", name: "Port Hueneme", region: "ventura", county: "Ventura County" },
  { slug: "ojai", name: "Ojai", region: "ventura", county: "Ventura County", localNote: "Ojai's inland valley setting produces some of Ventura County's hottest summer temperatures, often 10–15°F hotter than the coast." },
  { slug: "oak-park", name: "Oak Park", region: "ventura", county: "Ventura County" },

  // Santa Barbara County
  { slug: "santa-barbara", name: "Santa Barbara", region: "santa-barbara", county: "Santa Barbara County", localNote: "Santa Barbara's Mediterranean climate is mild year-round, but salt air from the Pacific accelerates coil corrosion — especially for properties near the waterfront." },
  { slug: "santa-maria", name: "Santa Maria", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "goleta", name: "Goleta", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "lompoc", name: "Lompoc", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "carpinteria", name: "Carpinteria", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "solvang", name: "Solvang", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "buellton", name: "Buellton", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "orcutt", name: "Orcutt", region: "santa-barbara", county: "Santa Barbara County" },
  { slug: "montecito", name: "Montecito", region: "santa-barbara", county: "Santa Barbara County", localNote: "Montecito's exclusive hillside estates require careful, low-disruption service — our technicians work quietly and cleanly around luxury properties." },
  { slug: "santa-ynez", name: "Santa Ynez", region: "santa-barbara", county: "Santa Barbara County" },

  // Riverside County
  { slug: "riverside", name: "Riverside", region: "riverside", county: "Riverside County", localNote: "Riverside's inland location produces relentless summer heat — 100°F+ days are routine from June through September, making AC reliability non-negotiable." },
  { slug: "corona", name: "Corona", region: "riverside", county: "Riverside County" },
  { slug: "moreno-valley", name: "Moreno Valley", region: "riverside", county: "Riverside County" },
  { slug: "temecula", name: "Temecula", region: "riverside", county: "Riverside County" },
  { slug: "murrieta", name: "Murrieta", region: "riverside", county: "Riverside County" },
  { slug: "menifee", name: "Menifee", region: "riverside", county: "Riverside County" },
  { slug: "perris", name: "Perris", region: "riverside", county: "Riverside County" },
  { slug: "hemet", name: "Hemet", region: "riverside", county: "Riverside County", localNote: "Hemet's inland valley location delivers extreme summer heat with limited coastal relief — AC failures here can become dangerous quickly for vulnerable residents." },
  { slug: "san-jacinto", name: "San Jacinto", region: "riverside", county: "Riverside County" },
  { slug: "lake-elsinore", name: "Lake Elsinore", region: "riverside", county: "Riverside County" },
  { slug: "wildomar", name: "Wildomar", region: "riverside", county: "Riverside County" },
  { slug: "canyon-lake", name: "Canyon Lake", region: "riverside", county: "Riverside County" },
  { slug: "palm-springs", name: "Palm Springs", region: "riverside", county: "Riverside County", localNote: "Palm Springs sees summer temperatures above 110°F routinely — AC systems here work harder than almost anywhere else in California and require frequent maintenance." },
  { slug: "palm-desert", name: "Palm Desert", region: "riverside", county: "Riverside County", localNote: "Palm Desert's desert climate demands heavy-duty equipment sized for extreme heat loads — systems that work fine in coastal CA will fail prematurely here without proper sizing." },
  { slug: "cathedral-city", name: "Cathedral City", region: "riverside", county: "Riverside County" },
  { slug: "rancho-mirage", name: "Rancho Mirage", region: "riverside", county: "Riverside County" },
  { slug: "indio", name: "Indio", region: "riverside", county: "Riverside County" },
  { slug: "coachella", name: "Coachella", region: "riverside", county: "Riverside County" },
  { slug: "la-quinta", name: "La Quinta", region: "riverside", county: "Riverside County" },
  { slug: "desert-hot-springs", name: "Desert Hot Springs", region: "riverside", county: "Riverside County" },
  { slug: "banning", name: "Banning", region: "riverside", county: "Riverside County" },
  { slug: "beaumont", name: "Beaumont", region: "riverside", county: "Riverside County" },
  { slug: "calimesa", name: "Calimesa", region: "riverside", county: "Riverside County" },
  { slug: "norco", name: "Norco", region: "riverside", county: "Riverside County" },
  { slug: "eastvale", name: "Eastvale", region: "riverside", county: "Riverside County" },
  { slug: "jurupa-valley", name: "Jurupa Valley", region: "riverside", county: "Riverside County" },

  // San Bernardino County
  { slug: "san-bernardino", name: "San Bernardino", region: "san-bernardino", county: "San Bernardino County", localNote: "San Bernardino's inland basin location traps heat — summer temperatures routinely exceed 100°F and hot spells can last weeks, stressing residential AC systems." },
  { slug: "fontana", name: "Fontana", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "rancho-cucamonga", name: "Rancho Cucamonga", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "ontario", name: "Ontario", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "victorville", name: "Victorville", region: "san-bernardino", county: "San Bernardino County", localNote: "Victorville's high desert setting means brutal summer heat over 100°F plus genuinely cold winters — residents here need reliable heating and cooling year-round." },
  { slug: "rialto", name: "Rialto", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "colton", name: "Colton", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "hesperia", name: "Hesperia", region: "san-bernardino", county: "San Bernardino County", localNote: "Hesperia's high desert climate matches Victorville — scorching summers and freezing winters demand robust HVAC equipment and regular service." },
  { slug: "apple-valley", name: "Apple Valley", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "redlands", name: "Redlands", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "upland", name: "Upland", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "chino", name: "Chino", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "chino-hills", name: "Chino Hills", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "yucaipa", name: "Yucaipa", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "montclair", name: "Montclair", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "loma-linda", name: "Loma Linda", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "highland", name: "Highland", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "grand-terrace", name: "Grand Terrace", region: "san-bernardino", county: "San Bernardino County" },
  { slug: "twentynine-palms", name: "Twentynine Palms", region: "san-bernardino", county: "San Bernardino County", localNote: "Twentynine Palms sits at the edge of the Mojave Desert — summer heat routinely exceeds 110°F, the most extreme conditions we service." },
  { slug: "yucca-valley", name: "Yucca Valley", region: "san-bernardino", county: "San Bernardino County", localNote: "Yucca Valley's high desert location near Joshua Tree brings extreme heat in summer and cold nights year-round — equipment sizing and insulation matter here." },
  { slug: "barstow", name: "Barstow", region: "san-bernardino", county: "San Bernardino County", localNote: "Barstow sits in the Mojave Desert with summer highs regularly above 105°F — one of the harshest environments for HVAC equipment in Southern California." },
];

// ─── Region climate / content templates ──────────────────────────────────────
const REGION_CLIMATE: Record<Region, string> = {
  "sf-valley": "The San Fernando Valley is one of Los Angeles's hottest regions — summer temperatures regularly reach 100°F or higher in neighborhoods away from the coast, and heat waves can be prolonged. The Valley floor traps heat, and homes without functioning AC can reach dangerous indoor temperatures within hours of a breakdown.",
  "greater-la": "The greater Los Angeles area experiences a wide range of climate conditions — from mild coastal zones to significantly hotter inland neighborhoods. Summer heat waves can push temperatures well above 90°F even in typically mild areas, and Santa Ana wind events accelerate AC stress. Most LA-area homes run their AC from May through October.",
  "orange-county": "Orange County's climate ranges from mild and marine-influenced near the coast to consistently hot in inland communities. Coastal cities can see salt air corrosion year-round, while inland areas like Yorba Linda, Anaheim Hills, and Orange experience summer temperatures routinely above 95°F. Equipment works hard from June through September.",
  "ventura": "Ventura County's climate is split — coastal cities enjoy mild, marine-influenced conditions while inland valleys like Simi Valley and the Santa Clara River corridor see summer temperatures regularly above 95°F. Salt air near the coast accelerates coil corrosion, and Santa Ana winds bring heat spikes even to normally cool areas.",
  "santa-barbara": "Santa Barbara County's Mediterranean climate is generally mild, but inland areas experience significantly higher summer temperatures. Coastal properties face ongoing salt air corrosion issues. The county also experiences heat events and the occasional Diablo wind, which can drive unexpected summer stress on equipment.",
  "riverside": "Riverside County spans multiple climate zones — from semi-arid inland communities near the county seat to the extreme desert heat of the Coachella Valley, where summer temperatures routinely exceed 110°F. Year-round HVAC reliability is critical here; a breakdown in mid-summer can be genuinely dangerous.",
  "san-bernardino": "San Bernardino County covers terrain from the Inland Empire's hot valley floors to the high desert communities of the Victor Valley and Mojave. Summer temperatures regularly exceed 100°F across most of the county, while high desert areas like Victorville and Hesperia add genuinely cold winters to the challenge.",
};

const REGION_COMMON_PROBLEMS: Record<Region, string> = {
  "sf-valley": "Common HVAC calls in the San Fernando Valley involve capacitor failures from systems running near-continuously in summer, refrigerant leaks in aging equipment, and blower motor issues caused by dust and debris pulled from canyon-adjacent air. Older ranch homes with original ductwork also suffer from airflow imbalances and hot rooms.",
  "greater-la": "AC repair calls across Greater LA most often involve capacitor and contactor failures, refrigerant charge issues, and drainage problems from high-humidity summer nights. Coastal properties see additional corrosion-related failures on condenser coils. Homes with older ductwork suffer from airflow restrictions and uneven cooling.",
  "orange-county": "Orange County AC repairs most often involve capacitor failures, refrigerant leaks, and dirty evaporator coils in systems that run heavily from June through September. Coastal properties also see salt-air corrosion on condenser fins. Inland hillside homes with multiple zones can develop airflow and static pressure issues.",
  "ventura": "Common HVAC issues in Ventura County include capacitor failures during summer peaks, corrosion on coastal-property condenser coils, and blower motor problems from valley dust. Inland homes in Simi Valley and Moorpark often have systems sized for gentler climates that struggle during heat waves.",
  "santa-barbara": "In Santa Barbara County, salt air corrosion is the leading cause of premature HVAC failure near the coast. Inland areas see more heat-related electrical failures — capacitors, contactors, and run capacitors — during summer peaks. Older homes throughout the county often have undersized or deteriorating ductwork.",
  "riverside": "The most frequent HVAC calls in Riverside County involve complete system failures during heat waves — often due to failed capacitors, seized compressors, or refrigerant leaks in equipment pushed beyond its limits. The Coachella Valley's extreme heat demands premium equipment; consumer-grade systems simply fail faster here.",
  "san-bernardino": "San Bernardino County's AC calls peak during summer heat waves, when capacitor failures, refrigerant leaks, and compressor overheating are most common. High desert communities add freeze-ups in winter and wind-driven debris clogging outdoor units. Older homes in the Inland Empire often have undersized systems that can't handle peak loads.",
};

const REGION_HOMEOWNER_CONCERNS: Record<Region, string> = {
  "sf-valley": "Valley homeowners worry most about summer breakdowns during triple-digit heat waves, unexpected repair costs on aging equipment, and whether their older system is worth repairing or should be replaced. Many also ask about energy efficiency upgrades and whether zoning or mini-splits could solve hot room problems.",
  "greater-la": "Greater LA homeowners are most concerned about the cost of repairs vs. replacement on aging systems, energy bill spikes during heat events, and finding a reliable contractor who won't upsell them into an unnecessary replacement. Many also ask about mini-split options for additions and rooms without existing ductwork.",
  "orange-county": "Orange County homeowners ask most often about repair vs. replacement decisions on 10–15-year-old systems, energy efficiency and utility bill savings, and response times during summer heat waves. Coastal homeowners frequently ask about corrosion-resistant equipment and more frequent maintenance schedules.",
  "ventura": "Ventura County homeowners are concerned about the cost and reliability of systems that must handle both summer heat and some winter chill, finding contractors who service their less-dense area promptly, and whether their equipment was properly sized for local conditions — a common issue in newer tract developments.",
  "santa-barbara": "Santa Barbara County homeowners — especially coastal residents — worry about corrosion damage to their equipment, the cost of regular maintenance to extend system life, and finding skilled contractors who handle high-end homes with care. Inland homeowners focus more on heat-season reliability and system sizing.",
  "riverside": "Riverside County homeowners are most concerned about system reliability during extreme summer heat when failure is a health risk, the higher cost of equipment capable of handling extreme loads, and finding a contractor who can respond quickly during regional heat emergencies when demand spikes.",
  "san-bernardino": "San Bernardino County homeowners focus on reliability during summer heat events, energy costs from systems running at peak load for months, and proper sizing — a particular concern after buying a home where the previous owner installed an undersized unit. High desert residents also ask about heating reliability in winter.",
};

// ─── Content generators ───────────────────────────────────────────────────────
function repairBody(city: CityEntry): string {
  const heatNote = ["riverside", "san-bernardino"].includes(city.region)
    ? `In ${city.county}'s extreme heat, a broken AC is an urgent health issue — not just an inconvenience.`
    : `When your AC breaks down in ${city.name}, fast diagnosis is critical.`;
  return `${heatNote} Our technicians arrive with a fully stocked van and diagnose the issue on the first visit. We repair all major brands — Lennox, Carrier, Trane, Goodman, Rheem, York — and most repairs are completed the same day. Common repairs include capacitor and contactor replacement, refrigerant recharge, evaporator coil cleaning, blower motor repair, and condensate drain clearing.`;
}

function installBody(city: CityEntry): string {
  return `Replacing an aging AC system in ${city.name} pays off quickly given the long Southern California cooling season. We perform a proper Manual J load calculation before recommending equipment — so your new system is sized for your home's actual heat load, not just a rough estimate. We install Lennox, Trane, and Goodman systems with full manufacturer warranties, and we handle all permits and city inspections required in ${city.county}.`;
}

function emergencyBody(city: CityEntry): string {
  const urgency = ["riverside", "san-bernardino"].includes(city.region)
    ? `In ${city.name}'s heat, a broken AC can become a medical emergency within hours for elderly residents, children, and pets.`
    : `An AC breakdown during a ${city.name} heat wave can escalate fast — especially for vulnerable household members.`;
  return `${urgency} We prioritize emergency calls and offer extended weekend availability. When you call (714) 410-2784, a real person answers — not a voicemail or automated system. We'll give you an honest ETA and dispatch the nearest available technician.`;
}

function whyUsPoints(city: CityEntry): PPCCity["whyUsPoints"] {
  return [
    {
      heading: `Serving ${city.county}`,
      body: `Our technicians are familiar with ${city.county}'s housing stock, permit requirements, and the HVAC brands most common in the area. We're not a national franchise — we're a local company that depends on referrals.`,
    },
    {
      heading: "Same-Day Service Available",
      body: `We keep our schedule flexible to accommodate emergency calls throughout ${city.name} and surrounding areas. Most customers calling before noon get a same-day appointment.`,
    },
    {
      heading: "Transparent Flat-Rate Pricing",
      body: "You receive a written quote before any work begins. No surprise charges, no upselling to a replacement when a repair is the right call. Free diagnostic on every service call.",
    },
    {
      heading: "Licensed, Insured, Background-Checked",
      body: "Every technician is California-licensed, fully insured, and background-checked before entering your home. We carry liability coverage and workers' compensation on every job.",
    },
  ];
}

function faqs(city: CityEntry): PPCCity["faqs"] {
  return [
    {
      question: `How quickly can you respond to an AC emergency in ${city.name}?`,
      answer: `For emergency calls in ${city.name}, we aim for same-day service — often within 2–4 hours during regular business hours. Weekend and evening availability is offered for urgent situations where indoor temperatures are dangerously high.`,
    },
    {
      question: `My AC is running but not cooling my ${city.name} home — what's wrong?`,
      answer: `The most common causes are low refrigerant (from a leak), a dirty evaporator coil blocking airflow, a failing capacitor preventing the compressor from reaching full power, or a clogged condensate drain causing a safety shutoff. Our technician diagnoses the specific issue on the first visit.`,
    },
    {
      question: `Is it worth repairing or replacing my AC system in ${city.name}?`,
      answer: `If your system is under 10 years old, a repair is usually the right call. If it's over 12–15 years old and facing a major repair, replacement often makes more financial sense — especially given the energy savings from modern high-efficiency equipment. We'll give you an honest assessment, not just recommend the option with the higher ticket price.`,
    },
    {
      question: `Do you offer financing for AC installation in ${city.name}?`,
      answer: `Yes — we offer flexible financing options including 0% interest promotions for qualified buyers. Ask about current offers when you request your free estimate.`,
    },
  ];
}

function reviews(city: CityEntry): PPCCity["reviews"] {
  const [first, last] = [
    ["Maria", "David", "Jennifer", "Robert", "Lisa", "Michael", "Karen", "James"],
    ["T.", "K.", "L.", "M.", "R.", "S.", "W.", "H."],
  ];
  const idx = city.slug.length % first.length;
  return [
    {
      name: `${first[idx]} ${last[idx]}`,
      location: `${city.name}, CA`,
      body: `Called on a Saturday morning when our AC stopped working. Technician arrived within 3 hours, diagnosed a failed capacitor, and had us cooling again before noon. Exactly what you want in a heat emergency.`,
      rating: 5,
    },
    {
      name: `${first[(idx + 2) % first.length]} ${last[(idx + 3) % last.length]}`,
      location: `${city.name}, CA`,
      body: `Very professional and honest. The tech explained what was wrong, gave me options, and didn't pressure me toward the most expensive fix. The repair held and I've since referred two neighbors.`,
      rating: 5,
    },
    {
      name: `${first[(idx + 5) % first.length]} ${last[(idx + 1) % last.length]}`,
      location: `${city.name}, CA`,
      body: `Had three other companies give me quotes — this one was the most transparent about pricing and didn't try to upsell me on a new system when a repair was clearly the right call. Will use again.`,
      rating: 5,
    },
  ];
}

// ─── Main generator ───────────────────────────────────────────────────────────
export function generatePPCCities(existingSlugs: Set<string>): PPCCity[] {
  return GENERATED_CITIES.filter((c) => !existingSlugs.has(c.slug)).map(
    (city, i): PPCCity => ({
      slug: city.slug,
      name: city.name,
      state: "CA",
      heroImage: {
        ...pick(HERO_IMAGES, i),
        alt: `AC repair and HVAC service in ${city.name}, CA`,
      },
      repairImage: {
        ...pick(REPAIR_IMAGES, i),
        alt: `AC repair service in ${city.name}, CA`,
      },
      installImage: {
        ...pick(INSTALL_IMAGES, i),
        alt: `New AC installation in ${city.name}, CA`,
      },
      metaTitle: `AC Repair & HVAC Service in ${city.name}, CA — Same-Day Service`,
      metaDescription: `Expert AC repair, installation & HVAC service in ${city.name}, CA. Same-day availability. Free estimates on replacements. Call (714) 410-2784 — we answer 7 days a week.`,
      h1: `AC Repair & HVAC Service in ${city.name}, CA`,
      heroSubheadline: `Same-day AC repair, system replacement & HVAC maintenance for ${city.name} homes. Licensed technicians — real people answer your call 7 days a week.`,
      climate: REGION_CLIMATE[city.region],
      commonProblems: REGION_COMMON_PROBLEMS[city.region],
      homeownerConcerns: REGION_HOMEOWNER_CONCERNS[city.region],
      localContext:
        city.localNote ??
        `We serve all of ${city.name} and the surrounding ${city.county} area. Our technicians are familiar with local building styles and permit requirements, and we can often arrive the same day you call.`,
      repairBody: repairBody(city),
      installBody: installBody(city),
      emergencyBody: emergencyBody(city),
      whyUsPoints: whyUsPoints(city),
      faqs: faqs(city),
      reviews: reviews(city),
    }),
  );
}

export function getAllGeneratedSlugs(): string[] {
  return GENERATED_CITIES.map((c) => c.slug);
}
