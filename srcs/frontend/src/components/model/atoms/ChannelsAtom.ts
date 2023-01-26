import { atom } from "recoil";

export const ChannelAtom = atom({
    key: "ChannelAtom",
    default: [{
        images: [""],
        id: -1,
        name: "",
        type: "",
    }]
})

export const ChannelNavAtom = atom({
    key: "ChannelNavAtom",
    default: {
        images: [""],
        id: -1,
        name: "",
        type: "",
    }
})
export const ChannelClickedAtom = atom({
    key: "ChannelClickedAtom",
    default: false
})
export const ChannelMemberData = atom({
    key: "ChannelMemberData",
    default: {
        memberId: -1,
        roomId: -1,
        role: "",
        isMuted: false,
        nickName: ""
    }
})

export const ChannelMessage = atom({
    key: "ChannelMessage",
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

export const IsJoined = atom({
    key: "IsJoined",
    default: true
})

export const ChannelsMember = atom({
    key: "ChannelsMember",
    default: {
        userRole: "",
        members: [{
            id: 1,
            nickName: "",
            pictureLink: "",
            role: "",
            isMuted: false

        }]
    }



})




