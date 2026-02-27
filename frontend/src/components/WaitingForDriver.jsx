import React from 'react'

const WaitingForDriver = (props) => {
  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='flex items-center justify-between'>
        <div className='h-14 w-14 rounded-full bg-gray-800 flex items-center justify-center flex-shrink-0'>
          <span className='text-white font-bold text-xl'>{props.ride?.captain?.fullname?.firstname?.charAt(0)?.toUpperCase() || 'D'}</span>
        </div>
        <div className='text-right'>
          <h2 className='text-lg font-medium capitalize'>{props.ride?.captain?.fullname?.firstname || ''}</h2>
          <h4 className='text-xl font-semibold -mt-1 -mb-1'>{props.ride?.captain?.vehicle?.plate || ''}</h4>
          <p className='text-sm text-gray-600'>{props.ride?.captain?.vehicle?.color || ''} {props.ride?.captain?.vehicle?.vehicleType || ''}</p>
        </div>
      </div>

      {/* OTP Display - prominent */}
      <div className='flex items-center justify-center gap-3 mt-4 py-3 bg-black rounded-lg'>
        <span className='text-white text-sm font-medium'>Share OTP</span>
        <span className='text-white text-2xl font-bold tracking-[0.5em] font-mono'>{props.ride?.otp || '------'}</span>
      </div>

      <div className='flex gap-2 justify-between flex-col items-center'>
        <div className='w-full mt-4'>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-user-fill text-green-600"></i>
            <div>
              <h3 className='text-sm text-gray-400'>PICKUP</h3>
              <p className='text-base font-medium'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
            <div>
              <h3 className='text-sm text-gray-400'>DESTINATION</h3>
              <p className='text-base font-medium'>{props.ride?.destination}</p>
            </div>
          </div>
          <div className='flex items-center gap-5 p-3'>
            <i className="ri-currency-line text-yellow-500"></i>
            <div>
              <h3 className='text-lg font-medium'>₹{props.ride?.fare} </h3>
              <p className='text-sm -mt-1 text-gray-600'>Cash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WaitingForDriver