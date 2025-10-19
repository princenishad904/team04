"use client";
import React, { useState, useEffect, useMemo } from 'react';
import { Clock, Calendar, MapPin, Users, DollarSign, Trophy, Smartphone, Zap, Flame, ClipboardClock } from 'lucide-react';
import Link from 'next/link';
import { getDate } from '@/lib/date';

const CountdownTimer = ({ targetDate }) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    // Initialize only after client mounts
    const now = new Date().getTime();
    setTimeLeft(targetDate - now);

    const timer = setInterval(() => {
      setTimeLeft(targetDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const calculateTime = (ms) => {
    if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const time = calculateTime(timeLeft);
  const isExpired = timeLeft <= 0;

  const TimeBlock = ({ value, label }) => (
    <div className="flex flex-col items-center bg-gray-800/70 p-3 rounded-xl min-w-[60px] shadow-lg border border-red-500/30">
      <span className="text-3xl font-extrabold text-red-400 tabular-nums">
        {String(value).padStart(2, '0')}
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
        {isExpired ? 'Tournament is LIVE!' : 'MATCH START HONE MEIN BAQI HAI...'}
      </h3>
      <div className="flex justify-center gap-3 sm:gap-4">
        <TimeBlock value={time.days} label="Days" />
        <TimeBlock value={time.hours} label="Hours" />
        <TimeBlock value={time.minutes} label="Mins" />
        <TimeBlock value={time.seconds} label="Secs" />
      </div>
    </div>
  );
};

const Counter = () => {
  const [targetDate, setTargetDate] = useState(null);

  useEffect(() => {
    // Only compute after client mounts (avoid SSR mismatch)
    const date = new Date(getDate()).getTime();
    setTargetDate(date);
  }, []);

  const tournamentDetails = useMemo(() => ([ /* your data */ ]), []);
  const prizePool = useMemo(() => ([ /* your data */ ]), []);

  if (!targetDate) return null; // wait until mounted

  return (
    <div className="min-h-auto bg-gray-950 p-4 font-sans flex justify-center items-start">
      {/* your existing JSX */}
      <CountdownTimer targetDate={targetDate} />
      {/* rest of your content */}
    </div>
  );
};

export default Counter;
