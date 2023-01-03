import React from 'react'

type Props = 
{
  data :
  {
    text: string,
    timestamp:string,
    side: string,
    message_id: number
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