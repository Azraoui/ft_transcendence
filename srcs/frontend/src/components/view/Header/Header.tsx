import React from 'react'
import { BellIcon } from '@heroicons/react/24/outline';
import logo from "../../../assets/PingPong.png"
import avtar from '../../../assets/avatar.jpeg'



function Header() {
  return (
    <div className='bg-[#242424] w-full py-2  max-h-24 items-center justify-between flex px-12  '>
       
      {/*Logo*/}
      <div className='w-full flex  space-x-4 items-center lg:justify-start py-2'> 
        <div className='sm:w-14 sm:h-14  w-6 h-6 flex items-center'>
            <img src={logo} alt="" />
        </div>
        {/* <CpuChipIcon className='w-6 h-6'></CpuChipIcon> */}
        <h1 className='sm:text-2xl  font-bold text-gradient-1'  >PongGame</h1>
      </div>
      {/*Icons*/}
      <div className='w-full flex  space-x-4 items-center justify-end py-2'>

        {/* header-icon is a custom class*/}
        <BellIcon  className='header-icon'></BellIcon> 
        <div className=' cursor-pointer'>
        <img src={avtar} alt="avatar"  className='h-9 rounded-full '/>
      </div>
        {/* <UserCircleIcon  className='header-icon'></UserCircleIcon> */}
      </div>
    </div>
  )
}

export default Header