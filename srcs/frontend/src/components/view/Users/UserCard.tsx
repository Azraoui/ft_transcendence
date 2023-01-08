import { type } from 'os'
import React from 'react'

import avtar from '../../../assets/avatar.jpeg'

 type UserCardProps =
  {
    data: {
      firstName: string
      id: number
      lastName: string
      nickName: string,
      username:string,
      picture: string
      active: string
    }
  }


function UserCard({ data }: UserCardProps) {
  return (


    <div className="w-full max-w-sm h-72 bg-[#242424] border border-gray-200 mb-10 rounded-lg shadow-md">

      <div className="flex flex-col items-center py-4">
        <img className="lg:w-24 lg:h-24 w-16 h-16 mb-3 rounded-full shadow-lg" src={data.picture} alt="Bonnie image" />
        <h5 className="mb-1 lg:text-xl text-sm text-center font-medium ">{data.firstName} {data.lastName}</h5>
        <span className="text-sm ">{data.nickName}</span>
        <div className="flex flex-col lg:flex-row mt-4  lg:space-x-2">
          <a href="#" className="btn mb-1">Add friend</a>
          <a href="#" className="btn ">View Profile</a>
        </div>
      </div>
    </div>

  )
}

export default UserCard