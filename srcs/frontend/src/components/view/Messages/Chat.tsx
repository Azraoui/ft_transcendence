import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import { ChatFriends, FriendClickedAtom } from '../../model/atoms/ChatFriends'
import Conversation  from './ChatConversation'
import FriendList from './FriendList'

function Chat() {
// const [message, setMessage] = useState("hello");
const [isChannelClicked, setChannelClicked] = useRecoilState(FriendClickedAtom)
const [friends, setFriends] = useRecoilState(ChatFriends)


  return (
    <div className='h-full w-full ring-2 ring-gray-600 mx  mx-6 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <FriendList  />

      {
        friends.length ? 
       isChannelClicked ?
        
       <Conversation />

        :
        <div className='col-span-4 flex items-center  justify-center  w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>Click to send message to a friend</div>
        :
        <div className='col-span-4 flex items-center  justify-center w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>No Friend found </div>

      }
     
     


    </div>
  )
}

export default Chat