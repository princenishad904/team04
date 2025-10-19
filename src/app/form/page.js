'use client'

import { GamingInput } from '@/components/shared/GamingInput';
import { useRouter, useSearchParams } from 'next/navigation';


import React, { Suspense, useState } from 'react';
import { toast } from 'react-toastify';

const Form = () => {
       const query = useSearchParams();
      const code = query.get("code");


      
  const [formData, setFormData] = useState({
    teamName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    backup1: '',
    backup2: '',
  });



  const router = useRouter()
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['teamName', 'player1', 'player2', 'player3', 'player4'];
    const isValid = requiredFields.every(field => formData[field].trim() !== '');
    if (isValid) {
      const myTeam = JSON.stringify(formData);
      localStorage.setItem("myTeam",myTeam)

      
           router.push(`/checkout?code=${code}`)
    
    }
  };



  const handlePreviousTeam = ()=>{
      const team = JSON.parse(localStorage.getItem("myTeam"));
      if(!team)
        return toast.error("You have no saved players");


      setFormData(team);

  }



  return (
       <Suspense allback={<div className="text-white text-center mt-10">Loading...</div>}>

        <div className="min-h-screen bg-zinc-900 flex items-center justify-center font-sans">
      <div className="w-full max-w-xl bg-gray-900 p-6 sm:p-8 rounded-xl shadow-2xl transform transition-all ">
        
        {/* Header - Gaming Aesthetic */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-yellow-500 mb-2 tracking-widest uppercase" style={{ textShadow: '0 0 10px rgba(239, 68, 68, 0.8)' }}>
          BGMI TOURNAMENT
        </h1>
        <p className="text-center text-cyan-400 mb-6 text-sm sm:text-base font-medium">
          Secure Your Squad Slot. The Zone Awaits!
        </p>
        

          <div>
            <button onClick={handlePreviousTeam} className='py-2 rounded  px-4 w-full bg-green-700 text-xl text-white'>Use previous team</button>
          </div>
        
        {/* Form Start */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Team Details */}
          <div className="border-t border-b border-purple-500 pt-4 pb-2">
             <h2 className="text-xl font-bold text-yellow-400 mb-4 uppercase tracking-wider">Team Information</h2>
             <GamingInput
                label="Squad Name (REQUIRED)"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="e.g., GodLike, Soul, Team X"
             />
          </div>


        
          
          {/* Main Squad Players */}
          <div className="border-b border-purple-500 pt-2 pb-4">
            <h2 className="text-xl font-bold text-cyan-400 mb-4 uppercase tracking-wider">Main Squad (4 Players)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GamingInput label="Player 1 "  name="player1" value={formData.player1} onChange={handleChange}  placeholder="In-Game Name (IGN)"/>
              <GamingInput label="Player 2 "  name="player2" value={formData.player2} onChange={handleChange} placeholder="In-Game Name (IGN)"/>
              <GamingInput label="Player 3 "   name="player3" value={formData.player3} onChange={handleChange} placeholder="In-Game Name (IGN)"/>
              <GamingInput label="Player 4 " name="player4" value={formData.player4} onChange={handleChange} placeholder="In-Game Name (IGN)"/>
            </div>
          </div>
          
          {/* Backup Players (Optional) */}
          <div>
            <h2 className="text-xl font-bold text-yellow-400 mb-4 uppercase tracking-wider">Backup Players (Optional)</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <GamingInput label="Backup Player 1" require={false} name="backup1" value={formData.backup1} onChange={handleChange} placeholder="IGN (Optional)"/>
              <GamingInput label="Backup Player 2" require={false} name="backup2" value={formData.backup2} onChange={handleChange} placeholder="IGN (Optional)"/>
            </div>
          </div>
          
          {/* Submit Button - Highly Styled */}
          <div className="pt-4 flex items-center flex-col">
            <button 
              type="submit" 
              className="w-full inline-flex items-center justify-center px-8 py-4 font-sans font-extrabold tracking-widest text-lg text-white uppercase bg-yellow-500 rounded-lg h-[60px] 
                         shadow-2xl shadow-red-500/50 transition duration-300 ease-in-out transform hover:scale-[1.01] hover:bg-yellow-600 border-2 border-yellow-400"
              style={{ clipPath: 'polygon(0 0, 100% 0, 95% 100%, 5% 100%)' }} // Custom aggressive shape
            >
              <svg className="w-6 h-6 mr-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
              Save & pay
              <svg className="w-6 h-6 ml-3 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
            </button>



             
          </div>
          
        </form>
        {/* Form End */}

      </div>
    </div>
       </Suspense>

    
  );
};




export default function FormPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <Form />
    </Suspense>
  );
}

