import React from 'react'

type Props =
  {
    data:
    {
      text: string,
      senderImage: string,
      nickName: string,
      senderId: number,
      side: string
    }
  }

function ConversationChannelBubble({ data }: Props) {
  return (
   
      <div className={`chat ${data.side === "left" ? "chat-start" : "chat-end"}`}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img src="https://placeimg.com/192/192/people" />
          </div>
        </div>
        <div className="chat-header text-white">
         {data.nickName}
        </div>
        <div className={`chat-bubble ${data.side === "left" ? "chat-bubble-info" : "chat-bubble-accent"}`}>You were the Chosen One!</div>
    </div>
   
  )
}

export default ConversationChannelBubble