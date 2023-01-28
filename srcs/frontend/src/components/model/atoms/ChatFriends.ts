import { atom } from "recoil";

export const ChatFriends = atom({
    key: "ChatFriends",
    default: [{
        id: 0,
        picture: "",
        active: "",
        nickName: "",
        bio: "",

    }]
})

export const ChatFriendNav = atom({
    key: "ChatFriendNav",
    default: {
        id: 0,
        picture: "",
        active: "",
        nickName: "",
        bio: "",

    }
})
export const ChatLog = atom({
    key: "ChatLog",
    default: {}
})
