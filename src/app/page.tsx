import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo/metadata";
import { schemaHvacBusiness } from "@/lib/seo/schema";
import JsonLd from "@/components/ui/JsonLd";

import Hero from "@/components/home/Hero";
import HomeLeadForm from "@/components/home/HomeLeadForm";
import EmergencyStrip from "@/components/home/EmergencyStrip";
import ServicesGrid from "@/components/home/ServicesGrid";
import RepairVsInstall from "@/components/home/RepairVsInstall";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import MaintenancePlan from "@/components/home/MaintenancePlan";
import CommercialHvac from "@/components/home/CommercialHvac";
import ServiceAreaSection from "@/components/home/ServiceAreaSection";
import CalculatorTeaser from "@/components/home/CalculatorTeaser";
import GalleryPreview from "@/components/home/GalleryPreview";
import ReviewsSection from "@/components/home/ReviewsSection";
import FinancingCta from "@/components/home/FinancingCta";
import PromoSection from "@/components/home/PromoSection";
import HowItWorks from "@/components/home/HowItWorks";
import FaqSection from "@/components/home/FaqSection";
import CtaBand from "@/components/home/CtaBand";
import ConversionTrustBar from "@/components/ui/ConversionTrustBar";
import SummerBanner from "@/components/ui/SummerBanner";
import FinancingTeaser from "@/components/ui/FinancingTeaser";

export const metadata: Metadata = buildMetadata({
  title: "AC Repair & HVAC Service in Yorba Linda & Orange County, CA",
  description:
    "Local HVAC company based in Yorba Linda. Same-day AC repair, AC installation, heating, ductless systems, commercial HVAC, and air duct services across Orange County. Call (714) 410-2784.",
  path: "",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={schemaHvacBusiness()} />
      <Hero />
      <EmergencyStrip />
      {/* Trust bar immediately below hero for PPC + organic visitors */}
      <ConversionTrustBar variant="light" />
      <ServicesGrid />
      <RepairVsInstall />
      {/* Summer cooling season banner — seasonal relevance */}
      <SummerBanner />
      <WhyChooseUs />
      <MaintenancePlan />
      <CommercialHvac />
      <ServiceAreaSection />
      <CalculatorTeaser />
      {/* Lead form 2: mid-page */}
      <HomeLeadForm variant="mid" />
      <GalleryPreview />
      <ReviewsSection />
      <FinancingCta />
      {/* Financing teaser — visible before users reach /financing page */}
      <section className="py-6 bg-warm-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FinancingTeaser variant="inline" />
        </div>
      </section>
      <PromoSection />
      <HowItWorks />
      <FaqSection />
      {/* Lead form 3: above footer */}
      <HomeLeadForm variant="prefooter" />
      <CtaBand />
    </>
  );
}
