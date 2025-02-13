
import React from "react";
import { ActionBar } from "@/components/calendar/ActionBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

interface FinancialItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "income" | "expense";
}

const SummaryCard = ({ 
  type, 
  amount 
}: { 
  type: "income" | "expense";
  amount: number;
}) => (
  <div className="flex-1 bg-white/70 border border-white/20 rounded-2xl p-4 space-y-3">
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 rounded-xl ${
        type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"
      } flex items-center justify-center`}>
        {type === "income" ? (
          <ArrowUpIcon className="w-4 h-4 text-green-600" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 text-red-600" />
        )}
      </div>
      <span className="text-xs text-gray-600 font-medium">
        {type === "income" ? "Income" : "Expenses"}
      </span>
    </div>
    <div className="text-xl font-medium">
      ${amount.toFixed(2)}
    </div>
  </div>
);

const TransactionItem = ({ item, onEdit }: { 
  item: FinancialItem;
  onEdit: (item: FinancialItem) => void;
}) => (
  <div 
    onClick={() => onEdit(item)}
    className="flex items-center justify-between p-4 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-3">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
        item.type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"
      }`}>
        {item.type === "income" ? (
          <ArrowUpIcon className="w-3 h-3 text-green-600" />
        ) : (
          <ArrowDownIcon className="w-3 h-3 text-red-600" />
        )}
      </div>
      <div>
        <div className="text-sm font-medium text-gray-900">{item.title}</div>
        <div className="text-xs text-gray-500">
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
    </div>
    <div className={`text-sm font-medium ${
      item.type === "income" ? "text-green-600" : "text-red-600"
    }`}>
      {item.type === "income" ? "+" : "-"}${item.amount.toFixed(2)}
    </div>
  </div>
);

export const Finances = () => {
  const navigate = useNavigate();
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

  const allItems = React.useMemo(() => {
    const items: FinancialItem[] = [];

    transactions?.forEach(t => {
      items.push({
        id: t.id,
        title: t.title,
        amount: t.amount,
        date: t.transaction_date,
        type: t.type === "expense" ? "expense" : "income"
      });
    });

    workEvents?.forEach(e => {
      if (e.total_earnings) {
        items.push({
          id: e.id,
          title: e.title,
          amount: e.total_earnings,
          date: e.event_date,
          type: "income"
        });
      }
    });

    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, workEvents]);

  const totals = React.useMemo(() => ({
    income: allItems.reduce((sum, item) => 
      item.type === "income" ? sum + item.amount : sum, 0),
    expenses: allItems.reduce((sum, item) => 
      item.type === "expense" ? sum + item.amount : sum, 0),
  }), [allItems]);

  const handleEditTransaction = (item: FinancialItem) => {
    navigate('/add-transaction', {
      state: {
        id: item.id,
        title: item.title,
        amount: item.amount,
        date: item.date,
        type: item.type,
        isEditing: true,
        returnDate: item.date
      }
    });
  };

  return (
    <main className="bg-[#F6F7F9] min-h-screen p-4">
      <div className="w-full max-w-[480px] mx-auto space-y-4">
        <header className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] px-6 py-3 flex items-center">
          <h1 className="text-[17px] text-[#111827] font-medium">Finances</h1>
        </header>

        <section className="flex gap-4">
          <SummaryCard type="income" amount={totals.income} />
          <SummaryCard type="expense" amount={totals.expenses} />
        </section>

        <section className="bg-white/70 border border-white/20 rounded-2xl p-4">
          <h2 className="text-base text-gray-900 font-medium mb-4">
            Transactions
          </h2>
          <div className="space-y-2">
            {allItems.map(item => (
              <TransactionItem 
                key={item.id} 
                item={item}
                onEdit={handleEditTransaction}
              />
            ))}
          </div>
        </section>
      </div>
      <ActionBar />
    </main>
  );
};

export default Finances;
