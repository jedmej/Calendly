
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface SubmitButtonProps {
  isEditing?: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing, onClick }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[373px]">
      <div className="bg-blue-600 p-2 rounded-[500px]">
        <Button
          onClick={onClick}
          className="w-full bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.2)] text-blue-600 rounded-[500px] h-[70px] text-sm md:text-base font-medium flex items-center justify-center gap-2"
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
      </div>
    </div>
  );
};
