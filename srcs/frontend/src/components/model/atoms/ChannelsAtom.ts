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
    {
        isMuted: false,
        duration: "false",
        allMessages: [{
            senderId: 0,
            senderImage: "",
            nickName: "",
            text: "",
            side: ""

        }]
    }
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




