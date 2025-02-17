
import React from "react";
import { Button } from "@/components/shared/Button";
import { Save, Trash } from "lucide-react";

interface EventActionButtonsProps {
  isEditing: boolean;
  onDelete: () => void;
  onSubmit: () => void;
}

export const EventActionButtons: React.FC<EventActionButtonsProps> = ({
  isEditing,
  onDelete,
  onSubmit
}) => {
  return (
    <div className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[320px] md:max-w-[373px]">
      <div className="bg-white/95 backdrop-blur-md shadow-[0px_0px_16px_rgba(0,0,0,0.03)] border border-[rgba(255,255,255,0.15)] rounded-[500px]">
        <div className="flex w-full items-stretch px-1 py-1 gap-2">
          {isEditing && (
            <Button
              variant="destructive"
              onClick={onDelete}
              fullWidth
              leftIcon={<Trash className="w-4 h-4" />}
            >
              Delete Event
            </Button>
          )}
          <Button
            variant="primary"
            onClick={onSubmit}
            fullWidth
            leftIcon={<Save className="w-4 h-4" />}
          >
            {isEditing ? "Save Changes" : "Add Event"}
          </Button>
        </div>
      </div>
    </div>
  );
};
