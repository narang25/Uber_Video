import React from 'react'

const vehicles = [
    { key: 'car', name: 'UberGo', icon: '/car.svg', capacity: 4, eta: '2 min', desc: 'Affordable, compact rides' },
    { key: 'moto', name: 'Moto', icon: '/moto.svg', capacity: 1, eta: '3 min', desc: 'Affordable motorcycle rides' },
    { key: 'auto', name: 'UberAuto', icon: '/auto.svg', capacity: 3, eta: '3 min', desc: 'Affordable auto rides' },
]

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehiclePanel(false)
            }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
            <h3 className='text-2xl font-semibold mb-5'>Choose a Vehicle</h3>

            {vehicles.map((v) => (
                <div
                    key={v.key}
                    onClick={() => {
                        props.setConfirmRidePanel(true)
                        props.selectVehicle(v.key)
                    }}
                    className='flex border-2 active:border-black hover:bg-gray-50 transition-colors mb-2 rounded-xl w-full p-3 items-center justify-between cursor-pointer'
                >
                    <img className='h-12 w-12 object-contain' src={v.icon} alt={v.name} />
                    <div className='ml-3 flex-1'>
                        <h4 className='font-medium text-base'>
                            {v.name}
                            <span className='ml-1 text-gray-500 text-sm'>
                                <i className="ri-user-3-fill"></i>{v.capacity}
                            </span>
                        </h4>
                        <h5 className='font-medium text-sm text-green-600'>{v.eta}</h5>
                        <p className='font-normal text-xs text-gray-500'>{v.desc}</p>
                    </div>
                    <h2 className='text-lg font-bold'>₹{props.fare[v.key]}</h2>
                </div>
            ))}
        </div>
    )
}

export default VehiclePanel