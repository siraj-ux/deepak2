import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { usePageViewGTM } from "./hooks/use-pageview-gtm";

const Index = lazy(() => import("./pages/Index"));
const IndexGa = lazy(() => import("./pages/IndexGa"));
const ThankYou = lazy(() => import("./pages/Thanku"));
const ThankYouGa = lazy(() => import("./pages/ThankuGa"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Helper component to trigger GTM on route changes
const GTMTracker = () => {
  usePageViewGTM();
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        {/* ✅ GTM Tracker added here inside BrowserRouter */}
        <GTMTracker />
        
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-black/90 text-white">
              <div className="flex flex-col items-center gap-3">
                <div className="h-10 w-10 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                <p className="text-sm tracking-wide text-white/80">
                  Loading...
                </p>
              </div>
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/ga" element={<IndexGa />} />
            <Route path="/ty-digital-wealth" element={<ThankYou />} />
            <Route path="/ty-digital-wealth-ga" element={<ThankYouGa />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;