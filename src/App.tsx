import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import Calculator from "./pages/Calculator";
import PortfolioPage from "./pages/PortfolioPage";
import LogisticsSolutions from "./pages/LogisticsSolutions";
import NotFound from "./pages/NotFound";
import Disclaimer from "./pages/Disclaimer";
import { AuthProvider } from "./lib/admin-auth";
import ProtectedRoute from "./components/admin/ProtectedRoute";
import AdminLayout from "./components/admin/AdminLayout";

// Lazy-load admin pages so they don't bloat the public bundle
const AdminLogin        = lazy(() => import("./pages/admin/AdminLogin"));
const AdminDashboard    = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminPortfolio    = lazy(() => import("./pages/admin/AdminPortfolio"));
const AdminTestimonials = lazy(() => import("./pages/admin/AdminTestimonials"));
const AdminPricing      = lazy(() => import("./pages/admin/AdminPricing"));
const AdminAbout        = lazy(() => import("./pages/admin/AdminAbout"));
const AdminContent      = lazy(() => import("./pages/admin/AdminContent"));
const AdminSeo          = lazy(() => import("./pages/admin/AdminSeo"));
const AdminAffiliates   = lazy(() => import("./pages/admin/AdminAffiliates"));
const AdminServices     = lazy(() => import("./pages/admin/AdminServices"));
const AdminSubmissions  = lazy(() => import("./pages/admin/AdminSubmissions"));

const queryClient = new QueryClient();

const AdminRoute = ({ children }: { children: React.ReactNode }) => (
  <ProtectedRoute>
    <AdminLayout>
      <Suspense fallback={<div className="p-8 text-muted-foreground">Loading…</div>}>
        {children}
      </Suspense>
    </AdminLayout>
  </ProtectedRoute>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={null}>
            <Routes>
              {/* Public site */}
              <Route path="/" element={<Index />} />
              <Route path="/calculator" element={<Calculator />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
              <Route path="/logistics-solutions" element={<LogisticsSolutions />} />
              <Route path="/logistics-solutions/value" element={<Navigate to="/logistics-solutions" replace />} />
              <Route path="/logistics-solutions/industry" element={<Navigate to="/logistics-solutions" replace />} />
              <Route path="/logistics-solutions/sales" element={<Navigate to="/logistics-solutions" replace />} />
              <Route path="/disclaimer" element={<Disclaimer />} />

              {/* Admin */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin"               element={<AdminRoute><AdminDashboard /></AdminRoute>} />
              <Route path="/admin/portfolio"     element={<AdminRoute><AdminPortfolio /></AdminRoute>} />
              <Route path="/admin/testimonials"  element={<AdminRoute><AdminTestimonials /></AdminRoute>} />
              <Route path="/admin/pricing"       element={<AdminRoute><AdminPricing /></AdminRoute>} />
              <Route path="/admin/about"         element={<AdminRoute><AdminAbout /></AdminRoute>} />
              <Route path="/admin/content"       element={<AdminRoute><AdminContent /></AdminRoute>} />
              <Route path="/admin/seo"           element={<AdminRoute><AdminSeo /></AdminRoute>} />
              <Route path="/admin/affiliates"    element={<AdminRoute><AdminAffiliates /></AdminRoute>} />
              <Route path="/admin/services"      element={<AdminRoute><AdminServices /></AdminRoute>} />
              <Route path="/admin/submissions"   element={<AdminRoute><AdminSubmissions /></AdminRoute>} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
