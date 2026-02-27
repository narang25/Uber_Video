
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CaptainDataContext } from '../context/CapatainContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


const CaptainSignup = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehiclePlate, setVehiclePlate] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = React.useContext(CaptainDataContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const captainData = {
                fullname: {
                    firstname: firstName,
                    lastname: lastName
                },
                email: email,
                password: password,
                vehicle: {
                    color: vehicleColor,
                    plate: vehiclePlate,
                    capacity: vehicleCapacity,
                    vehicleType: vehicleType
                }
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)
            if (response.status === 201) {
                const data = response.data;
                setCaptain(data.captain);
                localStorage.setItem('captainToken', data.token);
                navigate('/captain-home');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }

        setEmail('');
        setFirstName('');
        setLastName('');
        setPassword('');
        setVehicleColor('')
        setVehiclePlate('')
        setVehicleCapacity('')
        setVehicleType('');
    }

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between overflow-y-auto'>
            <div>
                <div className='flex items-center gap-2 mb-6'>
                    <div className='w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center'>
                        <i className="ri-steering-2-line text-xl text-gray-900"></i>
                    </div>
                    <span className='text-2xl font-bold'>Uber Captain</span>
                </div>

                <form onSubmit={(e) => { submitHandler(e) }}>
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2'>
                            <i className="ri-error-warning-line"></i>
                            {error}
                        </div>
                    )}

                    <h3 className='text-lg mb-2 font-medium'>Captain's Name</h3>
                    <div className='flex gap-4 mb-4'>
                        <input
                            type="text"
                            className='bg-[#eeeeee] rounded-lg px-4 py-2.5 border w-1/2 text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            placeholder="First Name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required />
                        <input
                            type="text"
                            className='bg-[#eeeeee] rounded-lg px-4 py-2.5 border w-1/2 text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            placeholder="Last Name"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required />
                    </div>

                    <h3 className='text-lg mb-2 font-medium'>Email</h3>
                    <input
                        type="email"
                        className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                        placeholder="email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />

                    <h3 className='text-lg font-medium mb-2'>Password</h3>
                    <input
                        type="password"
                        placeholder="password"
                        className='bg-[#eeeeee] mb-4 rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />

                    <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
                    <div className='flex gap-4 mb-4'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            type="text"
                            placeholder='Vehicle Color'
                            value={vehicleColor}
                            onChange={(e) => { setVehicleColor(e.target.value) }}
                        />
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            type="text"
                            placeholder='Vehicle Plate'
                            value={vehiclePlate}
                            onChange={(e) => { setVehiclePlate(e.target.value) }}
                        />
                    </div>
                    <div className='flex gap-4 mb-5'>
                        <input
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            type="number"
                            placeholder='Capacity'
                            value={vehicleCapacity}
                            onChange={(e) => { setVehicleCapacity(e.target.value) }}
                        />
                        <select
                            required
                            className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-yellow-400'
                            value={vehicleType}
                            onChange={(e) => { setVehicleType(e.target.value) }}
                        >
                            <option value="" disabled>Vehicle Type</option>
                            <option value="car">Car</option>
                            <option value="auto">Auto</option>
                            <option value="moto">Moto</option>
                        </select>
                    </div>

                    <button
                        disabled={loading}
                        className='bg-[#111] text-white rounded-lg px-4 py-3 font-semibold mb-3 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                        {loading ? (
                            <><i className="ri-loader-4-line animate-spin mr-2"></i>Registering...</>
                        ) : 'Sign Up as Captain'}
                    </button>

                    <p className='text-center'>Already have an account? <Link to='/captainlogin' className='text-blue-600'>Login here</Link></p>

                </form>
            </div>
            <p className='text-[10px] text-gray-400 leading-tight mt-4 pb-4'>
                This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
            </p>
        </div>
    );
}
export default CaptainSignup;
