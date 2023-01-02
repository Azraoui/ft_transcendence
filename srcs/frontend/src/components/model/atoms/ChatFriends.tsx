import { atom } from "recoil";

export const ChatFriends = atom({
    key:"ChatFriends",
    default:{
        id:2,
        name:""
    }
})

export const ChatLog = atom({
    key:"ChatLog",
    default:{}
})
