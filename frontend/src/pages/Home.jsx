import React, { useRef, useState } from 'react'

import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';


const Home = ()=>{
    const [pickUp, setPickUp] = useState("");
    const [destination, setDestination] = useState("");
    const [panelOpen, setPanelOpen] = useState(false);
    const panelRef = useRef(null);
    const vehiclePanelRef = useRef(null);
    const vehicleFoundRef = useRef(null);
    const waitingForDriverRef = useRef(null);
    const confirmRidePanelPanelRef = useRef(null);
    const panelCloseRef = useRef(null);
    const [vehiclePanel, setVehiclePanel] = useState(false);
    const [confirmRidePanel, setConfirmRidePanel] = useState(false);
    const [vehicleFound, setVehicleFound] = useState(false);
    const [waitingForDriver, setwaitingForDriver] = useState(false);

    const submitHandler = (e) => {
        e.preventDefault();
    }


    useGSAP(() => {
  if (panelRef.current && panelCloseRef.current) {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        padding: 0
      });
    } else {
      gsap.to(panelRef.current, {
        height: '0%'
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0
      });
    }
  }
}, [panelOpen]);

    useGSAP(() => {   
  if (vehiclePanelRef.current) {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        height:'65%',
        translateY: '0%',
        opacity: 1
        });
    } else {
      gsap.to(vehiclePanelRef.current, {
        height: '0%',
        translateY: '100%',
        opacity: 0
      });
    }
  }
}
, [vehiclePanel]);

useGSAP(function(){
  if(confirmRidePanel){
    gsap.to(confirmRidePanelPanelRef.current, {
      transform:'translateY(0)'
  })}
  else{
    gsap.to(confirmRidePanelPanelRef.current, {
      transform:'translateY(100%)'
  })
  }
},[confirmRidePanel]);

useGSAP(function(){
  if(vehicleFound){
    gsap.to(vehicleFoundRef.current, {
      transform:'translateY(0)'
  })}
  else{
    gsap.to(vehicleFoundRef.current, {
      transform:'translateY(100%)'
  })
  }
},[vehicleFound]);

useGSAP(function(){
  if(waitingForDriver){
    gsap.to(waitingForDriverRef.current, {
      transform:'translateY(0)'
  })}
  else{
    gsap.to(waitingForDriverRef.current, {
      transform:'translateY(100%)'
  })
  }
},[waitingForDriver]);



    return (
        <div className='h-screen relative overflow-hidden'>
        <img className='w-20 absolute ml-7 mt-7'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
        />
        <div className="h-screen w-screen">
    < img className='h-screen w-full object-cover' src ="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className=' flex flex-col justify-end h-screen absolute top-0 w-full '> 
        <div className='h-[30%] p-6 bg-white relative'>
            <h5 ref={panelCloseRef}
            onClick={() => setPanelOpen(false)}
            className='absolute top-6 right-6 opacity-0 text-2xl'>
                <i className='ri-arrow-down-wide-line'></i>
            </h5>
            <h4 className='text-2xl font-semibold'>Find a trip</h4>
        <form onSubmit={(e)=> 
            submitHandler(e)
        }>
            <div className="line absolute h-16 w-1 top-[45%] left-10 bg-gray-700 rounded-full"></div>
            <input
            onClick={()=> setPanelOpen(true)}
            value={pickUp}
            onChange={(e)=> setPickUp(e.target.value)}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5' type="text" placeholder="Add a pick-up location"/>
            <input 
            onClick={()=> setPanelOpen(true)}
            value={destination}
            onChange={(e)=> setDestination(e.target.value)}
            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3' type="text" placeholder="Enter your destination"/>
        </form>
        </div>
<div
  ref={panelRef} className='bg-white h-0'
>
  <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel}  />
</div>
</div>
 <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-10 pt-12'>
  <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel}  />
 </div>
 <div ref={confirmRidePanelPanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-3 py-6 pt-12'>
  <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} setVehicleFound={setVehicleFound} />
 </div>
  <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
  <LookingForDriver setVehicleFound={setVehicleFound}  />
 </div>
  <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-3 py-6 pt-12'>
  <WaitingForDriver  setwaitingForDriver={setwaitingForDriver} />
 </div>



        </div>
    )
}

export default Home