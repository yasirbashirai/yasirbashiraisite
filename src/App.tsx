import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import PortfolioPage from "./pages/PortfolioPage";
import LogisticsSolutions from "./pages/LogisticsSolutions";
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
          {/* Old sub-routes redirect to the single combined page */}
          <Route path="/logistics-solutions/value" element={<Navigate to="/logistics-solutions" replace />} />
          <Route path="/logistics-solutions/industry" element={<Navigate to="/logistics-solutions" replace />} />
          <Route path="/logistics-solutions/sales" element={<Navigate to="/logistics-solutions" replace />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
