
import React, { useState, useEffect } from "react";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventList } from "@/components/calendar/EventList";
import { ActionBar } from "@/components/calendar/ActionBar";
import { addMonths, format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Event } from "@/components/calendar/types";

const Index = () => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(() => {
    const locationState = history.state?.usr;
    return locationState?.returnDate ? new Date(locationState.returnDate) : new Date();
  });
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  useEffect(() => {
    setSelectedDate(currentDate);
  }, [currentDate]);

  useEffect(() => {
    if (selectedDate === null) {
      setSelectedDate(currentDate);
    }
  }, []);

  const handlePreviousMonth = () => {
    setCurrentDate(prev => addMonths(prev, -1));
  };

  const handleNextMonth = () => {
    setCurrentDate(prev => addMonths(prev, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleDateSelect = (date: Date, events: Event[]) => {
    setSelectedDate(date);
    setSelectedEvents(events);
    setCurrentDate(date);
  };

  const handleMonthYearClick = () => {
    const input = document.createElement('input');
    input.type = 'month';
    input.value = format(currentDate, 'yyyy-MM');
    
    const handleInputChange = () => {
      if (input.value) {
        const [year, month] = input.value.split('-').map(Number);
        const newDate = new Date(year, month - 1, 1);
        setCurrentDate(newDate);
      }
      document.body.removeChild(input);
    };
    
    input.addEventListener('change', handleInputChange);
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.style.top = '0';
    input.style.left = '0';
    input.style.width = '100%';
    input.style.height = '100%';
    input.style.cursor = 'pointer';
    input.style.zIndex = '9999';
    document.body.appendChild(input);
    input.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen bg-background flex flex-col items-center p-4 md:p-6"
    >
      <div className="w-full max-w-[480px] md:max-w-[640px] lg:max-w-[800px] mx-auto space-y-4 md:space-y-6 pb-32">
        <CalendarHeader title="Calendar" />
        <div className="w-full">
          <div className="glass-morphism w-full card-padding rounded-2xl">
            <div className="flex w-full items-center gap-[40px_100px] text-[15px] md:text-base lg:text-lg text-foreground font-medium leading-loose justify-between">
              <button 
                onClick={handleMonthYearClick}
                className="self-stretch w-[122px] my-auto hover:text-primary transition-colors"
              >
                {format(currentDate, 'MMMM yyyy')}
              </button>
              <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base text-muted-foreground font-medium">
                <button onClick={handlePreviousMonth} className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-accent">
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                </button>
                <button onClick={handleToday} className="px-4 py-1 md:px-6 md:py-2 rounded-full bg-accent hover:bg-accent/80 transition-colors">Dzisaj</button>
                <button onClick={handleNextMonth} className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-accent">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
            <div className="flex w-full gap-2 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap text-center leading-loose mt-4">
              <button 
                onClick={() => setView("week")} 
                className={`self-stretch min-h-9 md:min-h-10 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] transition-colors ${
                  view === "week" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                Tydzien
              </button>
              <button 
                onClick={() => setView("month")} 
                className={`self-stretch min-h-9 md:min-h-10 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] transition-colors ${
                  view === "month" 
                    ? "bg-primary text-primary-foreground" 
                    : "bg-accent text-muted-foreground hover:text-foreground"
                }`}
              >
                Miesiac
              </button>
            </div>
            <CalendarGrid 
              view={view} 
              currentDate={currentDate} 
              onSelectDate={handleDateSelect} 
              onInitialLoad={setSelectedEvents}
            />
          </div>
          {selectedDate && <EventList 
            date={format(selectedDate, 'MMM dd, yyyy')} 
            events={selectedEvents}
            onDateChange={(date) => handleDateSelect(date, [])}
          />}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <ActionBar />
      </div>
    </motion.div>
  );
};

export default Index;
