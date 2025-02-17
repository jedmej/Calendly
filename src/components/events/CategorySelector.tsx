
import React from "react";
import { Briefcase, GraduationCap, Star } from "lucide-react";

interface CategorySelectorProps {
  category: "Work" | "School" | "Other";
  setCategory: (category: "Work" | "School" | "Other") => void;
}

export const CategorySelector = ({ category, setCategory }: CategorySelectorProps) => {
  const categories = [
    { name: "Work", icon: <Briefcase className="w-4 h-4" /> },
    { name: "School", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Other", icon: <Star className="w-4 h-4" /> }
  ];

  return (
    <div className="flex w-full gap-2 text-xs md:text-sm lg:text-base font-medium whitespace-nowrap text-center mb-8">
      {categories.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setCategory(name as "Work" | "School" | "Other")}
          className={`h-9 flex items-center justify-center gap-2.5 flex-1 shrink px-4 rounded-[500px] transition-colors ${
            category === name
              ? "bg-[#282828] text-white"
              : "bg-black/5 text-black hover:bg-black/10"
          }`}
        >
          {icon}
          {name}
        </button>
      ))}
    </div>
  );
};
