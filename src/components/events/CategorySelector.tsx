
import React from "react";
import { Briefcase, GraduationCap, Star } from "lucide-react";
import { SmallButton } from "../shared/SmallButton";

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
        <SmallButton
          key={name}
          onClick={() => setCategory(name as "Work" | "School" | "Other")}
          isActive={category === name}
          leftIcon={icon}
        >
          {name}
        </SmallButton>
      ))}
    </div>
  );
};
