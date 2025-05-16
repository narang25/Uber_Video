import React, { useState } from 'react';
import{ Link } from 'react-router-dom';


const UserLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userData, setUserData] = useState({});


    const submitHandler = (e) => {
        e.preventDefault();
        setUserData({
            email: email,
            password: password
        })
        
        setEmail('');
        setPassword('');

    }
return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
        />
    <form onSubmit = {(e)=> {submitHandler(e)} } >
    <h3 className='text-lg mb-2 font-medium'>What's your email</h3>
    <input
    type="email" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    placeholder="email@example.com" 
    required />

    <h3 className='text-lg font-medium mb-2'>Enter password</h3>

    <input 
    type="password" 
    placeholder="password"
    className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required />
    <button 
    className='mt-4 bg-[#111] text-white rounded px-4 py-2 font-semibold mb-3 w-full text-lg placeholder:text-base'
    >Login</button>

    <p className='text-center'>New here? <Link to ='/signup' className='text-blue-600'>Create new Account</Link></p>
    
    </form>
        </div>
        <div>
            <Link to = '/captainlogin'
            className='mt-4 flex items-center justify-center bg-[#10b461] text-white rounded px-4 py-2 font-semibold mb-5 w-full text-lg placeholder:text-base'
            >Sign in as Captain</Link>
        </div>
    </div>
);
}
export default UserLogin;
