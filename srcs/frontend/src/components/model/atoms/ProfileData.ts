import { atom } from "recoil";

export const ProfileData = atom({
    key: "ProfileData",
    default: {
        firstName: "",
        lastName: "",
        id: 0,
        picture: "",
        nickName: "",
        username: "",
        bio: "",
        isTwoFacAuthEnabled: false,
        isTwoFacAuthVerified: false,
        game: {
            stats: {
                games: 0,
                loses: 0,
                wins: 0
            },
            gameHistory: [
                {
                opponentStatus: "",
                opponentImgUrl: "",
                opponentNickname: "",
                result: "",
                score: "",
                time: "",
                userId: 0,
                gameMode: "",
            }
        ]


        }


    }
})

export const UserId = atom({
    key: "UserId",
    default: -1
})

