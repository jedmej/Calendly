
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AddEvent from "./pages/AddEvent";
import AddTransaction from "./pages/AddTransaction";
import { Finances } from "./pages/Finances";

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[D8EAE3] bg-[#d8eae3]">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/add" element={<AddEvent />} />
          <Route path="/add-transaction" element={<AddTransaction />} />
          <Route path="/finances" element={<Finances />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatedRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
