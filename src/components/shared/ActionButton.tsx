
import React from "react";
import { Button } from "@/components/ui/button";
import { Edit, Plus, Save, Trash } from "lucide-react";

interface ActionButtonProps {
  isEditing?: boolean;
  onClick: () => void;
  onDelete?: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ isEditing, onClick, onDelete }) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[373px]">
      <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.05)] border border-[rgba(255,255,255,0.2)] rounded-[500px]">
        <div className="flex w-full items-stretch px-[7px] py-2 gap-3.5">
          {isEditing && onDelete && (
            <Button
              onClick={onDelete}
              className="flex-1 bg-red-500 text-white rounded-[500px] h-[63px] text-sm md:text-base font-medium"
            >
              <Trash className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Delete Event
            </Button>
          )}
          <Button
            onClick={onClick}
            className={`${isEditing && onDelete ? 'flex-1' : 'w-full'} bg-blue-600 text-white rounded-[500px] h-[63px] text-sm md:text-base font-medium flex items-center justify-center gap-2`}
          >
            {isEditing ? (
              <>
                {onDelete ? <Save className="w-4 h-4 md:w-5 md:h-5" /> : <Edit className="w-4 h-4 md:w-5 md:h-5" />}
                {onDelete ? "Save Changes" : "Zaktualizuj transakcję"}
              </>
            ) : (
              <>
                {onDelete ? <Save className="w-4 h-4 md:w-5 md:h-5" /> : <Plus className="w-4 h-4 md:w-5 md:h-5" />}
                {onDelete ? "Add Event" : "Dodaj transakcję"}
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
