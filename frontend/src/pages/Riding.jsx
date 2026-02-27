import React from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()

    useEffect(() => {
        socket.on("ride-ended", () => {
            navigate('/home')
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [])


    return (
        <div className='h-screen'>
            <Link to='/home' className='fixed right-2 top-2 h-10 w-10 bg-white flex items-center justify-center rounded-full z-10'>
                <i className="text-lg font-medium ri-home-5-line"></i>
            </Link>
            <div className='h-1/2'>
                <LiveTracking />

            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <div className='h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center'>
                            <span className='text-white font-bold text-lg'>{ride?.captain?.fullname?.firstname?.charAt(0)?.toUpperCase() || 'D'}</span>
                        </div>
                        <div>
                            <h2 className='text-lg font-medium capitalize'>{ride?.captain?.fullname?.firstname || ''}</h2>
                            <p className='text-sm text-gray-500'>{ride?.captain?.vehicle?.color || ''} {ride?.captain?.vehicle?.vehicleType || ''}</p>
                        </div>
                    </div>
                    <div className='text-right'>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1'>{ride?.captain?.vehicle?.plate || ''}</h4>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-3 border-b-2'>
                            <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
                            <div>
                                <h3 className='text-sm text-gray-400'>DROP-OFF</h3>
                                <p className='text-base font-medium'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-3'>
                            <i className="ri-currency-line text-yellow-500"></i>
                            <div>
                                <h3 className='text-lg font-medium'>₹{ride?.fare} </h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-green-600 text-white font-semibold p-2 rounded-lg'>Make a Payment</button>
            </div>
        </div>
    )
}

export default Riding