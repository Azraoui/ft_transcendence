import React from 'react'
import avtar from '../../../assets/avatar.jpeg'

function ProfileImage() {
    return (
        <div className='relative '>
            <div className='sm:h-4 sm:w-4 h-2 w-2  bg-green-500 absolute top-4  sm:right-1 right-0 ring-white ring-4 rounded-full'></div>
            <img src={avtar} alt="avatar" className='sm:h-32 h-16 rounded-full ring-2 ring-offset-2  shadow-lg shadow-gray-700' />
        </div>
    )
}

export default ProfileImage