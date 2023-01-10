import React, { useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import { ChatFriends, ChatLog } from '../../model/atoms/ChatFriends'
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import BanModal from '../Modals/BanModal';


type ChannelCardPorps =
    {
        data: {
            name: string
            picture: string
            bio: string
            id: number
            active: string
            type: string
            pass?: string
            chatlog: {
                text: string,
                side: string
                message_id: number
                timestamp: string
            }[]
            participants: {
                id: number,
                name: string,
                picture: string
                bio: string
                active: string
            }[]


        }
    }
function ChannelCard({ data }: ChannelCardPorps) {


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
    const [activeNacItem, setActiveNavItem] = useRecoilState(ChatFriends)
    const [chat, setChat] = useRecoilState(ChatLog)

    return (
        <div onClick={() => {
            setActiveNavItem({...activeNacItem, ...data});
            setChat(data.chatlog);
        }} className={`flex items-center space-x-4 py-7 ${activeNacItem.id === data.id && "bg-login-gradient"}  hover:bg-login-gradient px-4 rounded-lg cursor-pointer`}>
            <div className="flex-1 min-w-0">
                <p className="text-xl font-bold ">
                    {data.name}
                </p>
                <div className="mt-2  p-4 flex -space-x-2 overflow-hidden">
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                    <img className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src="https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
            </div>
            {/* Ban Modal*/}
            <div className="dropdown dropdown-left ">
                {/* invisible hover:visible */}
                <div tabIndex={0} className=""><EllipsisVerticalIcon className='header-icon' /></div>
                <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-[#242424] rounded-box w-26 sm:w-52">
                    <li><label htmlFor="my-modal" className="btn  w-full">Join</label></li>
                    <li><a className="btn my-1 w-full text-sm ">View Participants</a></li>
                </ul>
            </div>
            {/* <div className="inline-flex items-center text-base font-semibold">
                <div className='w-6 bg-red-600 rounded-lg text-center font-bold'>1</div>
            </div> */}
        </div>
    )
}

export default ChannelCard