import { atom } from "recoil";

export const ChatFriends = atom({
    key:"ChatFriends",
    default:{
        id:2,
        name:"",
        chatlog: [
        {
            text: "",
            timestamp: "10:05 AM",
            side: "left",
            message_id: 0
        }
    ]
    }
})

export const ChatLog = atom({
    key:"ChatLog",
    default:{}
})
