
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus } from "lucide-react";

interface SubmitButtonProps {
  isEditing?: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing, onClick }) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-[373px]">
      <div className="bg-white/80 backdrop-blur-lg shadow-lg border border-gray-200/50 rounded-2xl p-3">
        <Button
          onClick={onClick}
          className="w-full bg-primary text-white rounded-xl h-[52px] text-base font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
        >
          {isEditing ? (
            <>
              <Edit className="icon-sm" />
              Zaktualizuj transakcję
            </>
          ) : (
            <>
              <Plus className="icon-sm" />
              Dodaj transakcję
            </>
          )}
        </Button>
      </div>
    </div>
  );
};
