'use client'

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import { 
  Sword, 
  Users, 
  Shield, 
  Trophy, 
  Gamepad2, 
  Save,
  ArrowRight,
  ArrowLeft,
  Crown,
  Zap
} from 'lucide-react';
import { GamingInput } from '@/components/shared/GamingInput';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationPage = () => {
  const router = useRouter();
  const [savedTeams, setSavedTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showTeamSelector, setShowTeamSelector] = useState(false);


    const searchParams = useSearchParams();
    const code = searchParams.get("code");

  const [formData, setFormData] = useState({
    teamName: '',
    player1: '',
    player2: '',
    player3: '',
    player4: '',
    backup1: '',
    backup2: '',
  });

  // Load saved teams from localStorage on component mount
  useEffect(() => {
    const teams = JSON.parse(localStorage.getItem('bgmiTeams') || '[]');
    setSavedTeams(teams);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = ['teamName', 'player1', 'player2', 'player3', 'player4'];
    const missingFields = requiredFields.filter(field => !formData[field].trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill all required fields: ${missingFields.join(', ')}`);
      return false;
    }

    // Check for duplicate player names
    const players = [formData.player1, formData.player2, formData.player3, formData.player4, formData.backup1, formData.backup2].filter(Boolean);
    const uniquePlayers = new Set(players.map(p => p.toLowerCase()));
    
    if (uniquePlayers.size !== players.length) {
      toast.error('Player names must be unique!');
      return false;
    }

    return true;
  };

  const handleSaveTeam = () => {
    if (!validateForm()) return;

    const teams = JSON.parse(localStorage.getItem('bgmiTeams') || '[]');
    
    // Check if team name already exists
    if (teams.some(team => team.teamName.toLowerCase() === formData.teamName.toLowerCase())) {
      toast.error('Team name already exists!');
      return;
    }

    const newTeam = { ...formData, id: Date.now() };
    const updatedTeams = [...teams, newTeam];
    
    localStorage.setItem('bgmiTeams', JSON.stringify(updatedTeams));
    setSavedTeams(updatedTeams);
    
    toast.success('Team saved successfully! 🎮');
  };

  const handleLoadTeam = (team) => {
    setFormData(team);
    setSelectedTeam(team.id);
    setShowTeamSelector(false);
    toast.info(`Loaded team: ${team.teamName}`);
  };

  const handleDeleteTeam = (teamId, teamName) => {
    const updatedTeams = savedTeams.filter(team => team.id !== teamId);
    localStorage.setItem('bgmiTeams', JSON.stringify(updatedTeams));
    setSavedTeams(updatedTeams);
    
    if (selectedTeam === teamId) {
      setFormData({
        teamName: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        backup1: '',
        backup2: '',
      });
      setSelectedTeam(null);
    }
    
    toast.warning(`Deleted team: ${teamName}`);
  };

  const handleRegister = () => {
    if (!validateForm()) return;

    const registrationData = {
      ...formData,
     
    };

    delete registrationData.id;

    // Save to localStorage
   

    localStorage.setItem('myTeam', JSON.stringify(registrationData));

 


   
    router.push(`/checkout/?code=${code}`)
    

    
    // Redirect to confirmation page or clear form
    setTimeout(() => {
      setFormData({
        teamName: '',
        player1: '',
        player2: '',
        player3: '',
        player4: '',
        backup1: '',
        backup2: '',
      });
      setSelectedTeam(null);
    }, 2000);
  };

  const TeamSelectorModal = () => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border-2 border-cyan-500 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-yellow-400 flex items-center gap-2">
              <Crown className="w-6 h-6" />
              Select Your Team
            </h3>
            <button 
              onClick={() => setShowTeamSelector(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          </div>
          
          {savedTeams.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No saved teams found</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {savedTeams.map((team) => (
                <div 
                  key={team.id}
                  className="border-2 border-cyan-500/30 rounded-lg p-4 hover:border-cyan-500 transition-all cursor-pointer bg-gray-800/50"
                  onClick={() => handleLoadTeam(team)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xl font-bold text-yellow-400">{team.teamName}</h4>
                      <p className="text-gray-300 text-sm">
                        {team.player1}, {team.player2}, {team.player3}, {team.player4}
                        {team.backup1 && `, ${team.backup1}`}
                        {team.backup2 && `, ${team.backup2}`}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLoadTeam(team);
                        }}
                        className="px-3 py-1 bg-cyan-600 hover:bg-cyan-700 rounded text-sm transition-colors"
                      >
                        Load
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteTeam(team.id, team.teamName);
                        }}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-950 py-8 px-4">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />
      
      {showTeamSelector && <TeamSelectorModal />}
      
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-4 mb-4">
            <Trophy className="w-12 h-12 text-yellow-500" />
            <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              BGMI TOURNAMENT
            </h1>
            <Gamepad2 className="w-12 h-12 text-cyan-500" />
          </div>
          <p className="text-cyan-300 text-lg mb-2">Secure Your Squad Slot. The Zone Awaits!</p>
          <div className="flex items-center justify-center gap-2 text-yellow-500">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">₹10,000 Prize Pool</span>
            <Zap className="w-5 h-5" />
          </div>
        </div>

        {/* Team Management Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => setShowTeamSelector(true)}
            className="bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 
                       text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 
                       flex items-center justify-center gap-2 border-2 border-cyan-500/50"
          >
            <Users className="w-5 h-5" />
            Load Saved Team
          </button>
          
          <button
            onClick={handleSaveTeam}
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 
                       text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 
                       flex items-center justify-center gap-2 border-2 border-green-500/50"
          >
            <Save className="w-5 h-5" />
            Save Team
          </button>
          
          <button
            onClick={handleRegister}
            className="bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 
                       text-white py-3 px-6 rounded-lg font-bold transition-all duration-300 
                       flex items-center justify-center gap-2 border-2 border-yellow-500/50"
          >
            <Sword className="w-5 h-5" />
            Register Team
          </button>
        </div>

        {/* Stats Bar */}
        <div className="bg-gray-800/50 rounded-lg p-4 mb-8 border-2 border-cyan-500/30">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-cyan-300 text-sm">Saved Teams</p>
              <p className="text-2xl font-bold text-yellow-400">{savedTeams.length}</p>
            </div>
            <div>
              <p className="text-cyan-300 text-sm">Main Players</p>
              <p className="text-2xl font-bold text-green-400">4</p>
            </div>
            <div>
              <p className="text-cyan-300 text-sm">Backup Players</p>
              <p className="text-2xl font-bold text-blue-400">2</p>
            </div>
            <div>
              <p className="text-cyan-300 text-sm">Team Size</p>
              <p className="text-2xl font-bold text-purple-400">4-6</p>
            </div>
          </div>
        </div>

        {/* Registration Form */}
        <div className="bg-gray-900/80 backdrop-blur-sm border-2 border-cyan-500 rounded-xl p-6 shadow-2xl">
          <form className="space-y-8">
            {/* Team Information */}
            <div className="border-l-4 border-yellow-500 pl-4">
              <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
                <Crown className="w-6 h-6" />
                Team Information
              </h2>
              <GamingInput
                label="Squad Name"
                name="teamName"
                value={formData.teamName}
                onChange={handleChange}
                placeholder="Enter your squad name (e.g., GodLike, Soul, Team X)"
              />
            </div>

            {/* Main Squad */}
            <div className="border-l-4 border-cyan-500 pl-4">
              <h2 className="text-2xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <Users className="w-6 h-6" />
                Main Squad (4 Players Required)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GamingInput
                  label="Player 1 (Leader)"
                  name="player1"
                  value={formData.player1}
                  onChange={handleChange}
                  placeholder="In-Game Name (IGN)"
                />
                <GamingInput
                  label="Player 2"
                  name="player2"
                  value={formData.player2}
                  onChange={handleChange}
                  placeholder="In-Game Name (IGN)"
                />
                <GamingInput
                  label="Player 3"
                  name="player3"
                  value={formData.player3}
                  onChange={handleChange}
                  placeholder="In-Game Name (IGN)"
                />
                <GamingInput
                  label="Player 4"
                  name="player4"
                  value={formData.player4}
                  onChange={handleChange}
                  placeholder="In-Game Name (IGN)"
                />
              </div>
            </div>

            {/* Backup Players */}
            <div className="border-l-4 border-green-500 pl-4">
              <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                Backup Players (Optional)
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GamingInput
                  label="Backup Player 1"
                  name="backup1"
                  value={formData.backup1}
                  onChange={handleChange}
                  placeholder="IGN (Optional)"
                  required={false}
                />
                <GamingInput
                  label="Backup Player 2"
                  name="backup2"
                  value={formData.backup2}
                  onChange={handleChange}
                  placeholder="IGN (Optional)"
                  required={false}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                type="button"
                onClick={handleSaveTeam}
                className="flex-1 bg-gradient-to-r from-cyan-600 to-cyan-700 hover:from-cyan-700 hover:to-cyan-800 
                           text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 
                           flex items-center justify-center gap-3 border-2 border-cyan-500/50"
              >
                <Save className="w-6 h-6" />
                Save Team
              </button>
              
              <button
                type="button"
                onClick={handleRegister}
                className="flex-1 bg-gradient-to-r from-yellow-600 to-yellow-700 hover:from-yellow-700 hover:to-yellow-800 
                           text-white py-4 px-8 rounded-lg font-bold text-lg transition-all duration-300 
                           flex items-center justify-center gap-3 border-2 border-yellow-500/50"
              >
                Register Now
                <ArrowRight className="w-6 h-6" />
              </button>
            </div>
          </form>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-gray-400">
          <p className="flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Your team data is saved locally in your browser
          </p>
          <p className="text-sm mt-2">One team name per registration. Duplicate entries will be rejected.</p>
        </div>
      </div>
    </div>
  );
};




// Main component with Suspense boundary
export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-10">Loading...</div>}>
      <RegistrationPage />
    </Suspense>
  );
}


