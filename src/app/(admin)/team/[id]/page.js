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

    const {id} = useParams()

    useEffect(() => {
        getTeams()
    }, [])

    useEffect(() => {
        filterTeams()
    }, [teams, filters])

  

    const getTeams = async () => {
        try {
            const { data } = await axios.get(`/api/teams`,{
              params: {
        code: id,   // your query param
      },
            });
            setTeams(data?.data || []);

        } catch (error) {
            if(error.response) 
                return  toast.error(error.response.data.message)


            toast.error("Failed to registation Try again")
          
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
                team.teamName.toLowerCase().includes(searchTerm) ||
                team.player1.toLowerCase().includes(searchTerm) ||
                team.player2.toLowerCase().includes(searchTerm) ||
                team.player3.toLowerCase().includes(searchTerm) ||
                team.player4.toLowerCase().includes(searchTerm) ||
                team.whatsAppNumbr.includes(searchTerm) ||
                team.code.toLowerCase().includes(searchTerm)
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
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            completed: { color: 'bg-green-100 text-green-800', label: 'Completed' },
            failed: { color: 'bg-red-100 text-red-800', label: 'Failed' }
        };
        
        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        )
    }

    const getPaymentBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-orange-100 text-orange-800', label: 'Payment Pending' },
            completed: { color: 'bg-green-100 text-green-800', label: 'Paid' },
            failed: { color: 'bg-red-100 text-red-800', label: 'Payment Failed' }
        };
        
        const config = statusConfig[status] || { color: 'bg-gray-100 text-gray-800', label: status };
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
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

    return (
        <div className="min-h-screen bg-zinc-900 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl bg-zinc-800 font-bold text-gray-100">Team Registrations</h1>
                    <p className="text-gray-200 mt-2">Manage and view all team registrations</p>
                </div>

                {/* Filters */}
                <div className="bg-gray-700 rounded-lg shadow p-6 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Search */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Teams
                            </label>
                            <input
                                type="text"
                                placeholder="Search by team name, players, code..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>

                        {/* Payment Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Payment Status
                            </label>
                            <select
                                className="w-full px-3 py-2 border border-gray-300 bg-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.paymentStatus}
                                onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                            >
                                <option value="all">All Payments</option>
                                <option value="pending">Pending</option>
                                <option value="completed">Completed</option>
                                <option value="failed">Failed</option>
                            </select>
                        </div>

                        {/* Slot Status Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Slot Status
                            </label>
                            <select
                                className="w-full px-3 py-2 border bg-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={filters.slotStatus}
                                onChange={(e) => handleFilterChange('slotStatus', e.target.value)}
                            >
                                <option value="all">All Slots</option>
                                <option value="given">Slot Given</option>
                                <option value="not-given">Slot Not Given</option>
                            </select>
                        </div>

                        {/* Results Count */}
                        <div className="flex items-end">
                            <div className="text-sm text-gray-200">
                                Showing {filteredTeams.length} of {teams.length} teams
                            </div>
                        </div>
                    </div>
                </div>

                {/* Teams Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team) => (
                        <div key={team._id} className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-3">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-white font-bold text-lg truncate">
                                        {team.teamName}
                                    </h3>
                                    <div className="flex flex-col items-end space-y-1">
                                        {getPaymentBadge(team.payment_status)}
                                        {getStatusBadge(team.status)}
                                    </div>
                                </div>
                                <div className="flex justify-between items-center mt-2">
                                    <span className="text-blue-100 text-sm">
                                        Slot: {team.slot}
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                        team.isSlotGiven 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-red-100 text-red-800'
                                    }`}>
                                        {team.isSlotGiven ? 'Slot Given' : 'Slot Pending'}
                                    </span>
                                </div>
                            </div>

                            {/* Body */}
                            <div className="p-4">
                                {/* Team Code */}
                                <div className="mb-4">
                                    <label className="text-xs font-medium text-gray-500 uppercase">
                                        Team Code
                                    </label>
                                    <p className="text-sm font-mono text-gray-800 bg-gray-50 px-2 py-1 rounded">
                                        {team.code}
                                    </p>
                                </div>

                                {/* Players */}
                                <div className="mb-4">
                                    <label className="text-xs font-medium text-gray-500 uppercase mb-2 block">
                                        Players
                                    </label>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Player 1:</span>
                                            <span className="font-medium">{team.player1}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Player 2:</span>
                                            <span className="font-medium">{team.player2}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Player 3:</span>
                                            <span className="font-medium">{team.player3}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-600">Player 4:</span>
                                            <span className="font-medium">{team.player4}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Contact Info */}
                                <div className="mb-4">
                                    <label className="text-xs font-medium text-gray-500 uppercase">
                                        WhatsApp
                                    </label>
                                    <p className="text-sm text-gray-800">
                                        {team.whatsAppNumbr}
                                    </p>
                                </div>

                                {/* Order Info */}
                                <div className="mb-4">
                                    <label className="text-xs font-medium text-gray-500 uppercase">
                                        Order ID
                                    </label>
                                    <p className="text-xs font-mono text-gray-600 truncate">
                                        {team.order_id}
                                    </p>
                                </div>

                                {/* Dates */}
                                <div className="border-t pt-3">
                                    <div className="text-xs text-gray-500">
                                        Created: {formatDate(team.createdAt)}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        Updated: {formatDate(team.updatedAt)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredTeams.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">🏆</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No teams found</h3>
                        <p className="text-gray-600">
                            {teams.length === 0 
                                ? 'No teams have been registered yet.' 
                                : 'No teams match your current filters.'
                            }
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Teams