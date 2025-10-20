"use client"
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Clock, Calendar, MapPin, Users, DollarSign, Trophy, Smartphone, Zap, Flame, ClipboardClock } from 'lucide-react';
import { getDate } from '@/lib/date';
import Link from 'next/link';
import Counter from '@/components/Counter';
import { useSearchParams } from 'next/navigation';


const App = () => {
    const query = useSearchParams();
    const code = query.get("code")
    const date = new Date();

    
  const tournamentDetails = useMemo(() => ([
    { icon: Calendar, title: 'Date', value: date.toLocaleDateString(), color: 'text-sky-400' },
    { 
      icon: Clock,
       title: 'Start Time', 
      value: code === "YT434GR930" ? "9:30 PM" :"10:30 PM", 
      color: 'text-amber-400' 
    },
    { icon: MapPin, title: 'Map', value: 'Erangle', color: 'text-blue-400' },
    { icon: ClipboardClock, title: 'Map', value: '1 match hoga point base', color: 'text-green-400' },
    { icon: Users, title: 'Slots', value: '16 Squads Only', color: 'text-purple-400' },
    { icon: DollarSign, title: 'Entry Fee', value: '₹60 per Squad', color: 'text-lime-400' },
    { 
         icon: Zap,
         title: 'ID/Pass Mil Jayega',
         value: code === "YT434GR930" ? "9:00 PM" :"10:10 PM", 
         color: 'text-red-400'
     },
  ]), []);

  const prizePool = useMemo(() => ([
    { rank: '1st', prize: '₹500', icon: Trophy, color: 'text-yellow-400' },
    { rank: '2nd', prize: '₹200', icon: Trophy, color: 'text-gray-400' },
    { rank: '3rd', prize: '₹100', icon: Trophy, color: 'text-orange-400' },
  ]), []);

  const Card = ({ icon: Icon, title, value, color }) => (
    <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-xl shadow-xl border border-gray-700 hover:border-red-500 transition duration-300">
      <Icon className={`w-8 h-8 ${color} p-1 bg-gray-900 rounded-lg`} />
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</p>
        <p className="text-lg font-bold text-white">{value}</p>
      </div>
    </div>
  );

  return (

    

       <div className="min-h-screen bg-gray-950 p-4 font-sans flex justify-center items-start pt-8">


      <div className="w-full max-w-4xl space-y-8">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-2 tracking-tight">
            <span className="text-red-500 drop-shadow-lg">Apna eSports</span> 
          </h1>
          <p className="text-xl text-gray-300 font-medium flex items-center justify-center gap-2">
            <Flame className="w-5 h-5 text-red-400" />
            Registration Started! Erangle Map | Point System
          </p>
        </header>

        {/* Countdown Timer Section */}
        <Counter/>

        {/* Details Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tournamentDetails.map((detail, index) => (
            <Card key={index} {...detail} />
          ))}
        </section>

        {/* Prize Pool Section */}
        <section className="p-6 bg-gray-900 rounded-xl shadow-2xl border-2 border-red-600/50">
          <h2 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            🏆 PRIZE POOL 🏆
          </h2>
          <div className="space-y-3">
            {prizePool.map((prize, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded-lg shadow-md">
                <div className="flex items-center gap-3">
                  <span className={`text-xl font-extrabold ${prize.color}`}>{prize.rank}</span>
                  <p className="text-gray-300">Winner</p>
                </div>
                <p className="text-2xl font-extrabold text-white">{prize.prize}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Registration Info */}
        <section className="p-6 bg-gray-800 rounded-xl shadow-2xl border border-red-500/50">
          <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
            <Smartphone className="w-6 h-6 text-lime-400" />
            Registration Ke Liye
          </h2>
          <p className="text-gray-300 mb-3 text-lg">
            *Bhai*, registration **shaam 6:00 PM** ke baad *nahi hoga*!
            Aur **16 teams full** hone ke baad *bhi registration band* ho jayega.
          </p>
          <div className=" p-4 rounded-lg text-center">
            <p className="text-xl font-bold text-red-300 mb-4">WhatsApp Karo Jaldi!</p>
           


           <Link href={`/form?code=${code}`} className='inline-block px-6 py-3 bg-red-600 text-white font-extrabold rounded-full shadow-lg hover:bg-red-700 transition duration-300 transform hover:scale-105'>
           REGISTER NOW
           </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center pt-4 pb-8 text-gray-500 text-sm">
          <p>WINNER DECIDE BASE ON POINTS</p>
          <p>All times are PM</p>
        </footer>
      </div>
    </div>

   
  );
};


export default function DetailsPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <App />
    </Suspense>
  );
}
