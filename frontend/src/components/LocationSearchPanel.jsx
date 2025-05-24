import React from 'react'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = (props) => {

    const locations= [
        "24B, Near Kapoor's Cafe ,Shreyians Coding School, Bhopal",
        "22C, Near Malhotra's Cafe ,Shreyians Coding School, Bhopal",
        "20B, Near Singhal's Cafe ,Shreyians Coding School, Bhopal",
        "18A, Near Sharma's Cafe ,Shreyians Coding School, Bhopal"

    ]

    return (
        <div>
        
        {
            locations.map(function(element,idx){
                return             <div key={idx} onClick={()=>{
                    props.setVehiclePanel(true)
                    props.setPanelOpen(false)
                }} className='flex border-2 p-3 rounded-xl border-gray-50 active:border-black gap-4 items-center justify-start my-2'>
                <h2 className='bg-[#eee] h-8 w-12 flex items-center justify-center rounded-full'>
                <i className="ri-map-pin-fill text-xl"></i>
                </h2>

                <h4 className='font-medium'> {element}</h4>
            </div>
            })
        }

        </div>
    )
}       
export default LocationSearchPanel