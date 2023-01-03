import React from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { ChatFriends } from '../../model/atoms/ChatFriends';
import ConversationChatBubble from './ConversationChatBubble';


function Conversation() {
  const [activeNavItem, setActiveNavItem] = useRecoilState(ChatFriends)


  return (
    <div className="col-span-4  max-h-[800px] w-full sm:px-12 px-1 bg-[#242424] py-4">
      <div className="flex items-center h-full flex-col justify-between relative mb-2 space-y-5">
        <div className='w-full  overflow-auto  scrollbar-hide flex  flex-col'>
          {activeNavItem.chatlog.length ? activeNavItem.chatlog.map((item) => (
            <ConversationChatBubble key={item.message_id} data={item} />
          )) : <div className="text-2xl flex items-center justify-center font-extrabold w-full h-[500px]">
            <span className="bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500">
              No Message
            </span>
          </div>
          }

        </div>
        <div className=' w-full  bottom-0 rounded-lg'>
          <div className="flex w-full justify-center">
            <div className="mb-3 max-w-6xl  w-full relative">
              <div className='right-0 -top-1 rounded-full absolute h-14 w-14 bg-login-gradient flex items-center justify-center '>
                <PaperAirplaneIcon className='header-icon text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' />
              </div>
              <input type="text" placeholder="Type here" className="input input-bordered text-gray-700 rounded-full input-primary w-full " />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default Conversation