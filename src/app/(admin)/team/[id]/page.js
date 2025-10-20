'use client'
import axios from 'axios'
import { useParams, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const Teams = () => {
    const query = useSearchParams();
    const [teams, setTeams] = useState([])
    const [filteredTeams, setFilteredTeams] = useState([])
    const [filters, setFilters] = useState({
        paymentStatus: 'all',
        slotStatus: 'all',
        search: ''
    })
    const [loading, setLoading] = useState(true)

    const {id} = useParams()

    useEffect(() => {
        getTeams()
    }, [])

    useEffect(() => {
        filterTeams()
    }, [teams, filters])

    const getTeams = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`/api/teams`,{
                params: {
                    code: id,
                },
            });
            console.log(data)
            setTeams(data?.data || []);
        } catch (error) {
            if(error.response) 
                return toast.error(error.response.data.message)
            toast.error("Failed to fetch teams. Try again")
        } finally {
            setLoading(false)
        }
    }

    const filterTeams = () => {
        let filtered = teams;

        if (filters.paymentStatus !== 'all') {
            filtered = filtered.filter(team => team.payment_status === filters.paymentStatus);
        }

        if (filters.slotStatus !== 'all') {
            filtered = filtered.filter(team => 
                filters.slotStatus === 'given' ? team.isSlotGiven : !team.isSlotGiven
            );
        }

        if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filtered = filtered.filter(team =>
                team.teamName?.toLowerCase().includes(searchTerm) ||
                team.player1?.toLowerCase().includes(searchTerm) ||
                team.player2?.toLowerCase().includes(searchTerm) ||
                team.player3?.toLowerCase().includes(searchTerm) ||
                team.player4?.toLowerCase().includes(searchTerm) ||
                team.whatsAppNumbr?.includes(searchTerm) ||
                team.code?.toLowerCase().includes(searchTerm)
            );
        }

        setFilteredTeams(filtered);
    }

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-amber-500/20 text-amber-300 border-amber-500/30', label: 'Pending', icon: '⏳' },
            completed: { color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', label: 'Completed', icon: '✅' },
            failed: { color: 'bg-rose-500/20 text-rose-300 border-rose-500/30', label: 'Failed', icon: '❌' }
        };
        
        const config = statusConfig[status] || { color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', label: status, icon: '⚡' };
        return (
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${config.color} flex items-center gap-1.5`}>
                <span>{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getPaymentBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', label: 'Payment Pending', icon: '💳' },
            completed: { color: 'bg-green-500/20 text-green-300 border-green-500/30', label: 'Paid', icon: '💰' },
            failed: { color: 'bg-red-500/20 text-red-300 border-red-500/30', label: 'Payment Failed', icon: '🚫' }
        };
        
        const config = statusConfig[status] || { color: 'bg-gray-500/20 text-gray-300 border-gray-500/30', label: status, icon: '⚡' };
        return (
            <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${config.color} flex items-center gap-1.5`}>
                <span>{config.icon}</span>
                {config.label}
            </span>
        )
    }

    const getSlotBadge = (isSlotGiven) => {
        return isSlotGiven ? (
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5">
                <span>🎯</span>
                Slot Given
            </span>
        ) : (
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
                <span>⏰</span>
                Slot Pending
            </span>
        )
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })
    }

    const PlayerCard = ({ name, number }) => (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
           
            <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-sm truncate">{name || 'Not provided'}</p>
            </div>
        </div>
    )

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-white text-lg font-semibold">Loading Teams...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
                        <span className="text-3xl">🏆</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold  mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        Team Registrations
                    </h1>
                    <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                        Manage and monitor all team registrations in one place
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm font-medium">Total Teams</p>
                                <p className="text-3xl font-bold text-white mt-2">{teams.length}</p>
                            </div>
                            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">👥</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm font-medium">Paid Teams</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {teams.filter(t => t.payment_status === 'paid').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">💰</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm font-medium">Slots Given</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {teams.filter(t => t.isSlotGiven).length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">🎯</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-300 text-sm font-medium">Pending</p>
                                <p className="text-3xl font-bold text-white mt-2">
                                    {teams.filter(t => t.payment_status === 'pending').length}
                                </p>
                            </div>
                            <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">⏳</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                        {/* Search */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span>🔍</span>
                                Search Teams
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search by team name, players, code..."
                                    className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Payment Status Filter */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span>💳</span>
                                Payment Status
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                value={filters.paymentStatus}
                                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                            >
                                <option value="all" className="bg-slate-800">All Payments</option>
                                <option value="pending" className="bg-slate-800">Pending</option>
                                <option value="paid" className="bg-slate-800">Paid</option>
                                <option value="failed" className="bg-slate-800">Failed</option>
                            </select>
                        </div>

                        {/* Slot Status Filter */}
                        <div>
                            <label className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                <span>🎯</span>
                                Slot Status
                            </label>
                            <select
                                className="w-full px-4 py-3 bg-black/30 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                                value={filters.slotStatus}
                                onChange={(e) => handleFilterChange('slotStatus', e.target.value)}
                            >
                                <option value="all" className="bg-slate-800">All Slots</option>
                                <option value="given" className="bg-slate-800">Slot Given</option>
                                <option value="not-given" className="bg-slate-800">Slot Not Given</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className="bg-black/30 rounded-xl p-4 border border-white/20 w-full">
                                <p className="text-sm text-gray-300 font-medium">Showing</p>
                                <p className="text-2xl font-bold text-white">
                                    {filteredTeams.length} <span className="text-lg text-gray-400">/ {teams.length}</span>
                                </p>
                                <p className="text-xs text-gray-400 mt-1">teams</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                        <div key={team._id} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/20 overflow-hidden hover:border-white/40 hover:transform hover:scale-[1.02] transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-600/80 to-purple-600/80 p-6 relative overflow-hidden">

                            <div className='flex items-center justify-between'>
                                   <h3 className="text-white font-bold text-xl truncate pr-4">
                                            {team.teamName}
                                        </h3>  


                                         <div className="bg-black/20 rounded-lg px-3 py-1.5">
                                            <span className="text-blue-100 text-sm font-semibold">
                                                Slot: {team.slot || 'Not assigned'}
                                            </span>
                                        </div>
                            </div>
                        
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                                <div className="relative ">
                                    <div className="flex my-4 ">
                                       
                                       
                                            {getPaymentBadge(team.payment_status)}
                                            {getStatusBadge(team.status)}
                                       
                                    </div>
                                    
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-6">
                                {/* Team Code */}
                                <div className="mb-6">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span>🔑</span>
                                        Team Code
                                    </label>
                                    <div className="bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                                        <p className="text-sm font-mono text-white font-bold tracking-wider">
                                            {team.code}
                                        </p>
                                    </div>
                                </div>

                                {/* Players */}
                                <div className="mb-4">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span>👥</span>
                                        Team Players
                                    </label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <PlayerCard name={team.player1} number={1} />
                                        <PlayerCard name={team.player2} number={2} />
                                        <PlayerCard name={team.player3} number={3} />
                                        <PlayerCard name={team.player4} number={4} />
                                    </div>
                                </div>

                                {
                                    team.backupPlayer1 && <div className="mb-4">
                                    <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span>👥</span>
                                        Backup Players
                                    </label>

                                    <div className="grid grid-cols-2 gap-2">
                                        <PlayerCard name={team.backupPlayer1} number={1} />
                                        <PlayerCard name={team.backupPlayer2} number={2} />
                                        
                                    </div>
                                </div>
                                }
                               

                                {/* Contact & Order Info */}
                                <div className="grid grid-cols-1 gap-4 mb-6">
                                    <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-green-400">📱</span>
                                            <label className="text-xs font-semibold text-gray-400 uppercase">WhatsApp</label>
                                        </div>
                                        <p className="text-white font-medium">{team.whatsAppNumbr}</p>
                                    </div>
                                    
                                    <div className="bg-black/30 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-blue-400">🆔</span>
                                            <label className="text-xs font-semibold text-gray-400 uppercase">Order ID</label>
                                        </div>
                                        <p className="text-sm text-gray-300 font-mono truncate">
                                            {team.order_id || 'Not available'}
                                        </p>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="border-t border-white/10 pt-4 space-y-2">
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 flex items-center gap-1">
                                            <span>📅</span>
                                            Created:
                                        </span>
                                        <span className="text-gray-300">{formatDate(team.createdAt)}</span>
                                    </div>
                                    <div className="flex justify-between text-xs">
                                        <span className="text-gray-400 flex items-center gap-1">
                                            <span>🔄</span>
                                            Updated:
                                        </span>
                                        <span className="text-gray-300">{formatDate(team.updatedAt)}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTeams.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20">
                            <span className="text-6xl">🏆</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">
                            {teams.length === 0 ? 'No teams registered yet' : 'No teams found'}
                        </h3>
                        <p className="text-gray-400 text-lg max-w-md mx-auto">
                            {teams.length === 0 
                                ? 'Teams will appear here once they start registering.' 
                                : 'Try adjusting your filters to see more results.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Teams