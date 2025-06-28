import React, { useState } from 'react'
import {Link} from 'react-router-dom'


const ConfirmRidePopUp = (props) => { 

    const [otp , setOtp] = useState('')
    
    const submitHandler = (e) => {
        e.preventDefault(); 
    }

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
    
    <div className='mt-6 w-full'>
    <form onSubmit={(e)=>{
        submitHandler(e);

    }           
}>
    <input value ={otp} onChange={(e)=>setOtp(e.target.value)} type='text' placeholder='Enter OTP' className='bg-[#eee] px-6 py-4 font-mono text-lg rounded-lg w-full mt-5' required />
        <Link to ='/captain-riding' className='w-full text-lg mt-5 flex justify-center bg-green-400 text-white font-semibold p-3 rounded-lg'>Confirm </Link>
    <button onClick={()=>{
        props.setConfirmRidePopupPanel(false);
        props.setRidePopupPanel(false);
    }} className='w-full bg-red-500 text-white text-lg font-semibold p-3 rounded-lg mt-3'>Cancel </button>
    </form>
    </div>
    </div>  
        </div> 
    )}

export default ConfirmRidePopUp