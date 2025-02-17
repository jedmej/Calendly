import React from "react";
import { useLocation } from "react-router-dom";
import { Card } from "@/components/shared/Card";
import { Header } from "@/components/shared/Header";
import { CategorySelector } from "@/components/events/CategorySelector";
import { EarningsCalculator } from "@/components/events/EarningsCalculator";
import { EventTypeSelector } from "@/components/events/EventTypeSelector";
import { EventForm } from "@/components/events/EventForm";
import { EventActionButtons } from "@/components/events/EventActionButtons";
import { useEventForm } from "@/components/events/hooks/useEventForm";
interface LocationState {
  id?: string;
  title?: string;
  date?: string;
  startTime?: string;
  endTime?: string;
  category?: "Work" | "School" | "Other";
  hourlyWage?: string;
  coworkers?: string;
  isEditing?: boolean;
  totalEarnings?: number;
  returnDate?: string;
}
const AddEvent = () => {
  const location = useLocation();
  const state = location.state as LocationState;
  const {
    category,
    setCategory,
    formData,
    errors,
    estimatedEarnings,
    tips,
    totalEarnings,
    isEditing,
    handleInputChange,
    handleTipsChange,
    handleSubmit,
    handleDelete
  } = useEventForm(state);
  return <div className="bg-[#D8EAE3] min-h-screen flex flex-col items-center p-4 pb-20 md:p-6 md:pb-24 lg:p-8 lg:pb-24">
      <div className="w-full max-w-[800px] mx-auto space-y-4 md:space-y-6 pb-32">
        <Header title={isEditing ? "Edit Event" : "Add New"} showBackButton />

        {!isEditing && <EventTypeSelector />}

        <Card variant="glass">
          <CategorySelector category={category} setCategory={setCategory} />
          <EventForm formData={formData} errors={errors} handleInputChange={handleInputChange} />
          <div className="mt-6 md:mt-8">
            <EarningsCalculator estimatedEarnings={estimatedEarnings} tips={tips} totalEarnings={totalEarnings} handleTipsChange={handleTipsChange} />
          </div>
        </Card>
      </div>

      <EventActionButtons isEditing={isEditing} onDelete={handleDelete} onSubmit={handleSubmit} />
    </div>;
};
export default AddEvent;