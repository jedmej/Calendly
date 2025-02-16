
import React from "react";
import { ActionButton } from "@/components/shared/ActionButton";

interface SubmitButtonProps {
  isEditing?: boolean;
  onClick: () => void;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({ isEditing, onClick }) => {
  return <ActionButton isEditing={isEditing} onClick={onClick} />;
};
