import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import { ChatFriendNav, ChatFriends, FriendClickedAtom, FriendMessages } from '../../model/atoms/ChatFriends'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import BanModal from '../Modals/BanModal';
import Service from '../../controller/services';
import { error_alert } from './Alerts';
import { ChannelClickedAtom } from '../../model/atoms/ChannelsAtom';
import { UserId } from '../../model/atoms/ProfileData';
import { Link } from 'react-router-dom';


type FriendCardPorps =
    {
        data: {
            nickName: string
            picture: string
            bio: string
            id: number
            active: string
            roomId: number
        }
    }
function FriendCard({ data }: FriendCardPorps) {

    let BgColour = "";
    switch (data.active) {
        case "on":
            BgColour = "bg-green-500";
            break;
        case "in":
            BgColour = " bg-orange-500";
            break;
        default:
            BgColour = "bg-red-500"

    }
    const [activeNavFriend, setActiveNavFriend] = useRecoilState(ChatFriendNav)
    const [chat, setChat] = useRecoilState(FriendMessages)
    const [isChannelClicked, setChannelClicked] = useRecoilState(FriendClickedAtom)
    const [userId, setUserId] = useRecoilState(UserId)

    const getMessages = (id: number) => {
        Service.getFriendMessages(id).then((res: any) => {
            setChat(res.data)
        }).catch(() => {
            error_alert()
        })
    }

    return (
        <div onClick={() => {
            setActiveNavFriend(data);
            getMessages(data.roomId)
            setChannelClicked(true)
            setUserId(data.id)
        }} className={`flex items-center space-x-4 py-7 ${activeNavFriend.id === data.id && "bg-login-gradient"}  hover:bg-login-gradient px-4 rounded-lg cursor-pointer`}>
            <div className="avatar relative mb-3">
                <div className="mask mask-squircle w-12 h-12  ">
                    <img src={data.picture} alt="Avatar Tailwind CSS Component" />
                </div>
                <div className={` h-2 w-2 ${BgColour} absolute bottom-1  right-1 ring-white ring-4 rounded-full`}></div>
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                    {data.nickName}
                </p>
                <p className="text-sm  truncate">
                    {data.bio}
                </p>
            </div>
            {/* Block Modal*/}
            <div className="dropdown dropdown-left   ">
                <div tabIndex={0} className=""><EllipsisVerticalIcon className='header-icon ' /></div>
                <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-[#242424] rounded-box w-26 sm:w-52">
                    <li><label htmlFor="my-modal-3" className="btn mb-1 w-full">Block</label></li>
                    <li> <label htmlFor="my-modal-4" className="btn mb-1">View Profile</label></li>
                    {data.active == "on" ? <li> <Link to={"/inviter"} className="btn mb-1">Play</Link></li> : ""}
                    {data.active == "in" ? <li> <Link to={"/live-games"} className="btn mb-1">Watch Game</Link></li> : ""}
                </ul>
            </div>
        </div>
    )
}

export default FriendCard