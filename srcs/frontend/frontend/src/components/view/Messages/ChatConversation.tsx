import React, { useEffect, useState } from 'react'

import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { ChatFriendNav, ChatFriends, FriendClickedAtom, FriendMessages } from '../../model/atoms/ChatFriends';
import ConversationChatBubble from './ConversationChatBubble';
import { chatSocket } from '../../controller/socket';
import { ProfileData } from '../../model/atoms/ProfileData';
import { new_message_alert, success_alert } from '../Utils/Alerts';
import ScrollToBottom from 'react-scroll-to-bottom';
import ConversationChannelBubble from './ConversationChannelBubble';


function Conversation() {
  const [activeNavFriend, setActiveNavFriend] = useRecoilState(ChatFriendNav)
  const [chat, setChat] = useRecoilState(FriendMessages)
  const [profileData, setprofileData] = useRecoilState(ProfileData);

  const [currentMessage, setCurrentMessage] = useState("");
  const [sendClicked, setSendClicked] = useState(false);



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
  const SendMessage = async (e: any) => {
    e.preventDefault()
    if (currentMessage !== "" && sendClicked) {
      console.log(activeNavFriend.id);
      
      const messageData = {
        roomId: activeNavFriend.roomId,
        text: currentMessage
      };
      await chatSocket.emit("msgToServer", messageData);
      setSendClicked(false)
 
      setCurrentMessage("");
    }
  }

  useEffect(() => {
    setMessageList(chat)
  }, [chat,chatSocket])

  useEffect(()=>
  {
    chatSocket.on("msgToClients", (data) => {
      console.log("data = ",data);
      if (data.type == "DM")
      { 
        setMessageList((list => [...list, data] ));
        setChat((list => [...list, data] ));
        
        // if  (data.senderId !== profileData.id)
        // new_message_alert("new message from " + data.nickName)
        // success_alert("new message from " + data.nickName)
      }
    });
    // return () => {chatSocket.off("msgToClients")};
  },[chatSocket])

  const getMessage = (e: any) => {
    const val = e.target.value;
    setCurrentMessage(val)
  }

  return (
    <div className="col-span-4  max-h-[800px] w-full sm:px-12 px-1 bg-[#242424] py-4">
      <div className="flex items-center h-full flex-col justify-between relative mb-2 space-y-5">
        <ScrollToBottom className='w-full  overflow-auto  scrollbar-hide flex  flex-col'>
          {messageList.length ?
            messageList.map((item) => (
              <ConversationChannelBubble key={item.messageId} data={item} />
            )) 
            : 
            <div className="text-2xl flex items-center justify-center font-extrabold w-full h-[500px]">
              <span className="bg-clip-text text-transparent bg-gradient-to-r  from-pink-500 to-violet-500">
                No Message
              </span>
            </div>
          }
        </ScrollToBottom>
        <div className=' w-full  bottom-0 rounded-lg'>
          <div className="flex w-full justify-center">
            <div className="mb-3 max-w-6xl  w-full relative">
            <form onSubmit={SendMessage}>

              <button type='submit' onClick={()  =>  setSendClicked(true)}  className='right-0 -top-1 rounded-full absolute h-14 w-14 bg-login-gradient flex items-center justify-center '>
                <PaperAirplaneIcon className='header-icon text-center transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110' />
              </button>
              <input type="text" required value={currentMessage} onChange={ getMessage} placeholder="Type here" className="input input-bordered text-pink-500  rounded-full input-primary w-full " />
            </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Conversation