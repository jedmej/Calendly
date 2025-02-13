
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
import { BackgroundGradientAnimation } from "./components/ui/background-gradient-animation";
import { createContext, useContext, useState } from "react";

const queryClient = new QueryClient();

// Create context for background state
const BackgroundContext = createContext<{
  useGradient: boolean;
  toggleBackground: () => void;
}>({
  useGradient: false,
  toggleBackground: () => {},
});

// Custom hook to use background context
export const useBackground = () => useContext(BackgroundContext);

const AnimatedRoutes = () => {
  const location = useLocation();
  const { useGradient } = useBackground();
  
  const content = (
    <div className={`${useGradient ? '' : 'bg-[#F6F7F9]'} min-h-screen`}>
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

  if (useGradient) {
    return (
      <BackgroundGradientAnimation
        gradientBackgroundStart="rgb(108, 0, 162)"
        gradientBackgroundEnd="rgb(0, 17, 82)"
        firstColor="18, 113, 255"
        secondColor="221, 74, 255"
        thirdColor="100, 220, 255"
        fourthColor="200, 50, 50"
        fifthColor="180, 180, 50"
        pointerColor="140, 100, 255"
        size="80%"
        blendingValue="hard-light"
        className="relative z-10"
      >
        <div className="relative z-20">{content}</div>
      </BackgroundGradientAnimation>
    );
  }

  return content;
};

const App = () => {
  const [useGradient, setUseGradient] = useState(false);

  const toggleBackground = () => {
    setUseGradient(prev => !prev);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <BackgroundContext.Provider value={{ useGradient, toggleBackground }}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatedRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </BackgroundContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
