import { atom } from "recoil";

export const ChatFriends = atom({
    key:"ChatFriends",
    default:2
})

export const ChatLog = atom({
    key:"ChatLog",
    default:{}
})
