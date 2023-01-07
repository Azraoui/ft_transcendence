import { type } from 'os'
import React from 'react'

import avtar from '../../../assets/avatar.jpeg'

type UserCardProps =
  {
    data: {
      bio: string
      firstName: string
      id: number
      lastName: string
      nickname: string
      picture: string
      twofactor: boolean
      username: string
      active: string
    }
  }


function UserCard({ data }: UserCardProps) {
  return (


    <div className="w-full max-w-[290px]  bg-[#242424] border border-gray-200 mb-10 rounded-lg shadow-md">

      <div className="flex flex-col items-center py-4">
        <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={data.picture} alt="Bonnie image" />
        <h5 className="mb-1 text-xl font-medium ">{data.firstName} {data.lastName}</h5>
        <span className="text-sm ">{data.nickname}</span>
        <div className="flex mt-4 space-x-3 md:mt-6">
          <a href="#" className="btn">Add friend</a>
          <a href="#" className="btn ">View Profile</a>
        </div>
      </div>
    </div>

  )
}

export default UserCard