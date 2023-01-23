import React from 'react'
import { useRecoilState } from 'recoil'
import { ChannelAtom } from '../../model/atoms/ChannelsAtom';
import ChannelConversation from './ChannelConversation';

import ChannelList from './ChannelList'
import Conversation from './Conversation'

function Channel() {
  const [channel, setChannel] = useRecoilState(ChannelAtom)

  return (
    <div className='h-full w-full ring-2 ring-gray-600 mx  mx-6 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <ChannelList  />
      {
        channel[0]?.id !== -1 ?
        
        channel.length ? 
        <ChannelConversation />
        :
        <div className='flex items-center  justify-center w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>No channel found </div>
        :
        <div className='flex items-center  justify-center w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>Click to join a channel</div>

      }
     


    </div>
  )
}

export default Channel