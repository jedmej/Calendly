
import React, { useState } from "react";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventList } from "@/components/calendar/EventList";
import { ActionBar } from "@/components/calendar/ActionBar";
import { addMonths, format } from "date-fns";

interface Event {
  id: string;
  title: string;
  event_date: string;
  start_time?: string;
  end_time?: string;
  category: string;
  coworkers?: string[] | null;
  hourly_wage?: number | null;
  total_earnings?: number | null;
}

const Index = () => {
  const [view, setView] = useState<"week" | "month">("week");
  const [currentDate, setCurrentDate] = useState(new Date(2025, 1, 13));
  const [selectedEvents, setSelectedEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  
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

  return (
    <div className="bg-[rgba(246,247,249,1)] flex max-w-[480px] w-full flex-col overflow-hidden items-stretch justify-between mx-auto p-4">
      <div className="h-[836px] w-full">
        <CalendarHeader title="Calendar" />
        <div className="w-full mt-4">
          <div className="bg-[rgba(255,255,255,0.7)] border w-full p-4 rounded-2xl border-[rgba(255,255,255,0.2)] border-solid">
            <div className="flex w-full items-center gap-[40px_100px] text-[15px] text-gray-900 font-medium leading-loose justify-between">
              <div className="self-stretch w-[122px] my-auto">
                {format(currentDate, 'MMMM yyyy')}
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-medium">
                <button 
                  onClick={handlePreviousMonth}
                  className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/152312aa8d49520e1dcf138697063cc5d50a3728dd082875446466a099aa6bc4"
                    className="w-5 h-5 rotate-180"
                    alt="Previous month"
                  />
                </button>
                <button
                  onClick={handleToday}
                  className="px-4 py-1 rounded-full bg-[rgba(0,0,0,0.05)] hover:bg-[rgba(0,0,0,0.08)] transition-colors"
                >
                  Today
                </button>
                <button 
                  onClick={handleNextMonth}
                  className="flex items-center justify-center w-9 h-9 rounded-xl hover:bg-gray-100"
                >
                  <img
                    loading="lazy"
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/152312aa8d49520e1dcf138697063cc5d50a3728dd082875446466a099aa6bc4"
                    className="w-5 h-5"
                    alt="Next month"
                  />
                </button>
              </div>
            </div>
            <div className="flex w-full gap-2 text-xs font-medium whitespace-nowrap text-center leading-loose mt-4">
              <button
                onClick={() => setView("week")}
                className={`self-stretch min-h-9 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] ${
                  view === "week"
                    ? "bg-blue-600 text-white"
                    : "bg-[rgba(0,0,0,0.05)] text-gray-600"
                }`}
              >
                Week
              </button>
              <button
                onClick={() => setView("month")}
                className={`self-stretch min-h-9 gap-2.5 flex-1 shrink px-4 py-2 rounded-[500px] ${
                  view === "month"
                    ? "bg-blue-600 text-white"
                    : "bg-[rgba(0,0,0,0.05)] text-gray-600"
                }`}
              >
                Month
              </button>
            </div>
            <CalendarGrid 
              view={view} 
              currentDate={currentDate}
              onSelectDate={handleDateSelect}
            />
          </div>
          {selectedDate && (
            <EventList 
              date={format(selectedDate, 'MMM dd, yyyy')} 
              events={selectedEvents.map(event => ({
                id: event.id,
                title: event.title,
                time: event.start_time && event.end_time ? `${event.start_time} - ${event.end_time}` : undefined,
                withPeople: event.coworkers || undefined,
                category: event.category,
                event_date: event.event_date,
                start_time: event.start_time,
                end_time: event.end_time,
                hourly_wage: event.hourly_wage,
                total_earnings: event.total_earnings // Add this line to pass total_earnings
              }))} 
            />
          )}
        </div>
      </div>
      <ActionBar />
    </div>
  );
};

export default Index;
