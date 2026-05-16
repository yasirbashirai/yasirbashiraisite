import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import PortfolioPage from "./pages/PortfolioPage";
import LogisticsSolutions from "./pages/LogisticsSolutions";
import LogisticsValue from "./pages/LogisticsValue";
import LogisticsIndustry from "./pages/LogisticsIndustry";
import LogisticsSales from "./pages/LogisticsSales";
import NotFound from "./pages/NotFound";
import Disclaimer from "./pages/Disclaimer";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/logistics-solutions" element={<LogisticsSolutions />} />
          <Route path="/logistics-solutions/value" element={<LogisticsValue />} />
          <Route path="/logistics-solutions/industry" element={<LogisticsIndustry />} />
          <Route path="/logistics-solutions/sales" element={<LogisticsSales />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

