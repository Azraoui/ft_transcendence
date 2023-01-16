import React from 'react'

type Props = 
{
  data :
  {
    text: string,
    senderImage:string,
    nickName: string,
    senderId: number,
    side: string
  }
}

function ConversationChatBubble({data} : Props) {
  return (
    <div className={`chat ${ data.side === "left" ? "chat-start" : "chat-end"}`}>
    <div className={`chat-bubble ${ data.side === "left" ? "chat-bubble-info" : "chat-bubble-accent"}`}>{data.text}</div>
  </div>
  )
}

export default ConversationChatBubble