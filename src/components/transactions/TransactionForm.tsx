
import React from "react";
import { Calendar } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormData {
  title: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionFormProps {
  formData: FormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TransactionForm: React.FC<TransactionFormProps> = ({
  formData,
  handleInputChange
}) => {
  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <Label htmlFor="title" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Tytuł
        </Label>
        <Input
          id="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Dodaj opis"
          className="bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base placeholder:text-[#CCCCCC]"
        />
      </div>

      <div>
        <Label htmlFor="amount" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Kwota
        </Label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm md:text-base">
            zł
          </div>
          <Input
            id="amount"
            type="number"
            value={formData.amount}
            onChange={handleInputChange}
            placeholder="0.00"
            className="bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base pl-6 placeholder:text-[#CCCCCC]"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="category" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Kategoria
        </Label>
        <Input
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          placeholder="Wybierz kategorię"
          className="bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base placeholder:text-[#CCCCCC]"
        />
      </div>

      <div>
        <Label htmlFor="date" className="text-xs md:text-sm text-[#374151] font-medium mb-1.5 block">
          Data
        </Label>
        <div className="relative">
          <Input
            id="date"
            type="date"
            value={formData.date}
            onChange={handleInputChange}
            className="bg-[#EEEEEE]/60 h-[42px] md:h-[48px] rounded-xl text-sm md:text-base cursor-pointer"
          />
          <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
