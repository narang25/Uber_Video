
import React, { useState } from 'react';
import{ Link } from 'react-router-dom';



const UserSignup = () => {
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [firstName, setFirstName] = useState('');
        const [lastName, setLastName] = useState('');
        const [userData, setUserData] = useState({});
    
        const submitHandler = (e) => {
            e.preventDefault();
            setUserData({
                fullName:{
                    firstName: firstName,
                    lastName: lastName
                },
                email: email,
                password: password
            })
            console.log(userData);
            
            setEmail('');
            setFirstName('');
            setLastName('');
            setPassword('');}
return (
    <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
            <img className='w-16 mb-10'
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/2560px-Uber_logo_2018.svg.png"
        alt="Uber Logo"
        />
    <form onSubmit = {(e)=> {submitHandler(e)} } >
    
    <h3 className='text-lg mb-2 font-medium'>What's your Name</h3>
    <div className='flex gap-4 mb-5'>
            <input
    type="text" 
    className='bg-[#eeeeee] rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
    placeholder="First Name" 
    value={firstName}
    onChange={(e) => setFirstName(e.target.value)}
    required />
        <input
    type="text" 
    className='bg-[#eeeeee]  rounded px-4 py-2 border w-1/2 text-lg placeholder:text-base'
    placeholder="Last Name" 
    value={lastName}
    onChange={(e) => setLastName(e.target.value)}
    required />
    </div>
    <h3 className='text-lg mt-5 mb-2 font-medium'>What's your email</h3>
    <input
    type="email" 
    className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base'
    placeholder="email@example.com" 
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required />

    <h3 className='text-lg font-medium mb-2'>Enter password</h3>

    <input  
    type="password" 
    placeholder="password"
    className='bg-[#eeeeee] mb-6 rounded px-4 py-2 border w-full text-lg placeholder:text-base' 
    value={password}
    onChange={(e) => setPassword(e.target.value)}    
    required />
    <button 
    className=' bg-[#111] text-white rounded px-4 py-2 font-semibold mb-3 w-full text-lg placeholder:text-lg'
    >Sign Up</button>

    <p className='text-center'>Already have a account? <Link to ='/login' className='text-blue-600'>Login here</Link></p>
    
    </form>
        </div>
    <p className='text-[10px] leading-tight'>
This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service apply</span>.
</p>

    </div>
);
}
export default UserSignup;
