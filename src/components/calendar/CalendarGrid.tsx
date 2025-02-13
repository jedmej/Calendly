import React from "react";

interface DayProps {
  day: number;
  events: {
    type: "blue" | "green" | "orange";
  }[];
  isCurrentMonth?: boolean;
}

const Day: React.FC<DayProps> = ({ day, events, isCurrentMonth = true }) => {
  const getEventColor = (type: "blue" | "green" | "orange") => {
    switch (type) {
      case "blue":
        return "bg-[rgba(59,130,246,0.7)]";
      case "green":
        return "bg-green-600";
      case "orange":
        return "bg-[rgba(222,159,34,1)]";
    }
  };

  return (
    <div className="bg-[rgba(255,255,255,0.5)] flex flex-col items-center w-[49px] h-[49px] flex-1 shrink basis-[0%] px-2 py-3">
      <div className="text-gray-900 text-xs font-medium leading-loose">
        {day}
      </div>
      {events.length > 0 && (
        <div className="flex gap-1 mt-1">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex min-h-1.5 w-1.5 h-1.5 rounded-full ${getEventColor(event.type)}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const WeekHeader: React.FC = () => {
  const days = ["M", "T", "W", "T", "F", "S", "S"];

  return (
    <div className="flex w-full gap-px text-xs text-gray-600 font-medium whitespace-nowrap text-center leading-loose">
      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-[30px] flex-1 shrink px-[17px] py-[5px] ${
            day === "F" ? "bg-blue-600 text-white" : "bg-[rgba(0,0,0,0.02)]"
          }`}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export const CalendarGrid: React.FC = () => {
  return (
    <div className="border w-full overflow-hidden mt-4 rounded-2xl border-[rgba(238,238,238,1)] border-solid">
      <WeekHeader />
      <div className="flex min-h-[50px] w-full items-stretch gap-px">
        <Day day={2} events={[{ type: 'blue' }]} />
        <Day day={3} events={[]} />
        <Day day={4} events={[{ type: 'orange' }]} />
        <Day day={5} events={[]} />
        <Day day={6} events={[{ type: 'green' }]} />
        <Day day={7} events={[{ type: 'blue' }, { type: 'green' }]} />
        <Day day={8} events={[{ type: 'blue' }]} />
      </div>
      <div className="flex min-h-[50px] w-full items-stretch gap-px">
        <Day day={9} events={[{ type: 'blue' }]} />
        <Day day={10} events={[{ type: 'green' }, { type: 'orange' }]} />
        <Day day={11} events={[{ type: 'blue' }]} />
        <Day day={12} events={[{ type: 'green' }]} />
        <Day day={13} events={[{ type: 'blue' }, { type: 'green' }, { type: 'orange' }]} />
        <Day day={14} events={[{ type: 'blue' }, { type: 'green' }]} />
        <Day day={15} events={[{ type: 'orange' }]} />
      </div>
      <div className="flex min-h-[50px] w-full items-stretch gap-px">
        <Day day={16} events={[{ type: 'blue' }]} />
        <Day day={17} events={[{ type: 'green' }]} />
        <Day day={18} events={[{ type: 'orange' }]} />
        <Day day={19} events={[{ type: 'green' }]} />
        <Day day={20} events={[{ type: 'green' }]} />
        <Day day={21} events={[{ type: 'blue' }, { type: 'green' }]} />
        <Day day={22} events={[{ type: 'orange' }]} />
      </div>
      <div className="flex min-h-[50px] w-full items-stretch gap-px">
        <Day day={23} events={[{ type: 'blue' }]} />
        <Day day={24} events={[{ type: 'orange' }]} />
        <Day day={25} events={[{ type: 'blue' }]} />
        <Day day={26} events={[{ type: 'orange' }]} />
        <Day day={27} events={[{ type: 'blue' }, { type: 'green' }]} />
        <Day day={28} events={[{ type: 'blue' }, { type: 'green' }]} />
        <Day day={1} events={[{ type: 'blue' }, { type: 'orange' }]} isCurrentMonth={false} />
      </div>
    </div>
        <Day day={26} events={[{ type: "blue" }]} isCurrentMonth={false} />
        <Day day={27} events={[{ type: "blue" }]} isCurrentMonth={false} />
        <Day day={28} events={[{ type: "green" }]} isCurrentMonth={false} />
        <Day day={29} events={[{ type: "green" }]} isCurrentMonth={false} />
        <Day
          day={30}
          events={[{ type: "blue" }, { type: "green" }]}
          isCurrentMonth={false}
        />
        <Day
          day={31}
          events={[{ type: "blue" }, { type: "green" }]}
          isCurrentMonth={false}
        />
        <Day day={1} events={[]} />
      </div>
      {/* Additional weeks would follow the same pattern */}
      <div className="flex min-h-[50px] w-full items-stretch gap-px">
        <Day day={2} events={[{ type: "blue" }]} />
        <Day day={3} events={[]} />
        <Day day={4} events={[{ type: "orange" }]} />
        <Day day={5} events={[]} />
        <Day day={6} events={[{ type: "green" }]} />
        <Day day={7} events={[{ type: "blue" }, { type: "green" }]} />
        <Day day={8} events={[{ type: "blue" }]} />
      </div>
      {/* Continue with remaining weeks */}
    </div>
  );
};