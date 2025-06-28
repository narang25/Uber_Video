import React from 'react';
import {Link} from 'react-router-dom'

const FinishRide = (props) => {
    return (
        <div>
        <h5
  className="p-1 text-center w-[93%] absolute top-0"
  onClick={() => {
    props.setFinishRidePanel(false);
  }}
>
  <i className="text-3xl text-gray-400 ri-arrow-down-wide-fill"></i>
</h5>

    <h3 className='text-2xl font-semibold mb-5'>Finish This Ride</h3>
    <div className='flex items-center justify-between border border-2 border-yellow-500 p-4 rounded-lg mt-4'>
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
    
    <div className='mt-10 w-full'>
    
        <Link to ='/captain-home' className='w-full mt-5 flex justify-center bg-green-400 text-white text-lg font-semibold p-3 rounded-lg'>Finish Ride </Link>
    
    
    </div>
    </div>  
        </div> 
    )
}

export default FinishRide; 