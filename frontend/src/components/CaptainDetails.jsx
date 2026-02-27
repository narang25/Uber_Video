
import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CapatainContext'
import axios from 'axios'

const CaptainDetails = () => {

    const { captain } = useContext(CaptainDataContext)
    const [stats, setStats] = useState({ totalRides: 0, totalEarnings: 0, totalDistance: 0, totalHours: 0 })

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/captains/stats`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('captainToken')}`
                    }
                })
                setStats(res.data)
            } catch {
                // silently fail
            }
        }
        if (captain) fetchStats()
    }, [captain])

    if (!captain) {
        return <div className='flex items-center justify-center p-6'>
            <div className='h-8 w-8 border-4 border-gray-300 border-t-black rounded-full animate-spin'></div>
        </div>
    }

    return (
        <div>
            {/* Captain profile row */}
            <div className='flex items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <div className='h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center'>
                        <span className='text-white font-bold text-xl'>{captain.fullname?.firstname?.charAt(0)?.toUpperCase() || 'C'}</span>
                    </div>
                    <div>
                        <h4 className='text-lg font-semibold capitalize'>{captain.fullname?.firstname + " " + (captain.fullname?.lastname || '')}</h4>
                        <p className='text-sm text-gray-500'>{captain.vehicle?.color} {captain.vehicle?.vehicleType} · {captain.vehicle?.plate}</p>
                    </div>
                </div>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${captain.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {captain.status === 'active' ? '● Online' : '● Offline'}
                </span>
            </div>

            {/* Stats grid */}
            <div className='grid grid-cols-2 gap-3 mt-5'>
                <div className='bg-green-50 rounded-xl p-4'>
                    <div className='flex items-center gap-2 mb-1'>
                        <i className="ri-money-rupee-circle-line text-green-600 text-lg"></i>
                        <span className='text-sm text-gray-500'>Earned</span>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900'>₹{stats.totalEarnings}</h3>
                </div>
                <div className='bg-blue-50 rounded-xl p-4'>
                    <div className='flex items-center gap-2 mb-1'>
                        <i className="ri-route-line text-blue-600 text-lg"></i>
                        <span className='text-sm text-gray-500'>Driven</span>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900'>{stats.totalDistance} km</h3>
                </div>
                <div className='bg-yellow-50 rounded-xl p-4'>
                    <div className='flex items-center gap-2 mb-1'>
                        <i className="ri-taxi-line text-yellow-600 text-lg"></i>
                        <span className='text-sm text-gray-500'>Rides</span>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900'>{stats.totalRides}</h3>
                </div>
                <div className='bg-purple-50 rounded-xl p-4'>
                    <div className='flex items-center gap-2 mb-1'>
                        <i className="ri-time-line text-purple-600 text-lg"></i>
                        <span className='text-sm text-gray-500'>Hours</span>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900'>{stats.totalHours} h</h3>
                </div>
            </div>
        </div>
    )
}

export default CaptainDetails