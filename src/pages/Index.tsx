
import React, { useState, useEffect } from "react";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventList } from "@/components/calendar/EventList";
import { ActionBar } from "@/components/calendar/ActionBar";
import { addMonths, format, parse } from "date-fns";
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
  };

  const handleEventListDateChange = (date: Date) => {
    setSelectedDate(date);
    setCurrentDate(date);
    handleDateSelect(date, []);
  };

  const handleMonthYearClick = () => {
    const input = document.createElement('input');
    input.type = 'month';
    input.value = format(currentDate, 'yyyy-MM');
    
    const handleInputChange = function(this: HTMLInputElement, e: InputEvent) {
      if (this.value) {
        const newDate = parse(this.value + '-01', 'yyyy-MM-dd', new Date());
        setCurrentDate(newDate);
      }
      input.removeEventListener('change', handleInputChange);
      document.body.removeChild(input);
    };
    
    input.addEventListener('change', handleInputChange);
    input.style.position = 'fixed';
    input.style.opacity = '0';
    input.style.pointerEvents = 'none';
    document.body.appendChild(input);
    
    setTimeout(() => {
      input.showPicker();
      input.click();
    }, 50);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.2 }}
      className="section-container flex flex-col min-h-screen items-stretch pb-24 my-[16px]"
    >
      <div className="flex-1 w-full">
        <CalendarHeader title="Calendar" />
        <div className="w-full mt-4 md:mt-6">
          <div className="bg-[rgba(255,255,255,0.7)] border w-full card-padding rounded-2xl border-[rgba(255,255,255,0.2)] border-solid">
            <div className="flex w-full items-center gap-[40px_100px] text-[15px] md:text-base lg:text-lg text-gray-900 font-medium leading-loose justify-between">
              <button 
                onClick={handleMonthYearClick}
                className="self-stretch w-[122px] my-auto hover:text-blue-600 transition-colors"
              >
                {format(currentDate, 'MMMM yyyy')}
              </button>
              <div className="flex items-center gap-2 text-xs md:text-sm lg:text-base text-gray-600 font-medium">
                <button onClick={handlePreviousMonth} className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-gray-100">
                  <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                </button>
                <button onClick={handleToday} className="px-4 py-1 md:px-6 md:py-2 rounded-full bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.08)] transition-colors">Dzisaj</button>
                <button onClick={handleNextMonth} className="flex items-center justify-center w-9 h-9 md:w-10 md:h-10 rounded-xl hover:bg-gray-100">
                  <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="flex w-full gap-2 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap text-center leading-loose mt-4">
              <button onClick={() => setView("week")} className={`self-stretch min-h-9 md:min-h-10 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] ${view === "week" ? "bg-blue-600 text-white" : "bg-[rgba(0,0,0,0.05)] text-gray-600"}`}>Tydzien</button>
              <button onClick={() => setView("month")} className={`self-stretch min-h-9 md:min-h-10 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] ${view === "month" ? "bg-blue-600 text-white" : "bg-[rgba(0,0,0,0.05)] text-gray-600"}`}>Miesiac</button>
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
            onDateChange={handleEventListDateChange}
          />}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 section-container">
        <ActionBar />
      </div>
    </motion.div>
  );
};

export default Index;
