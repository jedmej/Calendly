
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface SubmitButtonProps {
  isEditing?: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing, onClick }) => {
  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[320px] md:max-w-[373px]">
      <div className="flex w-full items-stretch px-2 py-1">
        <Button
          onClick={onClick}
          className="w-full bg-blue-600 text-white rounded-[500px] h-[50px] md:h-[60px] text-sm md:text-base font-medium flex items-center justify-center gap-2 shadow-sm"
        >
          {isEditing ? (
            <>
              <Edit className="w-4 h-4" />
              Zaktualizuj transakcję
            </>
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Dodaj transakcję
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
