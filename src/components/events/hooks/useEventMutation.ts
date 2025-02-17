
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { EventCategory } from "../types/event";

interface EventData {
  title: string;
  event_date: string;
  start_time: string;
  end_time: string;
  category: EventCategory;
  hourly_wage: number | null;
  coworkers: string[] | null;
  total_earnings: number;
}

export const useEventMutation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const createEvent = async (eventData: EventData) => {
    try {
      const { error } = await supabase.from("events").insert(eventData);
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Event has been created successfully.",
        className: "bg-[#F2FCE2]/90 text-green-800 border-none"
      });
      navigate("/");
    } catch (error) {
      console.error("Error creating event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save event. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      throw error;
    }
  };

  const updateEvent = async (eventId: string, eventData: EventData) => {
    try {
      const { error } = await supabase.from("events").update(eventData).eq("id", eventId);
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Event has been updated successfully.",
        className: "bg-[#F2FCE2]/90 text-green-800 border-none"
      });
      navigate("/");
    } catch (error) {
      console.error("Error updating event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update event. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      throw error;
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      const { error } = await supabase.from("events").delete().eq("id", eventId);
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Event has been deleted successfully.",
        className: "bg-[#F2FCE2]/90 text-green-800 border-none"
      });
      navigate("/");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete event. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      throw error;
    }
  };

  return {
    createEvent,
    updateEvent,
    deleteEvent
  };
};
