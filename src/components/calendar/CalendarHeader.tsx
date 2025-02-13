
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface CalendarHeaderProps {
  title: string;
}

export const CalendarHeader: React.FC<CalendarHeaderProps> = ({ title }) => {
  return (
    <div className="bg-[rgba(255,255,255,0.7)] flex min-h-[60px] w-full items-center gap-[40px_100px] justify-between pl-6 pr-2 rounded-[500px]">
      <div className="text-gray-900 text-[17px] font-medium leading-loose self-stretch w-[81px] my-auto">
        {title}
      </div>
      <div className="self-stretch flex items-center gap-2.5 w-12 my-auto p-2 rounded-xl">
        <Avatar className="w-8 h-8">
          <AvatarImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/7a1301cc2f91bb3e96ec9662bb00029f6e5dbd147f41329aa51a5ab3b2983179" />
          <AvatarFallback>PF</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};
