import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import VSLSection from "@/components/VSLSection";
import AboutMe from "@/components/AboutMe";
import StatsSection from "@/components/StatsSection";
import ToolCarousel from "@/components/ToolCarousel";
import RealityCheck from "@/components/RealityCheck";
import ServicesGrid from "@/components/ServicesGrid";
import StrugglesVsSolutions from "@/components/StrugglesVsSolutions";
import Blueprint from "@/components/Blueprint";
import GrowthFunnel from "@/components/GrowthFunnel";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import FAQSection from "@/components/FAQSection";
import FinalCTA from "@/components/FinalCTA";
import CalculatorCTA from "@/components/CalculatorCTA";
import AffiliateSection from "@/components/AffiliateSection";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import IncomingCallPopup from "@/components/IncomingCallPopup";

const ambientIcons = ["🤖", "⚙️", "🧠", "💡", "📊", "🔗", "🚀", "💬", "📧", "🎯"];

const Index = () => {
  useDocumentMeta({
    title: "Yasir Bashir — AI Automation Engineer & Web App Builder",
    description:
      "AI-first websites, automation systems and growth funnels for ambitious founders & agencies. n8n, GoHighLevel, OpenAI & Claude APIs. Book a free 1:1 strategy call.",
    canonical: "https://yasirbashir.com/",
  });
  return (
  <div className="min-h-screen relative">
    {/* Grid + glow background */}
    <div className="grid-background" aria-hidden="true" />

    {/* Ambient floating icons across all sections */}
    <div className="floating-icons-fixed" aria-hidden="true">
      {ambientIcons.map((icon, i) => (
        <span key={i} className={`floating-icon floating-icon-${i}`}>
          {icon}
        </span>
      ))}
    </div>

    <Navbar />
    <FloatingSocials />
    <WhatsAppChatbot />
    <IncomingCallPopup />
    <main className="relative z-10">
      <Hero />
      <VSLSection />
      <AboutMe />
      <StatsSection />
      <ToolCarousel />
      <RealityCheck />
      <ServicesGrid />
      <CalculatorCTA />
      <StrugglesVsSolutions />
      <Blueprint />
      <GrowthFunnel />
      <Testimonials />
      <Pricing />
      <FAQSection />
      <FinalCTA />
      <AffiliateSection />
    </main>
    <Footer />
  </div>
  );
};

export default Index;
