import React from "react";
import { ActionBar } from "@/components/calendar/ActionBar";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ArrowDownIcon, ArrowUpIcon, ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useIsMobile } from "@/hooks/use-mobile";

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
  amount,
  isActive,
  onClick
}: { 
  type: "income" | "expense";
  amount: number;
  isActive: boolean;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className={`flex-1 border rounded-2xl p-4 md:p-6 space-y-3 cursor-pointer transition-all
      ${isActive 
        ? 'bg-blue-600 border-blue-600' 
        : 'bg-white/70 border-white/20 hover:bg-white/90'
      }`}
  >
    <div className="flex items-center gap-3">
      <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl ${
        type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"
      } flex items-center justify-center`}>
        {type === "income" ? (
          <ArrowUpIcon className="w-4 h-4 md:w-5 md:h-5 text-green-600" />
        ) : (
          <ArrowDownIcon className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
        )}
      </div>
      <span className={`text-xs md:text-sm font-medium ${
        isActive ? 'text-white' : 'text-gray-600'
      }`}>
        {type === "income" ? "Income" : "Expenses"}
      </span>
    </div>
    <div className={`text-xl md:text-2xl lg:text-3xl font-medium ${
      isActive ? 'text-white' : 'text-gray-900'
    }`}>
      {Math.round(amount)} zł
    </div>
  </div>
);

const TransactionItem = ({ item, onEdit }: { 
  item: FinancialItem;
  onEdit: (item: FinancialItem) => void;
}) => (
  <div 
    onClick={() => onEdit(item)}
    className="flex items-center justify-between p-4 md:p-5 border border-gray-100 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors"
  >
    <div className="flex items-center gap-3 md:gap-4">
      <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center ${
        item.type === "income" ? "bg-[#F2FCE2]" : "bg-[#FFDEE2]"
      }`}>
        {item.type === "income" ? (
          <ArrowUpIcon className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
        ) : (
          <ArrowDownIcon className="w-3 h-3 md:w-4 md:h-4 text-red-600" />
        )}
      </div>
      <div>
        <div className="text-sm md:text-base font-medium text-gray-900">{item.title}</div>
        <div className="text-xs md:text-sm text-gray-500">
          {new Date(item.date).toLocaleDateString()}
        </div>
      </div>
    </div>
    <div className={`text-sm md:text-base font-medium ${
      item.type === "income" ? "text-green-600" : "text-red-600"
    }`}>
      {item.type === "income" ? "+" : "-"}{Math.round(item.amount)} zł
    </div>
  </div>
);

type SortOption = {
  label: string;
  value: "date-desc" | "date-asc" | "amount-desc" | "amount-asc";
};

const sortOptions: SortOption[] = [
  { label: "Date: Newest → Oldest", value: "date-desc" },
  { label: "Date: Oldest → Newest", value: "date-asc" },
  { label: "Amount: Largest → Smallest", value: "amount-desc" },
  { label: "Amount: Smallest → Largest", value: "amount-asc" },
];

export const Finances = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [activeFilter, setActiveFilter] = React.useState<"income" | "expense" | null>(null);
  const [sortBy, setSortBy] = React.useState<SortOption["value"]>("date-desc");

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

  const renderSortSelector = () => {
    if (isMobile) {
      return (
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[40px] h-8 px-2">
            <SelectValue>
              <ArrowUpDown className="h-4 w-4" />
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ArrowUpDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[200px]">
          {sortOptions.map((option) => (
            <DropdownMenuItem
              key={option.value}
              onClick={() => setSortBy(option.value)}
              className="cursor-pointer"
            >
              {option.label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  };

  return (
    <main className="min-h-screen bg-[#F6F7F9] flex flex-col relative">
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-[120px] md:pb-[140px]">
        <div className="w-full max-w-[480px] md:max-w-[640px] lg:max-w-[800px] mx-auto space-y-4 md:space-y-6">
          <header className="bg-white/70 backdrop-blur-lg rounded-[500px] min-h-[60px] px-6 py-3 flex items-center sticky top-0 z-10">
            <h1 className="text-[17px] md:text-xl lg:text-2xl text-[#111827] font-medium">Finanse</h1>
          </header>

          <section className="flex gap-4 md:gap-6">
            <SummaryCard 
              type="income" 
              amount={totals.income} 
              isActive={activeFilter === "income"}
              onClick={() => handleFilterClick("income")}
            />
            <SummaryCard 
              type="expense" 
              amount={totals.expenses} 
              isActive={activeFilter === "expense"}
              onClick={() => handleFilterClick("expense")}
            />
          </section>

          <section className="bg-white/70 border border-white/20 rounded-2xl p-4 md:p-6">
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-base md:text-lg lg:text-xl text-gray-900 font-medium">
                Transakcje
              </h2>
              {renderSortSelector()}
            </div>
            <div className="space-y-2 md:space-y-3">
              {filteredItems.map(item => (
                <TransactionItem 
                  key={item.id} 
                  item={item}
                  onEdit={handleEditTransaction}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 z-20">
        <ActionBar />
      </div>
    </main>
  );
};

export default Finances;
