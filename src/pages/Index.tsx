
import React, { useState } from "react";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import { EventList } from "@/components/calendar/EventList";
import { ActionBar } from "@/components/calendar/ActionBar";

const Index = () => {
  const [view, setView] = useState<"week" | "month">("week");
  
  const events = [
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/5576966015d8b62dfac43aef83af7ed921e00a905a5d084a7871b2b6f745987d",
      title: "Cucina",
      time: "10:30 - 21:00",
      withPeople: ["Alice", "Bob"],
      amount: {
        value: 120,
        type: "income" as const,
      },
    },
    {
      icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/e20d23ee5ca9c4ead20524cdd4503cf6094fc9538d1ad4a8d2bc6b683196c372",
      title: "Reumatologia",
      time: "9:00 - 10:00",
      location: "Room 101",
    },
    {
      title: "Rzesy",
      amount: {
        value: 35,
        type: "expense" as const,
      },
    },
  ];

  return (
    <div className="bg-[rgba(246,247,249,1)] flex max-w-[480px] w-full flex-col overflow-hidden items-stretch justify-between mx-auto p-4">
      <div className="h-[836px] w-full">
        <CalendarHeader title="Calendar" />
        <div className="w-full mt-4">
          <div className="bg-[rgba(255,255,255,0.7)] border w-full p-4 rounded-2xl border-[rgba(255,255,255,0.2)] border-solid">
            <div className="flex w-full items-center gap-[40px_100px] text-[15px] text-gray-900 font-medium leading-loose justify-between">
              <div className="self-stretch w-[122px] my-auto">
                February 2025
              </div>
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/152312aa8d49520e1dcf138697063cc5d50a3728dd082875446466a099aa6bc4"
                className="aspect-[2.22] object-contain w-20 self-stretch shrink-0 my-auto"
                alt="Calendar navigation"
              />
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
            <CalendarGrid view={view} />
          </div>
          <EventList date="Feb 13, 2025" events={events} />
        </div>
      </div>
      <ActionBar />
    </div>
  );
};

export default Index;
