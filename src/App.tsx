
import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ActionBar } from "@/components/layout/ActionBar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddEvent from "./pages/AddEvent";
import AddTransaction from "./pages/AddTransaction";
import { Finances } from "./pages/Finances";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false
    },
  },
});

const AnimatedRoutes = () => {
  const location = useLocation();
  const hideActionBarRoutes = ['/add', '/add-transaction'];
  const shouldShowActionBar = !hideActionBarRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen bg-[#d8eae3]">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/add" element={<AddEvent />} />
        <Route path="/add-transaction" element={<AddTransaction />} />
        <Route path="/finances" element={<Finances />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {shouldShowActionBar && <ActionBar />}
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnimatedRoutes />
        </TooltipProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
