"use client";
import React, { useState, useEffect } from "react";
import { Zap } from "lucide-react";

// Utility function to convert "HH:mm" or "hh:mm AM/PM" → timestamp
const getTargetDateFromTime = (timeString) => {
  const now = new Date();

  // Handle both 24hr and 12hr formats
  let [hours, minutes] = [0, 0];
  let period = "";

  if (timeString.toLowerCase().includes("am") || timeString.toLowerCase().includes("pm")) {
    // Example: "09:30 PM"
    const parts = timeString.trim().split(" ");
    [hours, minutes] = parts[0].split(":").map(Number);
    period = parts[1].toLowerCase();

    if (period === "pm" && hours < 12) hours += 12;
    if (period === "am" && hours === 12) hours = 0;
  } else {
    // Example: "21:30"
    [hours, minutes] = timeString.split(":").map(Number);
  }

  const target = new Date();
  target.setHours(hours, minutes, 0, 0);

  // If the time has already passed today → use tomorrow
  if (target.getTime() < now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime();
};

const Counter = ({ time }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const targetDate = getTargetDateFromTime(time);

    const updateTime = () => {
      setTimeLeft(targetDate - new Date().getTime());
    };

    updateTime(); // initialize immediately
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const calculateTime = (ms) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const timeData = calculateTime(timeLeft);
  const isExpired = timeLeft <= 0;

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center bg-gray-800/70 p-3 rounded-xl min-w-[60px] shadow-lg border border-red-500/30">
      <span className="text-3xl font-extrabold text-red-400 tabular-nums">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-xs font-medium text-gray-400 uppercase mt-1">
        {label}
      </span>
    </div>
  );

  return (
    <div className="p-4 bg-gray-900 rounded-xl shadow-2xl border-2 border-red-600/50">
      <h3 className="text-lg font-bold text-white mb-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-5 h-5 text-red-400 animate-pulse" />
        {isExpired ? "Tournament is LIVE!" : "MATCH START HONE MEIN BAQI HAI..."}
      </h3>
      <div className="flex justify-center gap-3 sm:gap-4">
        <TimeBlock value={timeData.days} label="Days" />
        <TimeBlock value={timeData.hours} label="Hours" />
        <TimeBlock value={timeData.minutes} label="Mins" />
        <TimeBlock value={timeData.seconds} label="Secs" />
      </div>
    </div>
  );
};


export default Counter;
