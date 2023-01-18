import { atom } from "recoil";

export const ChannelAtom = atom({
    key:"ChannelAtom",
    default:[{
        images: [""],
        id:-1,
        name:"",
        type: "",
    }]
})

export const ChannelNavAtom = atom({
    key:"ChannelNavAtom",
    default:{
        images: [""],
        id:-1,
        name:"",
        type: "",
    }
})

export const ChannelMessage = atom({
    key:"ChannelMessage",
    default:[{
        senderId: 0,
        senderImage: "",
        nickName: "",
        text: "",
        side: ""

    }]
})

export const IsJoined = atom({
    key:"IsJoined",
    default:true
})

export const ChannelsMember = atom({
    key:"ChannelsMember",
    default:{
        userRole: "",
        members: [{
            id: 1,
            nickName: "",
            pictureLink: "",
            role: ""
        }]
    }



})




