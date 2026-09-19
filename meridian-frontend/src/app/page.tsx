import { HeroSection } from "@/features/home/components/hero-section";
import { HomeNavbar } from "@/features/home/components/home-navbar";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HomeNavbar />
      <HeroSection />
    </div>
  );
}
