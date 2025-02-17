
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
    <div className="flex flex-wrap gap-2 text-sm font-medium mb-8">
      {categories.map(({ name, icon }) => (
        <button
          key={name}
          onClick={() => setCategory(name as "Work" | "School" | "Other")}
          className={`flex-1 ${
            category === name
              ? "bg-blue-600 text-white"
              : "bg-black/5 hover:bg-black/10"
          } rounded-[500px] h-[50px] md:h-[60px] flex items-center justify-center gap-2 transition-colors`}
        >
          {icon}
          {name}
        </button>
      ))}
    </div>
  );
};
