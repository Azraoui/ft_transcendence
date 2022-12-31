import React from 'react'
import ChannelList from './ChannelList'
import Conversation from './Conversation'

function Channel() {
  return (
    <div className='h-full w-full ring-2 ring-gray-600 mx  mx-6 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <ChannelList  />
      <Conversation />
     


    </div>
  )
}

export default Channel