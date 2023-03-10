import React, { useEffect, useRef, useState } from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { ChatFriends } from '../../model/atoms/ChatFriends';
import ConversationChatBubble from './ConversationChatBubble';
import { ChannelMemberData, ChannelMessage, ChannelNavAtom, IsJoined } from '../../model/atoms/ChannelsAtom';
import ConversationChannelBubble from './ConversationChannelBubble';
import { chatSocket } from '../../controller/socket';
import Service from '../../controller/services';
import { muted_user_alert, new_message_alert, success_alert } from '../Utils/Alerts';
import { ProfileData } from '../../model/atoms/ProfileData';

import ScrollToBottom from 'react-scroll-to-bottom';



type Props =
  {
    data:
    {
      text: string,
      messageId: number,
      senderImage: string,
      nickName: string,
      senderId: number,
      side: string
    }
  }

function ChannelConversation() {
  // const [activeNavItem, setActiveNavItem] = useRecoilState(ChatFriends)
  const [channelMessage, setChannelMessage] = useRecoilState(ChannelMessage)
  const [isJoined, setisJoined] = useRecoilState(IsJoined)
  const [currentMessage, setCurrentMessage] = useState("");
  const [sendClicked, setSendClicked] = useState(false);
  const [channel, setChannel] = useRecoilState(ChannelNavAtom)
  const [profileData, setprofileData] = useRecoilState(ProfileData);

  const [messageList, setMessageList] = useState([
    {
      text: "",
      messageId: 0,
      senderImage: "",
      nickName: "",
      senderId: 0,
      side: ""
    },
  ]);


  const SendMessage =  (e: any) => {
    e.preventDefault()
    if (currentMessage !== "" && sendClicked) {
      const messageData = {
        roomId: channel.id,
        text: currentMessage
      };
      chatSocket.emit("msgToServer", messageData);
      setSendClicked(false)

      setCurrentMessage("");
    }
  }


  useEffect(() => {
    setMessageList(channelMessage)
  }, [channelMessage])

  // useEffect(() => {
  //   chatSocket.on("muteNotification", (data) => {
  //     muted_user_alert("You're  muted till " + data.duration)
  //   });
  //   return () => {chatSocket.off("muteNotification")};

  // }, [chatSocket])

  useEffect(() => {
    chatSocket.on("msgToClients", (data) => {
      if (data.type == "CH")  // channel
       {
        if (data.roomId === channel.id)
        {
          setMessageList((list => [...list, data]));

        }
        // setChannelMessage((list => [...list, data]));
        // new_message_alert("new channel message from " + data.nickName)

      }
    });

    return () => {chatSocket.off("msgToClients")};

  })

  const getMessage = (e: any) => {
    const val = e.target.value;
    setCurrentMessage(val)
  }




  return (
    <div className="col-span-4  max-h-[800px] w-full sm:px-12 px-1 bg-[#242424] py-4">
      <div className="flex items-center h-full flex-col justify-between relative mb-2 space-y-5">
        <ScrollToBottom className='w-full  overflow-auto  scrollbar-hide flex  flex-col'>
          {
            isJoined ?
              messageList.length ?
                messageList.map((item) => (
                  <ConversationChannelBubble key={item.messageId} data={item} />
                ))
                :
                <div className="text-2xl flex items-center justify-center font-extrabold w-full h-[500px]">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500">
                    No Message
                  </span>
                </div>
              :
              <div className="text-2xl flex items-center justify-center font-extrabold w-full h-[500px]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500">
                  Join this Channel To view it's messages
                </span>
              </div>
          }
        </ScrollToBottom>
        {
          isJoined ?
            // !channelMessage.isMuted ?
            <div className=' w-full  bottom-0 rounded-lg'>
              <div className="flex w-full justify-center">
                <div className="mb-3 max-w-6xl  w-full relative">
                  <form onSubmit={SendMessage}>
                    <button type='submit' onClick={() => setSendClicked(true)}
                      className='right-0 -top-1 rounded-full absolute h-14 w-14 bg-login-gradient flex items-center justify-center '>
                      <PaperAirplaneIcon className='header-icon text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' />
                    </button>
                    <input required type="text" placeholder="Type here" value={currentMessage} onChange={getMessage} className="input input-bordered text-pink-500 rounded-full input-primary w-full " />
                  </form>
                </div>
              </div>
            </div>
            // :
            // <span className=" font-bold text-md">
            //   you'll be muted till :   <span className=' bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500'> {channelMessage.duration}</span>
            // </span>
            :
            ""
        }
      </div>
    </div>
  )
}

export default ChannelConversation