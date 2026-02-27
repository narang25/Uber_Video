import React from 'react'

const LocationSearchPanel = ({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) => {

    const handleSuggestionClick = (suggestion) => {
        if (activeField === 'pickup') {
            setPickup(suggestion)
        } else if (activeField === 'destination') {
            setDestination(suggestion)
        }
    }

    return (
        <div>
            {suggestions.length === 0 && (
                <div className='flex flex-col items-center justify-center py-8 text-gray-400'>
                    <i className="ri-search-line text-3xl mb-2"></i>
                    <p className='text-sm'>Type to search for a location</p>
                </div>
            )}
            {
                suggestions.map((elem, idx) => (
                    <div key={idx} onClick={() => handleSuggestionClick(elem)} className='flex gap-4 border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-colors p-3 rounded-xl items-center my-1.5 justify-start cursor-pointer'>
                        <div className='bg-gray-100 h-10 w-10 flex items-center justify-center rounded-full flex-shrink-0'>
                            <i className="ri-map-pin-fill text-gray-600"></i>
                        </div>
                        <h4 className='font-medium text-sm text-gray-700 line-clamp-2'>{elem}</h4>
                    </div>
                ))
            }
        </div>
    )
}

export default LocationSearchPanel