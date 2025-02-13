
import React from "react";
import { useNavigate } from "react-router-dom";

export const ActionBar: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.05)] border self-center flex w-full max-w-[373px] flex-col items-stretch text-[10px] text-black font-medium whitespace-nowrap leading-loose justify-center p-px rounded-2xl border-[rgba(255,255,255,0.2)] border-solid">
      <div className="flex w-full items-center gap-3.5 px-[7px] py-2">
        <div className="self-stretch flex flex-col items-stretch w-[100px] my-auto px-6 py-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/9467a871f8acab2565ca4aa3fc9621591b59cfb012f7435fb7202c4c51318df8"
            className="aspect-[1] object-contain w-6 self-center"
            alt="Calendar icon"
          />
          <div className="w-full mt-1 py-1">Calendar</div>
        </div>
        <button 
          onClick={() => navigate('/add')}
          className="aspect-[1.73] object-contain w-[104px] self-stretch shrink-0 my-auto hover:opacity-80 transition-opacity"
        >
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/0344e5bb0c0113b263ed5dbba549f78d7f9a0de226c645204aaf00beedf4ed40"
            className="w-full h-full"
            alt="Add button"
          />
        </button>
        <div className="self-stretch flex flex-col items-stretch w-[93px] my-auto px-6 py-2">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/e39fbb86020fa08813c738edf7f95dc9da2f52ff93012c520a771a2884be6df9"
            className="aspect-[1] object-contain w-6 self-center"
            alt="Finance icon"
          />
          <div className="w-full mt-1 py-1">Finance</div>
        </div>
      </div>
    </div>
  );
};
