import React, { useState } from 'react'
import { TabMessagesLinks } from '../../model/TabsDB';
import Channel from './Channel';
import Chat from './Chat';

function Messages() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] px-12 pt-12 pb-6 w-full scrollbar-hide flex flex-col items-start justify-start space-y-12 '>
      <div className="flex flex-col w-full space-y-16">
        <div className="flex items-start  justify-start sm:space-x-8 sm:flex-row flex-col  px-12 sm:space-y-0 space-y-3 ">
          {TabMessagesLinks.map((item) => (
            <div onClick={() => { setActiveTab(item.id) }} className={`rounded-2xl border cursor-pointer py-1 px-4 ${activeTab === item.id && "bg-tab-gradient"} hover:bg-tab-gradient`}
              key={item.id}>{item.title}</div>
          ))}
        </div>
              {
                  activeTab  === 0 ? <Chat/> : <Channel/>
              }

      </div>


    </div>
  )
}

export default Messages 