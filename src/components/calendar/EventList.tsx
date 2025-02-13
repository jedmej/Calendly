
import React from "react";
import { CalendarEvent } from "./CalendarEvent";

interface EventListProps {
  date: string;
  events: Array<{
    id?: string;
    icon?: string;
    title: string;
    time?: string;
    location?: string;
    withPeople?: string[];
    amount?: {
      value: number;
      type: "income" | "expense";
    } | number;
    category?: string;
    event_date?: string;
    transaction_date?: string;
    start_time?: string;
    end_time?: string;
    hourly_wage?: number;
    total_earnings?: number;
    type?: 'income' | 'expense';
  }>;
}

export const EventList: React.FC<EventListProps> = ({ date, events }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] border w-full mt-4 p-4 rounded-2xl border-[rgba(255,255,255,0.2)] border-solid">
      <div className="self-stretch min-h-7 w-full gap-1 text-[15px] text-gray-900 font-medium leading-7">
        Wydarzenia na dzień <span className="font-bold">{date}</span>
      </div>
      {events.map((event, index) => (
        <CalendarEvent 
          key={index} 
          {...event}
          amount={event.amount}
          type={event.type}
          transaction_date={event.transaction_date}
        />
      ))}
    </div>
  );
};
