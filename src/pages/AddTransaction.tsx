
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TransactionHeader } from "@/components/transactions/TransactionHeader";
import { TransactionTypeSelector } from "@/components/transactions/TransactionTypeSelector";
import { TransactionTypeToggle } from "@/components/transactions/TransactionTypeToggle";
import { TransactionForm } from "@/components/transactions/TransactionForm";
import { SubmitButton } from "@/components/transactions/SubmitButton";

interface LocationState {
  id?: string;
  title?: string;
  amount?: number;
  category?: string;
  date?: string;
  type?: 'income' | 'expense';
  isEditing?: boolean;
  returnDate?: string;
}

interface FormData {
  title: string;
  amount: string;
  category: string;
  date: string;
}

export default function AddTransaction() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as LocationState;
  
  const [isIncome, setIsIncome] = useState<boolean>(() => 
    state?.type !== undefined ? state.type === 'income' : true
  );

  const [formData, setFormData] = useState<FormData>({
    title: "",
    amount: "",
    category: "Work",
    date: ""
  });

  useEffect(() => {
    if (state?.isEditing) {
      setFormData({
        title: state.title || "",
        amount: state.amount?.toString() || "",
        category: state.category || "Work",
        date: state.date || ""
      });
      setIsIncome(state.type === 'income');
    }
  }, [state]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.amount || !formData.date) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Proszę wypełnić wszystkie wymagane pola.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      return;
    }

    try {
      if (state?.isEditing && state.id) {
        const { error } = await supabase
          .from('transactions')
          .update({
            title: formData.title,
            amount: parseFloat(formData.amount),
            category: formData.category,
            transaction_date: formData.date,
            type: isIncome ? 'income' : 'expense'
          })
          .eq('id', state.id);

        if (error) throw error;

        toast({
          title: "Sukces!",
          description: "Transakcja została zaktualizowana.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      } else {
        const { error } = await supabase
          .from('transactions')
          .insert({
            title: formData.title,
            amount: parseFloat(formData.amount),
            category: formData.category,
            transaction_date: formData.date,
            type: isIncome ? 'income' : 'expense'
          });

        if (error) throw error;

        toast({
          title: "Sukces!",
          description: "Transakcja została dodana.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast({
        variant: "destructive",
        title: "Błąd",
        description: "Nie udało się zapisać transakcji. Spróbuj ponownie.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
    }
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4 md:p-6">
      <div className="w-full max-w-[480px] md:max-w-[640px] mx-auto space-y-4 md:space-y-6 pb-32">
        <TransactionHeader isEditing={state?.isEditing} />
        
        {!state?.isEditing && <TransactionTypeSelector />}
        
        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8">
          <TransactionTypeToggle 
            isIncome={isIncome} 
            setIsIncome={setIsIncome} 
          />
          
          <TransactionForm 
            formData={formData}
            handleInputChange={handleInputChange}
          />
        </div>

        <SubmitButton 
          isEditing={state?.isEditing}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
}
