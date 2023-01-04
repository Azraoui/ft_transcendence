import React from 'react'
import { useRecoilState } from 'recoil';
import { ProfileData } from '../../model/atoms/ProfileData';

// target='_blank'

function Login() {


  const link = "http://localhost:5000/api/auth"
  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-login-gradient'>
        <div className='flex flex-col h-96 w-96 justify-around items-center backdrop-blur-sm bg-white/30 rounded-xl px-2 py-2'>
            <h1 className='font-extrabold text-2xl text-center'>Login To Your Account</h1>
            <a  href={link} className='bg-black px-3 py-3 rounded-xl hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300'> <code>Login with 42  Account</code></a>
            <h1 className='font-extralight text-2xl text-center'>Begin Your Journey</h1>

        </div>
    </div>
  )
}

export default Login