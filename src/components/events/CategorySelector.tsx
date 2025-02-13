
import React from "react";
import { Briefcase, GraduationCap, Star } from "lucide-react";

interface CategorySelectorProps {
  category: "Work" | "School" | "Other";
  setCategory: (category: "Work" | "School" | "Other") => void;
}

export const CategorySelector = ({ category, setCategory }: CategorySelectorProps) => {
  const categories = [
    { name: "Work", icon: <Briefcase className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: "School", icon: <GraduationCap className="w-4 h-4 md:w-5 md:h-5" /> },
    { name: "Other", icon: <Star className="w-4 h-4 md:w-5 md:h-5" /> }
  ];

  return (
    <div className="flex flex-wrap gap-2 text-xs md:text-sm font-medium mb-8">
      {categories.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setCategory(name as "Work" | "School" | "Other")}
          className={`flex-1 ${
            category === name
              ? "bg-[#2563EB] text-white"
              : "bg-black/5"
          } rounded-[500px] py-3.5 md:py-4 px-4 flex items-center justify-center gap-2`}
        >
          {icon}
          {name}
        </button>
      ))}
    </div>
  );
};
