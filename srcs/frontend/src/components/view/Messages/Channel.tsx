import React from 'react'
import { useRecoilState } from 'recoil'
import { ChannelAtom, ChannelClickedAtom } from '../../model/atoms/ChannelsAtom';
import ChannelConversation from './ChannelConversation';

import ChannelList from './ChannelList'
import Conversation from './Conversation'

function Channel() {
  const [channel, setChannel] = useRecoilState(ChannelAtom)
  const [isChannelClicked, setChannelClicked] = useRecoilState(ChannelClickedAtom)


  return (
    <div className='h-full w-full ring-2 ring-gray-600 mx  mx-6 ring-offset-1 grid grid-cols-1 xl:grid-cols-5'>
      
      <ChannelList  />
      {
       isChannelClicked ?
        
        channel.length ? 
        <ChannelConversation />
        :
        <div className='col-span-4 flex items-center  justify-center w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>No channel found </div>
        :
        <div className='col-span-4 flex items-center  justify-center  w-full bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500 text-xl font-extrabold'>Click to join a channel</div>

      }
     


    </div>
  )
}

export default Channel