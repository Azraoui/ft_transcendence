import { atom } from "recoil";

export const Channel = atom({
    key:"Channel",
    default:{
        id:0,
        name:"",
        type: "",
    }
})

export const Message = atom({
    key:"Message",
    default:{}
})
