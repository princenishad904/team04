"use client";
import React, { useMemo } from "react";
import { Monitor, Users, DollarSign, Clock, Barcode, IndianRupee } from 'lucide-react';
import Link from "next/link";




const MatchCard = ({tournamentData}) => {
  // Calculate percentage for the progress bar
  const progressPercentage = useMemo(() => {
    return Math.round((tournamentData.currentSquads / tournamentData.maxSquads) * 100);
  }, [tournamentData.currentSquads, tournamentData.maxSquads]);

  return (
    <div className="">
      
      {/* Main Card Container */}
      <div className="relative drop-shadow-xl w-full overflow-hidden rounded-xl bg-slate-800 my-4 card-shadow">
        
        {/* Background Blur Effects (as in the original code) */}
        <div className="absolute w-96 h-66 bg-cyan-400 opacity-20 blur-[60px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute w-96 h-66 bg-black opacity-50 blur-[50px] -left-1/2 -top-1/2" />

        {/* Content Layer */}
        <div className="relative z-[2] p-5 text-white bg-slate-900/90 rounded-xl m-0.5">
          
          {/* Restriction Header */}
          <div className="text-xs text-gray-400 font-semibold mb-2 tracking-wide uppercase">
            {tournamentData.restriction}
          </div>

          {/* Map Name & Status Indicator */}
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-extrabold text-cyan-400">
              {tournamentData.mapName}
            </h1>
            {/* Status Indicator (Green/Red dot) */}
            <div className={`w-3 h-3 rounded-full ${tournamentData.isActive ? 'bg-green-500 shadow-lg shadow-green-500/50' : 'bg-red-500'}`}></div>
          </div>

          {/* Time Details */}
          <div className="text-sm text-gray-400 mb-2 flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            {tournamentData.dateTime}
          </div>
          <div className="text-sm text-gray-400 mb-6 flex items-center">
          <Barcode className="w-4 h-4 mr-2 text-gray-500" />
           Code : {tournamentData.code}
          </div>

         

          {/* Separator */}
          <div className="border-t border-blue-800/50 pt-4"></div>

          {/* Footer Details (3 Columns) */}
          <div className="flex justify-between text-center pt-4 mb-6">
            
            {/* Entry Fee */}
            <DetailItem 
              label="Entry Fee" 
              value={tournamentData.entryFee} 
              icon={IndianRupee}
              valueColor="text-yellow-500"
            />

            {/* Type */}
            <div className="flex-1 px-1 border-l border-r border-blue-800/50">
                <div className="text-xs text-gray-400 mb-1 uppercase">Type</div>
                <div className="text-sm  text-white  px-2 py-0.5 rounded-md inline-block">
                    {tournamentData.type}
                </div>
            </div>

            {/* Prize Pool */}
            <DetailItem 
              label="Prize Pool" 
              value={tournamentData.prizePool} 
              icon={Monitor}
              valueColor="text-green-400"
            />
          </div>

          {/* Register Now Button */}
          <Link href={`/details?code=${tournamentData.code}`}>
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg text-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-600/50 uppercase">
            Register Now
          </button>
          </Link>
        

        </div>
      </div>
    </div>
  );
};

// Helper component for cleaner detail rendering
const DetailItem = ({ label, value, icon: Icon, valueColor }) => (
    <div className="flex-1 px-1">
        <div className="text-xs text-gray-400 mb-1 uppercase">{label}</div>
        <div className={`text-lg font-bold flex items-center justify-center ${valueColor}`}>
            {Icon && <Icon className="w-4 h-4 mr-1 stroke-[2.5]" />}
            {value}
        </div>
    </div>
);


export default MatchCard;
