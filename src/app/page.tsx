import GNB from "@/components/GNB";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import BusinessSection from "@/components/sections/BusinessSection";
import StatsSection from "@/components/sections/StatsSection";
import NewsSection from "@/components/sections/NewsSection";
import CTASection from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <div className="relative flex flex-col items-start overflow-x-hidden bg-[var(--bg-white)]">
      {/* Global Navigation (absolute, overlays hero) */}
      <GNB />

      {/* Main content */}
      <main className="flex flex-col w-full">
        <HeroSection />
        <BusinessSection />
        <StatsSection />
        <NewsSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
}
