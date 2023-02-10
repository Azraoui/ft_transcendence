import React from 'react'
import { useRecoilState } from 'recoil';
import { ProfileData } from '../../model/atoms/ProfileData';

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

function ConversationChannelBubble({ data }: Props) {
  const [profileData, setprofileData] = useRecoilState(ProfileData);


  return (
   
      <div className={`chat ${data.senderId === profileData.id ? "chat-end"  : "chat-start" }`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={data.senderImage} />
          </div>
        </div>
        <div className="chat-header text-white">
         {data.nickName}
        </div>
        <div className={`chat-bubble ${data.senderId === profileData.id ? "chat-bubble-info" : "chat-bubble-accent"}`}>{data.text}</div>
    </div>
   
  )
}

export default ConversationChannelBubble