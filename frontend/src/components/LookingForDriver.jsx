import React from 'react'

const LookingForDriver = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Looking for a Driver</h3>

            <div className='flex gap-2 justify-between flex-col items-center'>
                <div className='relative'>
                    <div className='pulse-ring relative h-20 w-20 rounded-full bg-green-100 flex items-center justify-center'>
                        <i className="ri-search-line text-3xl text-green-600 animate-spin"></i>
                    </div>
                </div>
                <p className='text-sm text-gray-500 mt-2'>This usually takes 1-3 minutes</p>
                <div className='w-full mt-5'>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="ri-map-pin-user-fill text-green-600"></i>
                        <div>
                            <h3 className='text-sm text-gray-400'>PICKUP</h3>
                            <p className='text-base font-medium'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3 border-b-2'>
                        <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
                        <div>
                            <h3 className='text-sm text-gray-400'>DESTINATION</h3>
                            <p className='text-base font-medium'>{props.destination}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-5 p-3'>
                        <i className="ri-currency-line text-yellow-500"></i>
                        <div>
                            <h3 className='text-lg font-medium'>₹{props.fare[ props.vehicleType ]} </h3>
                            <p className='text-sm -mt-1 text-gray-600'>Cash</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LookingForDriver