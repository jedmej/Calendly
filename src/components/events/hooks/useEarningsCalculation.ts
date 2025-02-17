
import { useState, useEffect } from "react";

interface UseEarningsCalculationProps {
  startTime: string;
  endTime: string;
  hourlyWage: string;
  initialEarnings?: number;
}

export const useEarningsCalculation = ({
  startTime,
  endTime,
  hourlyWage,
  initialEarnings
}: UseEarningsCalculationProps) => {
  const [estimatedEarnings, setEstimatedEarnings] = useState(0);
  const [tips, setTips] = useState("0");
  const [totalEarnings, setTotalEarnings] = useState(initialEarnings || 0);

  useEffect(() => {
    calculateEarnings();
  }, [startTime, endTime, hourlyWage]);

  const calculateEarnings = () => {
    if (startTime && endTime && hourlyWage) {
      const start = new Date(`2000/01/01 ${startTime}`);
      const end = new Date(`2000/01/01 ${endTime}`);
      const hours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
      const earnings = hours * parseFloat(hourlyWage || "0");
      setEstimatedEarnings(earnings);
      const tipsValue = parseFloat(tips || "0");
      setTotalEarnings(earnings + tipsValue);
    }
  };

  const handleTipsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "0";
    setTips(value);
    const tipsValue = parseFloat(value || "0");
    setTotalEarnings(estimatedEarnings + tipsValue);
  };

  return {
    estimatedEarnings,
    tips,
    totalEarnings,
    handleTipsChange
  };
};
