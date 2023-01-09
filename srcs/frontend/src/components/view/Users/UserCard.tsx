import { type } from 'os'
import React, { useState } from 'react'

import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import FriendProfileModal from '../Modals/FriendProfileModal'

 type UserCardProps =
  {
    data: {
      firstName: string
      bio: string
      id: number
      lastName: string
      nickName: string,
      username:string,
      picture: string
      active: string
    }
  }


function UserCard({ data }: UserCardProps) {
  const [isFriend, setIsFriend] = useState(false);
  const AddFriend = () =>
  {
    Service.addFriend(data.id).then(()=>
    {
        setIsFriend(true)
    }).catch((e:Error)=>
    {
        console.log(e);
    })
  }
  const viewFriend = `http://localhost:5173/profile/${data.id}`

  return (

    <div className="w-full max-w-sm h-72 bg-[#242424] border border-gray-200 mb-10 rounded-lg shadow-md">
    {/** Friend Modal*/}
    <FriendProfileModal id={data.id}/>
      <div className="flex flex-col items-center py-4">
        <img className="lg:w-24 lg:h-24 w-16 h-16 mb-3 rounded-full shadow-lg" src={data.picture} alt="Bonnie image" />
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