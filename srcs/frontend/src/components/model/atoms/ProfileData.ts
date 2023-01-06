import { atom } from "recoil";

export const ProfileData = atom({
    key: "ProfileData",
    default: {
        firstName: "",
        lastName: "",
        id: 0,
        picture: "",
        username: "",
        nickName: "",
        bio: "",
        twofactor: false
      
        
    }
})