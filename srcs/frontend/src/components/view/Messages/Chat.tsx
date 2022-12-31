import React, { useState } from 'react'
import Conversation  from './Conversation'
import FriendList from './FriendList'

function Chat() {
// const [message, setMessage] = useState("hello");
  return (
    <div className='h-full w-full ring-2 ring-gray-600 mx  mx-6 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <FriendList  />
      <Conversation />
     


    </div>
  )
}

export default Chat