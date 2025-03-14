import React from "react";
import { ActionBar } from "@/components/layout/ActionBar";
import { Header } from "@/components/shared/Header";
import { Card } from "@/components/shared/Card";
import { Button } from "@/components/shared/Button";
import { Typography } from "@/components/shared/Typography";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

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
  isEvent?: boolean;
}

type SummaryCardProps = {
  type: "income" | "expense";
  amount: number;
  isActive: boolean;
  onClick: () => void;
};

const SummaryCard = ({
  type,
  amount,
  isActive,
  onClick
}: SummaryCardProps) => <Card variant="glass" onClick={onClick} className={`flex-1 border rounded-[24px] p-4 md:p-6 space-y-3 cursor-pointer transition-all
      ${isActive ? 'bg-blue-600 border-blue-600' : 'hover:bg-white/90'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"} flex items-center justify-center`}>
        {type === "income" ? <ArrowUpIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" /> : <ArrowDownIcon className="w-4 h-4 md:w-5 md:h-5 text-red-600" />}
      </div>
      <Typography variant="small" className={`font-medium ${isActive ? 'text-white' : 'text-gray-600'}`}>
        {type === "income" ? "Income" : "Expenses"}
      </Typography>
    </div>
    <Typography variant="h2" className={`${isActive ? 'text-white' : 'text-gray-900'}`}>
      {Math.round(amount)} zł
    </Typography>
  </Card>;

const TransactionItem = ({
  item,
  onEdit
}: {
  item: FinancialItem;
  onEdit: (item: FinancialItem) => void;
}) => <div onClick={() => onEdit(item)} className="flex items-center justify-between p-4 md:p-5 border border-gray-100 cursor-pointer transition-colors bg-white/[0.69] rounded-[24px]">
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${item.type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"}`}>
        {item.type === "income" ? <ArrowUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-600" /> : <ArrowDownIcon className="w-3 h-3 md:w-4 md:h-4 text-red-600" />}
      </div>
      <div>
        <div className="text-sm md:text-base font-medium text-gray-900">{item.title}</div>
        <div className="text-xs md:text-sm text-gray-500">
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
    </div>
    <div className={`text-sm md:text-base font-medium ${item.type === "income" ? "text-green-600" : "text-red-600"}`}>
      {item.type === "income" ? "+" : "-"}{Math.round(item.amount)} zł
    </div>
  </div>;

type SortOption = {
  label: string;
  value: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
};

const sortOptions: SortOption[] = [{
  label: "Data: ↓",
  value: "date-desc"
}, {
  label: "Data: ↑",
  value: "date-asc"
}, {
  label: "Kwota: ↓",
  value: "amount-desc"
}, {
  label: "Kwota: ↑",
  value: "amount-asc"
}];

export const Finances = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState<"income" | "expense" | null>(null);
  const [sortBy, setSortBy] = React.useState<SortOption["value"]>("date-desc");

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(event.target.value as SortOption["value"]);
  };

  const {
    data: transactions
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("transactions").select("*").order("transaction_date", {
        ascending: false
      });
      if (error) throw error;
      return data as Transaction[];
    }
  });

  const {
    data: workEvents
  } = useQuery({
    queryKey: ["events-with-earnings"],
    queryFn: async () => {
      const {
        data,
        error
      } = await supabase.from("events").select("*").not("total_earnings", "is", null).order("event_date", {
        ascending: false
      });
      if (error) throw error;
      return data as Event[];
    }
  });

  const allItems = React.useMemo(() => {
    const items: FinancialItem[] = [];
    transactions?.forEach(t => {
      items.push({
        id: t.id,
        title: t.title,
        amount: t.amount,
        date: t.transaction_date,
        type: t.type === "expense" ? "expense" : "income",
        isEvent: false
      });
    });
    workEvents?.forEach(e => {
      if (e.total_earnings) {
        items.push({
          id: e.id,
          title: e.title,
          amount: e.total_earnings,
          date: e.event_date,
          type: "income",
          isEvent: true
        });
      }
    });
    return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [transactions, workEvents]);

  const totals = React.useMemo(() => ({
    income: allItems.reduce((sum, item) => item.type === "income" ? sum + item.amount : sum, 0),
    expenses: allItems.reduce((sum, item) => item.type === "expense" ? sum + item.amount : sum, 0)
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
        returnDate: item.date,
        isEvent: item.isEvent
      }
    });
  };

  const sortItems = (items: FinancialItem[]) => {
    return [...items].sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "amount-desc":
          return Math.abs(b.amount) - Math.abs(a.amount);
        case "amount-asc":
          return Math.abs(a.amount) - Math.abs(b.amount);
        default:
          return 0;
      }
    });
  };

  const filteredItems = React.useMemo(() => {
    let items = allItems;
    if (activeFilter) {
      items = items.filter(item => item.type === activeFilter);
    }
    return sortItems(items);
  }, [allItems, activeFilter, sortBy]);

  const handleFilterClick = (type: "income" | "expense") => {
    setActiveFilter(current => current === type ? null : type);
  };

  return <main className="min-h-screen bg-[#D8EAE3] flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 pb-20 md:p-6 md:pb-24 lg:p-8 lg:pb-24">
        <div className="w-full max-w-[800px] mx-auto space-y-4 md:space-y-6 pb-32">
          <Header title="Finances" />

          <section className="flex gap-4 md:gap-6">
            <SummaryCard type="income" amount={totals.income} isActive={activeFilter === "income"} onClick={() => handleFilterClick("income")} />
            <SummaryCard type="expense" amount={totals.expenses} isActive={activeFilter === "expense"} onClick={() => handleFilterClick("expense")} />
          </section>

          <Card variant="glass" className="p-4 md:p-6 rounded-[24px]">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <Typography variant="h2" className="text-base md:text-lg lg:text-xl">
                Transakcje
              </Typography>
              <select value={sortBy} onChange={handleSortChange} className="h-8 px-2 rounded-md bg-transparent border-none text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500">
                {sortOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
            </div>
            <div className="space-y-2 md:space-y-3">
              {filteredItems.map(item => <TransactionItem key={item.id} item={item} onEdit={handleEditTransaction} />)}
            </div>
          </Card>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <ActionBar />
      </div>
    </main>;
};

export default Finances;
