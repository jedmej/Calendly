
import React from "react";
import { ArrowLeft, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface TransactionHeaderProps {
  isEditing?: boolean;
}

export const TransactionHeader: React.FC<TransactionHeaderProps> = ({ isEditing }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] w-full px-2 py-3 flex items-center gap-2">
      <button
        onClick={() => navigate('/')}
        className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center"
      >
        <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <span className="text-[17px] md:text-xl text-[#111827] font-medium">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <Edit className="w-5 h-5" />
            Edytuj transakcję
          </div>
        ) : (
          "Dodaj nową"
        )}
      </span>
    </div>
  );
};
