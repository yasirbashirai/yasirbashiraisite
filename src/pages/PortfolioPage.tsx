import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Navbar from "@/components/Navbar";
import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import FloatingSocials from "@/components/FloatingSocials";
import WhatsAppChatbot from "@/components/WhatsAppChatbot";
import IncomingCallPopup from "@/components/IncomingCallPopup";

const PortfolioPage = () => {
  useDocumentMeta({
    title: "Portfolio — Web Apps, AI Systems & Logistics Builds | Yasir Bashir",
    description:
      "Real projects across web apps, AI automation, logistics platforms, CRM systems and SaaS products. See case studies, before/after results and the stack used.",
    canonical: "https://yasirbashir.com/portfolio",
  });

  return (
    <div className="min-h-screen relative">
      <div className="grid-background" aria-hidden="true" />
      <Navbar />
      <FloatingSocials />
      <WhatsAppChatbot />
      <IncomingCallPopup />
      <main className="relative z-10 pt-24">
        <Portfolio />
      </main>
      <Footer />
    </div>
  );
};

export default PortfolioPage;
