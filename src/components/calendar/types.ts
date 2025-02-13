
export interface Event {
  id: string;
  title: string;
  event_date?: string;
  transaction_date?: string;
  category: string;
  start_time?: string;
  end_time?: string;
  coworkers?: string[] | null;
  hourly_wage?: number | null;
  amount?: number;
  type?: 'income' | 'expense';
  total_earnings?: number | null;
}

export interface CalendarGridProps {
  view: "week" | "month";
  currentDate: Date;
  onSelectDate: (date: Date, events: Event[]) => void;
}
