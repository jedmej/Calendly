
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Calendar, CreditCard } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

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

const AddTransaction = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const state = location.state as LocationState;
  
  const [isIncome, setIsIncome] = useState(state?.type === 'income' || true);
  const [formData, setFormData] = useState({
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
        description: "Please fill in all required fields.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
      return;
    }

    try {
      if (state?.isEditing && state.id) {
        // Update existing transaction
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
          title: "Success!",
          description: "Transaction has been updated successfully.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      } else {
        // Create new transaction
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
          title: "Success!",
          description: "Transaction has been added successfully.",
          className: "bg-[#F2FCE2]/90 text-green-800 border-none"
        });
      }

      navigate("/");
    } catch (error) {
      console.error("Error saving transaction:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save transaction. Please try again.",
        className: "bg-red-50/90 text-red-900 border-none"
      });
    }
  };

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px] mx-auto space-y-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] w-full px-2 py-3 flex items-center gap-2">
          <button
            onClick={() => navigate('/')}
            className="rounded-xl p-2 hover:bg-black/5 w-[36px] h-[36px] flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="text-[17px] text-[#111827] font-medium">
            {state?.isEditing ? 'Edit Transaction' : 'Add New'}
          </span>
        </div>

        <div className="flex gap-3 px-2">
          <button 
            onClick={() => navigate('/add')}
            className="flex-1 bg-black/5 text-black rounded-[500px] py-3.5 px-6"
          >
            <div className="flex items-center justify-center gap-2">
              <Calendar className="w-4 h-4" />
              Event
            </div>
          </button>
          <button 
            className="flex-1 bg-[#EFF6FF] text-[#2563EB] border border-[#2563EB]/20 rounded-[500px] py-3.5 px-6"
          >
            <div className="flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" />
              Transaction
            </div>
          </button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
          <div className="flex flex-wrap gap-2 text-xs font-medium mb-8">
            <button
              onClick={() => setIsIncome(true)}
              className={`flex-1 ${
                isIncome 
                  ? "bg-green-500 text-white" 
                  : "bg-black/5"
              } rounded-[500px] py-3.5 px-4`}
            >
              Income
            </button>
            <button
              onClick={() => setIsIncome(false)}
              className={`flex-1 ${
                !isIncome 
                  ? "bg-red-500 text-white" 
                  : "bg-black/5"
              } rounded-[500px] py-3.5 px-4`}
            >
              Expense
            </button>
          </div>

          <div className="space-y-6">
            <div>
              <Label htmlFor="title" className="text-xs text-[#374151] font-medium mb-1.5 block">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Add a description"
                className="bg-[#EEEEEE]/60 h-[42px] rounded-xl text-sm placeholder:text-[#CCCCCC]"
              />
            </div>

            <div>
              <Label htmlFor="amount" className="text-xs text-[#374151] font-medium mb-1.5 block">
                Amount
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </div>
                <Input
                  id="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="bg-[#EEEEEE]/60 h-[42px] rounded-xl text-sm pl-6 placeholder:text-[#CCCCCC]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="category" className="text-xs text-[#374151] font-medium mb-1.5 block">
                Category
              </Label>
              <Input
                id="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Select category"
                className="bg-[#EEEEEE]/60 h-[42px] rounded-xl text-sm placeholder:text-[#CCCCCC]"
              />
            </div>

            <div>
              <Label htmlFor="date" className="text-xs text-[#374151] font-medium mb-1.5 block">
                Date
              </Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="bg-[#EEEEEE]/60 h-[42px] rounded-xl text-sm cursor-pointer"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-[#2563EB] hover:bg-[#1d4ed8] text-white rounded-[500px] h-[48px] text-sm font-medium mt-6"
          >
            {state?.isEditing ? 'Update Transaction' : 'Add Transaction'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddTransaction;
