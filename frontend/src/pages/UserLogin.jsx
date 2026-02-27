import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const { user, setUser } = useContext(UserDataContext);

    const navigate = useNavigate();

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const userData = {
                email: email,
                password: password
            }

            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

            if (response.status === 200) {
                const data = response.data;
                setUser(data.user);
                localStorage.setItem('userToken', data.token);
                navigate('/home');
            }
        } catch (err) {
            setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }

        setEmail('');
        setPassword('');
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <div className='flex items-center gap-2 mb-10'>
                    <div className='w-10 h-10 bg-black rounded-lg flex items-center justify-center'>
                        <i className="ri-taxi-line text-xl text-white"></i>
                    </div>
                    <span className='text-2xl font-bold'>Uber</span>
                </div>

                <form onSubmit={(e) => { submitHandler(e) }}>
                    {error && (
                        <div className='bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg px-4 py-3 mb-4 flex items-center gap-2'>
                            <i className="ri-error-warning-line"></i>
                            {error}
                        </div>
                    )}

                    <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='bg-[#eeeeee] rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
                        placeholder="email@example.com"
                        required />

                    <h3 className='text-lg font-medium mb-2 mt-4'>Enter password</h3>

                    <input
                        type="password"
                        placeholder="password"
                        className='bg-[#eeeeee] rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                    <button
                        disabled={loading}
                        className='mt-5 bg-[#111] text-white rounded-lg px-4 py-3 font-semibold mb-3 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                    >
                        {loading ? (
                            <><i className="ri-loader-4-line animate-spin mr-2"></i>Signing in...</>
                        ) : 'Login'}
                    </button>

                    <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>

                </form>
            </div>
            <div>
                <Link to='/captainlogin'
                    className='mt-4 flex items-center justify-center bg-[#10b461] text-white rounded-lg px-4 py-3 font-semibold mb-5 w-full text-lg'
                >Sign in as Captain</Link>
            </div>
        </div>
    );
}
export default UserLogin;
