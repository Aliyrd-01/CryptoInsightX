import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import TradingAnalyzerSection from "@/components/TradingAnalyzerSection";
import ArbitrageToolSection from "@/components/ArbitrageToolSection";
import StatsSection from "@/components/StatsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <TradingAnalyzerSection />
      <ArbitrageToolSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
