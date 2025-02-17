
export type EventCategory = "Work" | "School" | "Other";

export interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  hourlyWage: string;
  coworkers: string;
}

export interface EventFormErrors {
  [key: string]: string;
}
