
import { startOfMonth, endOfMonth, eachDayOfInterval, addDays, startOfWeek } from "date-fns";

export const getMonthDays = (currentDate: Date) => {
  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const firstWeek = startOfWeek(start, { weekStartsOn: 1 });
  const totalDays = eachDayOfInterval({ start: firstWeek, end });
  return totalDays;
};

export const getWeekDays = (currentDate: Date) => {
  const start = startOfWeek(currentDate, { weekStartsOn: 1 });
  return Array.from({ length: 7 }, (_, i) => addDays(start, i));
};
