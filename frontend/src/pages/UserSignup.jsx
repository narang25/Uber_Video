import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'



const UserSignup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const navigate = useNavigate()

  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const newUser = {
        fullname: {
          firstname: firstName,
          lastname: lastName
        },
        email: email,
        password: password
      }

      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('userToken', data.token)
        navigate('/home')
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.errors?.[0]?.msg || 'Registration failed. Please try again.')
    } finally {
      setLoading(false)
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <div className='flex items-center gap-2 mb-8'>
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

            <h3 className='text-lg w-1/2 font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-5'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => { setFirstName(e.target.value) }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2.5 border text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => { setLastName(e.target.value) }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => { setEmail(e.target.value) }}
              className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
            <input
              className='bg-[#eeeeee] mb-5 rounded-lg px-4 py-2.5 border w-full text-lg placeholder:text-base focus:outline-none focus:ring-2 focus:ring-black'
              value={password}
              onChange={(e) => { setPassword(e.target.value) }}
              required type="password"
              placeholder='password'
            />

            <button
              disabled={loading}
              className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-3 w-full text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
            >
              {loading ? (
                <><i className="ri-loader-4-line animate-spin mr-2"></i>Creating account...</>
              ) : 'Create account'}
            </button>

          </form>
          <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>
        <div>
          <p className='text-[10px] text-gray-400 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup