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

