
import React from "react";
import { ActionBar } from "@/components/calendar/ActionBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";

interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: string;
  category: string;
  transaction_date: string;
}

interface Event {
  id: string;
  title: string;
  total_earnings: number;
  event_date: string;
}

export const Finances = () => {
  // Fetch transactions
  const { data: transactions } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transactions")
        .select("*")
        .order("transaction_date", { ascending: false });
      
      if (error) throw error;
      return data as Transaction[];
    },
  });

  // Fetch work events with earnings
  const { data: workEvents } = useQuery({
    queryKey: ["events-with-earnings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .not("total_earnings", "is", null)
        .order("event_date", { ascending: false });
      
      if (error) throw error;
      return data as Event[];
    },
  });

  // Combine and process all financial items
  const allItems = React.useMemo(() => {
    const items: {
      id: string;
      title: string;
      amount: number;
      date: string;
      type: "income" | "expense";
    }[] = [];

    // Add transactions
    transactions?.forEach((transaction) => {
      items.push({
        id: transaction.id,
        title: transaction.title,
        amount: transaction.amount,
        date: transaction.transaction_date,
        type: transaction.type === "expense" ? "expense" : "income",
      });
    });

    // Add work events
    workEvents?.forEach((event) => {
      if (event.total_earnings) {
        items.push({
          id: event.id,
          title: event.title,
          amount: event.total_earnings,
          date: event.event_date,
          type: "income",
        });
      }
    });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, workEvents]);

  // Calculate totals
  const totals = React.useMemo(() => {
    const income = allItems.reduce((sum, item) => 
      item.type === "income" ? sum + item.amount : sum, 0);
    const expenses = allItems.reduce((sum, item) => 
      item.type === "expense" ? sum + item.amount : sum, 0);
    return { income, expenses };
  }, [allItems]);

  return (
    <div className="bg-[#F6F7F9] min-h-screen flex flex-col items-center p-4">
      <div className="w-full max-w-[480px] mx-auto space-y-4">
        <div className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] w-full px-6 py-3 flex items-center justify-between">
          <span className="text-[17px] text-[#111827] font-medium">
            Finances
          </span>
        </div>

        {/* Summary Cards */}
        <div className="flex gap-4">
          {/* Income Card */}
          <div className="flex-1 bg-white/70 border border-white/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#F2FCE2] flex items-center justify-center">
                <ArrowUpIcon className="w-4 h-4 text-green-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Income</span>
            </div>
            <div className="text-xl font-medium">
              ${totals.income.toFixed(2)}
            </div>
          </div>

          {/* Expenses Card */}
          <div className="flex-1 bg-white/70 border border-white/20 rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#FFDEE2] flex items-center justify-center">
                <ArrowDownIcon className="w-4 h-4 text-red-600" />
              </div>
              <span className="text-xs text-gray-600 font-medium">Expenses</span>
            </div>
            <div className="text-xl font-medium">
              ${totals.expenses.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Transactions List */}
        <div className="bg-white/70 border border-white/20 rounded-2xl p-4">
          <h2 className="text-base text-gray-900 font-medium mb-4">
            Transactions
          </h2>
          <div className="space-y-2">
            {allItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      item.type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"
                    }`}
                  >
                    {item.type === "income" ? (
                      <ArrowUpIcon className="w-3 h-3 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3 text-red-600" />
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {item.title}
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(item.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${
                    item.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ActionBar />
    </div>
  );
};

export default Finances;
