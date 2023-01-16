import { atom } from "recoil";

export const ChannelAtom = atom({
    key:"ChannelAtom",
    default:[{
        id:-1,
        name:"",
        type: "",
    }]
})

export const ChannelNavAtom = atom({
    key:"ChannelNavAtom",
    default:{
        id:-1,
        name:"",
        type: "",
    }
})

export const Message = atom({
    key:"Message",
    default:{}
})
