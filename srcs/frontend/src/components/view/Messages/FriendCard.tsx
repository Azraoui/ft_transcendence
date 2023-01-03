import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import { ChatFriends, ChatLog } from '../../model/atoms/ChatFriends'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import BanModal from '../Modals/BanModal';


type FriendCardPorps =
    {
        data: {
            name: string
            picture: string
            bio: string
            id: number
            active: string
            chatlog: {
                text: string,
                side: string
                message_id: number
                timestamp: string
            }[]


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
    const [activeNavItem, setActiveNavItem] = useRecoilState(ChatFriends)
    const [chat, setChat] = useRecoilState(ChatLog)
    useEffect(()=>
    {

    }, [activeNavItem])

    return (
        <div onClick={() => {
            setActiveNavItem({...activeNavItem, ...data} );
            setChat(data.chatlog);
        }} className={`flex items-center space-x-4 py-7 ${activeNavItem.id === data.id && "bg-login-gradient"}  hover:bg-login-gradient px-4 rounded-lg cursor-pointer`}>

            <div className="flex-shrink-0 relative ">
                <div className={` h-2 w-2 ${BgColour} absolute top-2  right-0 ring-white ring-4 rounded-full`}></div>
                <img src={data.picture} alt="avatar" className=' h-12 rounded-full ring-2 ring-offset-2  shadow-lg shadow-gray-700' />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium ">
                    {data.name}
                </p>
                <p className="text-sm  truncate">
                    {data.bio}
                </p>
            </div>
            {/* Block Modal*/}
            <div className="dropdown dropdown-left  ">
                <div tabIndex={0} className=""><EllipsisVerticalIcon className='header-icon '/></div>
                <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-[#242424] rounded-box w-26 sm:w-52">
                    <li><label htmlFor="my-modal-3" className="btn  w-full">Block</label></li>
                    <li><a className="btn my-1 w-full text-sm ">View Profile</a></li>
                </ul>
            </div>
        </div>
    )
}

export default FriendCard