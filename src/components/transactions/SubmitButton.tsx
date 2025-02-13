
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface SubmitButtonProps {
  isEditing?: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing, onClick }) => {
  return (
    <Button
      onClick={onClick}
      className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-[500px] h-[48px] md:h-[56px] text-sm md:text-base font-medium mt-6 md:mt-8 flex items-center justify-center gap-2"
    >
      {isEditing ? (
        <>
          <Edit className="w-4 h-4 md:w-5 md:h-5" />
          Zaktualizuj transakcję
        </>
      ) : (
        <>
          <Plus className="w-4 h-4 md:w-5 md:h-5" />
          Dodaj transakcję
        </>
      )}
    </Button>
  );
};
