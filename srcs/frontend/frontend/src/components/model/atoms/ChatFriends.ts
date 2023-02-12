import { atom } from "recoil";

export const ChatFriends = atom({
    key: "ChatFriends",
    default: [{
        id: 0,
        picture: "",
        active: "",
        nickName: "",
        bio: "",
        roomId:0

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
        roomId:0

    }
})
export const FriendMessages = atom({
    key: "FriendMessages",
    default:
        [
            {
            senderId: 0,
            senderImage: "",
            nickName: "",
            text: "",
            side: "",
            messageId: 0

        }
    ]
})

export const FriendClickedAtom = atom({
    key: "FriendClickedAtom",
    default: false
})
export const Inviter = atom({
    key: "Inviter",
    default: ""
})

