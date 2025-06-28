import React from 'react'

const RidePopUp = (props) => {
    return (
        <div>
        <h5
  className="p-1 text-center w-[93%] absolute top-0"
  onClick={() => {
    props.setRidePopupPanel(false);
  }}
>
  <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
</h5>

    <h3 className='text-2xl font-semibold mb-5'>New Ride Available!</h3>
    <div className='flex items-center justify-between bg-yellow-300 p-3 rounded-lg mt-4'>
    <div className='flex items-center gap-3 '>
    <img className='h-10 w-10 rounded-full object-cover ' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMSmro2o-rYzLt-UZvPTAbyA4_2xIfkrq42g&s" alt='/'  />
    <h2 className='text-lg font-medium'>Harshita</h2>
    </div>
    <h5 className='text-lg font-semibold'>2.2 KM</h5>
    </div>
    <div className='flex flex-col gap-2 justify-between items-center'>
    
    <div className='w-full mt-5'>
        <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="text-lg ri-map-pin-2-fill"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                < p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Bhopal</p>
            </div>
        </div>
       <div className='flex items-center gap-5 p-3 border-b-2'>
            <i className="ri-map-pin-line"></i>
            <div>
                <h3 className='text-lg font-medium'>562/11-A</h3>
                < p className='text-sm -mt-1 text-gray-600'>Kankariya Talab,Bhopal</p>
            </div>
        </div>
        <div className='flex items-center gap-5 p-3 '>
            <i className="ri-currency-fill"></i>
            <div>
                <h3 className='text-lg font-medium'> ₹193.20</h3>
                < p className='text-sm -mt-1 text-gray-600'>Cash/Upi</p>
            </div>
        </div>
    </div>
    <div className='flex w-full mt-5 items-center justify-between'>
        <button onClick={()=>{
        props.setRidePopupPanel(false);
    }} className=' bg-gray-300 text-gray-700 font-semibold p-3 px-10 rounded-lg'>Ignore </button>
        
        <button onClick={()=>{
        props.setConfirmRidePopupPanel(true);    
        
    }} className='  bg-green-400 text-white font-semibold p-3 px-10 rounded-lg'>Accept </button>
    
    </div>
    </div>  
        </div>
    );
}

export default RidePopUp;