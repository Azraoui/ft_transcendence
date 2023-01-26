import React from 'react'

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


  return (
   
      <div className={`chat ${data.side === "left" ? "chat-end"  : "chat-start" }`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src={data.senderImage} />
          </div>
        </div>
        <div className="chat-header text-white">
         {data.nickName}
        </div>
        <div className={`chat-bubble ${data.side === "left" ? "chat-bubble-info" : "chat-bubble-accent"}`}>{data.text}</div>
    </div>
   
  )
}

export default ConversationChannelBubble