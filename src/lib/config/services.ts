export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  description: string;
  icon: string;
  category: "cooling" | "heating" | "ductwork" | "commercial" | "specialty";
  featured: boolean;
};

export const SERVICES: Service[] = [
  {
    slug: "ac-repair",
    title: "AC Repair",
    shortTitle: "AC Repair",
    tagline: "Fast, reliable air conditioner repair across Orange County",
    description:
      "Same-day and emergency AC repair for all makes and models. Our trained HVAC technicians diagnose and fix refrigerant leaks, compressor failures, electrical faults, frozen coils, and more.",
    icon: "wrench",
    category: "cooling",
    featured: true,
  },
  {
    slug: "ac-installation",
    title: "AC Installation & Replacement",
    shortTitle: "AC Installation",
    tagline: "Energy-efficient AC systems sized and installed correctly",
    description:
      "Professional installation of central air conditioners, heat pumps, and ductless systems. We perform Manual J load calculations to ensure the right-sized equipment for your home or business.",
    icon: "install",
    category: "cooling",
    featured: true,
  },
  {
    slug: "hvac-maintenance",
    title: "HVAC Maintenance & Tune-Up",
    shortTitle: "HVAC Maintenance",
    tagline: "Preventive maintenance that extends equipment life",
    description:
      "Seasonal tune-ups, filter changes, coil cleaning, refrigerant checks, and full system inspections. Regular maintenance reduces breakdowns, lowers energy bills, and preserves manufacturer warranties.",
    icon: "checkmark",
    category: "cooling",
    featured: true,
  },
  {
    slug: "ductless-mini-split",
    title: "Ductless Mini-Split Systems",
    shortTitle: "Ductless Systems",
    tagline: "Zone-by-zone comfort without ductwork",
    description:
      "Installation, repair, and maintenance of ductless mini-split systems. Ideal for room additions, garages, older homes, and buildings without existing ductwork.",
    icon: "split",
    category: "cooling",
    featured: true,
  },
  {
    slug: "commercial-hvac",
    title: "Commercial HVAC Services",
    shortTitle: "Commercial HVAC",
    tagline: "Commercial heating and cooling for Orange County businesses",
    description:
      "Rooftop units, split systems, and packaged HVAC for offices, retail spaces, restaurants, and industrial facilities. We handle installation, maintenance contracts, and emergency repair.",
    icon: "building",
    category: "commercial",
    featured: true,
  },
  {
    slug: "air-duct-cleaning",
    title: "Air Duct Cleaning",
    shortTitle: "Duct Cleaning",
    tagline: "Cleaner air, better airflow, lower energy costs",
    description:
      "Professional air duct cleaning removes dust, debris, allergens, and mold from your HVAC ductwork. Recommended every 3–5 years or after renovation, pest infestation, or visible contamination.",
    icon: "duct",
    category: "ductwork",
    featured: true,
  },
  {
    slug: "air-duct-repair",
    title: "Air Duct Repair & Sealing",
    shortTitle: "Duct Repair",
    tagline: "Stop energy loss from leaky or damaged ductwork",
    description:
      "Leaky ducts can waste 20–30% of your conditioned air. We locate and seal duct leaks, repair damaged sections, and restore proper airflow throughout your home or building.",
    icon: "repair",
    category: "ductwork",
    featured: false,
  },
  {
    slug: "air-duct-installation",
    title: "Air Duct Installation",
    shortTitle: "Duct Installation",
    tagline: "New ductwork designed for maximum efficiency",
    description:
      "Custom duct design and installation for new construction and remodels. Properly sized and sealed duct systems reduce energy consumption and improve indoor air quality.",
    icon: "install",
    category: "ductwork",
    featured: false,
  },
  {
    slug: "furnace-repair",
    title: "Furnace Repair",
    shortTitle: "Furnace Repair",
    tagline: "Reliable furnace repair when you need it most",
    description:
      "Diagnosis and repair of gas and electric furnaces, including igniter failures, heat exchanger cracks, blower motor issues, and thermostat malfunctions. Same-day service available.",
    icon: "flame",
    category: "heating",
    featured: false,
  },
  {
    slug: "furnace-installation",
    title: "Furnace Installation & Replacement",
    shortTitle: "Furnace Installation",
    tagline: "High-efficiency furnaces installed by trained HVAC technicians",
    description:
      "Replacement and new installation of gas and electric furnaces. We help you choose the right efficiency rating and capacity for your climate and home size.",
    icon: "install",
    category: "heating",
    featured: false,
  },
  {
    slug: "heat-pump-repair",
    title: "Heat Pump Repair",
    shortTitle: "Heat Pump Repair",
    tagline: "Expert heat pump repair for year-round comfort",
    description:
      "Heat pumps serve as both heaters and air conditioners. We diagnose and repair refrigerant issues, reversing valve failures, defrost cycle problems, and compressor faults.",
    icon: "pump",
    category: "heating",
    featured: false,
  },
  {
    slug: "heat-pump-installation",
    title: "Heat Pump Installation",
    shortTitle: "Heat Pump Installation",
    tagline: "Modern heat pump systems for efficient year-round comfort",
    description:
      "Installation of air-source and dual-fuel heat pump systems. Heat pumps are ideal for Southern California's mild climate, delivering up to 300% efficiency compared to electric resistance heating.",
    icon: "install",
    category: "heating",
    featured: false,
  },
  {
    slug: "indoor-air-quality",
    title: "Indoor Air Quality Solutions",
    shortTitle: "Indoor Air Quality",
    tagline: "Breathe cleaner, healthier air at home or work",
    description:
      "UV air purifiers, HEPA filtration, whole-home humidifiers, dehumidifiers, and air quality testing. Improving IAQ reduces allergens, VOCs, bacteria, and respiratory irritants.",
    icon: "air",
    category: "specialty",
    featured: false,
  },
  {
    slug: "thermostat-installation",
    title: "Smart Thermostat Installation",
    shortTitle: "Smart Thermostat",
    tagline: "Smart thermostats that pay for themselves in energy savings",
    description:
      "Installation and programming of Nest, Ecobee, Honeywell, and other smart thermostats. Proper configuration ensures your HVAC system runs at peak efficiency.",
    icon: "thermostat",
    category: "specialty",
    featured: false,
  },
  {
    slug: "emergency-hvac",
    title: "Emergency HVAC Service",
    shortTitle: "Emergency Service",
    tagline: "24/7 emergency HVAC repair across Orange County",
    description:
      "When your AC or heater fails at the worst time, we're available. Emergency response for residential and commercial customers throughout Orange County and surrounding areas.",
    icon: "emergency",
    category: "specialty",
    featured: false,
  },
  {
    slug: "hvac-inspection",
    title: "HVAC System Inspection",
    shortTitle: "HVAC Inspection",
    tagline: "Comprehensive HVAC inspection for home buyers and owners",
    description:
      "Pre-purchase and general HVAC system inspections covering age, condition, efficiency, safety, and remaining useful life. Includes written report and repair recommendations.",
    icon: "inspect",
    category: "specialty",
    featured: false,
  },
  {
    slug: "refrigerant-recharge",
    title: "Refrigerant Recharge & Leak Repair",
    shortTitle: "Refrigerant Service",
    tagline: "Restore cooling performance with proper refrigerant service",
    description:
      "EPA-certified refrigerant handling for R-22, R-410A, and R-32 systems. We locate and repair refrigerant leaks before recharging to prevent recurrence.",
    icon: "tank",
    category: "cooling",
    featured: false,
  },
  {
    slug: "coil-cleaning",
    title: "Evaporator & Condenser Coil Cleaning",
    shortTitle: "Coil Cleaning",
    tagline: "Dirty coils cost you money — clean coils restore efficiency",
    description:
      "Professional cleaning of evaporator and condenser coils using industry-approved coil cleaners. Clean coils improve efficiency, restore cooling capacity, and extend compressor life.",
    icon: "clean",
    category: "cooling",
    featured: false,
  },
  {
    slug: "commercial-refrigeration",
    title: "Commercial Refrigeration",
    shortTitle: "Commercial Refrigeration",
    tagline: "Walk-in coolers, freezers, and display case service",
    description:
      "Service, repair, and installation of commercial refrigeration equipment including walk-in coolers, freezers, reach-in units, and display cases for restaurants and retail.",
    icon: "fridge",
    category: "commercial",
    featured: false,
  },
  {
    slug: "hvac-zoning",
    title: "HVAC Zoning Systems",
    shortTitle: "HVAC Zoning",
    tagline: "Independent climate control for every room",
    description:
      "Design and installation of HVAC zoning systems that allow different areas of your home or building to be heated or cooled independently for maximum comfort and efficiency.",
    icon: "zone",
    category: "specialty",
    featured: false,
  },
  {
    slug: "ventilation",
    title: "Ventilation & Exhaust Services",
    shortTitle: "Ventilation",
    tagline: "Proper ventilation for health, comfort, and code compliance",
    description:
      "Installation and repair of whole-house ventilation, HRV/ERV systems, bathroom and kitchen exhaust fans, and attic ventilation. Proper ventilation is critical for indoor air quality.",
    icon: "vent",
    category: "specialty",
    featured: false,
  },
  {
    slug: "dryer-vent-cleaning",
    title: "Dryer Vent Cleaning",
    shortTitle: "Dryer Vent Cleaning",
    tagline: "Reduce fire risk and improve dryer performance",
    description:
      "Professional dryer vent cleaning removes lint buildup that causes fires, extends drying time, and increases energy consumption. Recommended annually for most households.",
    icon: "dryer",
    category: "ductwork",
    featured: false,
  },
];

export const FEATURED_SERVICES = SERVICES.filter((s) => s.featured);
export const SERVICE_CATEGORIES = [
  "cooling",
  "heating",
  "ductwork",
  "commercial",
  "specialty",
] as const;

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug);
}
