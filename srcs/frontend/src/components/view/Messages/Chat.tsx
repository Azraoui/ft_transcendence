import React, { useState } from 'react'
import LeftPart from './LeftPart'
import RightPart from './RightPart'

function Chat() {
// const [message, setMessage] = useState("hello");
  return (
    <div className='h-full w-full ring-2 ring-gray-600 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <RightPart  />
      <LeftPart />
     


    </div>
  )
}

export default Chat