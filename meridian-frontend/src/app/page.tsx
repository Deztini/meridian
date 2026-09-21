import { HeroSection } from "@/features/home/components/hero-section";
import { HomeNavbar } from "@/features/home/components/home-navbar";
import { HowItWorksSection } from "@/features/home/components/howitworks-section";
import { IngestionSection } from "@/features/home/components/ingestion-section";
import { IntegrateSection } from "@/features/home/components/integrate-section";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <HeroSection />
      <HowItWorksSection />
      <IntegrateSection />
      <IngestionSection />
    </div>
  );
}
