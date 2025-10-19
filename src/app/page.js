'use client'
import MatchCard from '@/components/shared/MatchCard'
import React from 'react'

const tournamentData = {
  restriction: "ERANGLE ONLY 40 LEVEL PLAYERS ALLOWED",
  mapName: "ERANGLE",
  dateTime: "Monday 1 September, 2025 at 9:30 pm",
  currentSquads: 1,
  maxSquads: 20,
  entryFee: "₹100/ squad",
  type: "SQUAD",
  prizePool: "1980",
  isActive: true, // For the green dot indicator
  code:"YT434GR930"
};
const tournamentData2 = {
  restriction: "ERANGLE ONLY 40 LEVEL PLAYERS ALLOWED",
  mapName: "ERANGLE",
  dateTime: "Monday 1 September, 2025 at 9:30 pm",
  currentSquads: 1,
  maxSquads: 20,
  entryFee: "₹100/ squad",
  type: "SQUAD",
  prizePool: "1980",
  isActive: true, // For the green dot indicator
  code:"YT859GR1040"
};
const Home = () => {
  return (
    <div className='w-full max-w-xl h-auto mx-auto p-4'>
      <MatchCard tournamentData={tournamentData} />
      <MatchCard tournamentData={tournamentData2} />
    </div>
  )
}

export default Home