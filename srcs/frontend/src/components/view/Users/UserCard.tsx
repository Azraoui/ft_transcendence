import { type } from 'os'
import React, { useState } from 'react'
import { ToastContainer } from 'react-toastify'

import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import FriendProfileModal from '../Modals/FriendProfileModal'
import { success_alert } from '../Utils/Alerts'

type UserCardProps =
  {
    data: {
      firstName: string
      bio: string
      id: number
      lastName: string
      nickName: string,
      username: string,
      picture: string
      active: string
    }
  }


function UserCard({ data }: UserCardProps) {
  const [isFriend, setIsFriend] = useState(false);
  const AddFriend = () => {
    Service.addFriend(data.id).then(() => {
      success_alert(`${data.firstName} ${data.lastName} is now your friend`)
      setIsFriend(true)
    }).catch((e: Error) => {
      console.log(e);
    })
  }
  const viewFriend = `http://10.11.6.11:5173/profile/${data.id}`

  return (

    <div className="w-full max-w-sm h-72 bg-[#242424] border border-gray-200 mb-10 rounded-lg shadow-md">
       {/** ToastContainer required for the notification to be shown*/}
       <ToastContainer />
      {/** Friend Modal*/}
      <FriendProfileModal id={data.id} />
      <div className="flex flex-col items-center py-4">
        <div className="avatar relative mb-3">
          <div className="mask mask-squircle w-12 h-12 sm:w-24 sm:h-24 ">
            <img src={data.picture} alt="Avatar Tailwind CSS Component" />
          </div>
          <div className={` h-2 w-2 bg-red-500 absolute bottom-1  right-1 ring-white ring-4 rounded-full`}></div>
        </div>
        <h5 className="mb-1 lg:text-xl text-sm text-center font-medium ">{data.firstName} {data.lastName}</h5>
        <span className="mb-1 lg:text-lg  text-xs text-center font-extralight ">{data.nickName}</span>
        <span className="mb-1 lg:text-lg  text-xs text-center font-extralight ">{data.bio}</span>
        <div className="flex flex-col lg:flex-row mt-4  lg:space-x-2">
          <button onClick={AddFriend} disabled={isFriend} className={`btn disabled:text-white mb-1`}>Add friend</button>
          <label htmlFor="my-modal-4" className="btn ">View Profile</label>
        </div>
      </div>
    </div>

  )
}

export default UserCard