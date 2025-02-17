
import React from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransactionHeaderProps {
  isEditing?: boolean;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ isEditing }) => {
  const navigate = useNavigate();

  return (
    <header className="calendar-header rounded-[500px] min-h-[60px] px-6 py-3 flex items-center sticky top-0 z-10">
      <button
        onClick={() => navigate('/')}
        className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center mr-2"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <h1 className="text-[17px] md:text-xl lg:text-2xl text-foreground font-medium">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edytuj transakcję
          </div>
        ) : (
          "Dodaj nową"
        )}
      </h1>
    </header>
  );
};
