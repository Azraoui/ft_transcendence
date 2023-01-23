import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import { ChatFriends, ChatLog } from '../../model/atoms/ChatFriends'
import { EllipsisVerticalIcon, LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline';
import BanModal from '../Modals/BanModal';
import { ChannelClickedAtom, ChannelMessage, ChannelNavAtom, IsJoined } from '../../model/atoms/ChannelsAtom';
import Service from '../../controller/services';
import { error_alert, success_alert } from './Alerts';
import ProtectedChannelModal from '../Modals/ProtectedChannelModal';

type ChannelCardPorps =
    {
        data: {
            images: string[],
            name: string
            id: number
            type: string
        }
    }
function ChannelCard({ data }: ChannelCardPorps) {
    const [channelMessage, setChannelMessage] = useRecoilState(ChannelMessage)
    const [channel, setChannel] = useRecoilState(ChannelNavAtom)
    const [isChannelClicked, setChannelClicked] = useRecoilState(ChannelClickedAtom)
    const [isJoined, setisJoined] = useRecoilState(IsJoined)

    const getMessages = (id: number) => {
        Service.getChannelMessages(id).then((res: any) => {
            console.log(res.data);
            setChannelMessage(res.data)
            setisJoined(true);
        }).catch(() => {
            setisJoined(false);
        })
    }
    const JoinChannel = (param: { roomId: number, type: string, password: string }) => {
        Service.joinChannel(param.roomId, param.type, param.password).then((res: any) => {
            success_alert("You Joined this channel successfully");
            setisJoined(true);
        }).catch(() => {
            error_alert();
            setisJoined(false);
        })
    }
    const LeaveChannel = (id: number) => {
        Service.leaveChannel(id).then((res: any) => {
            success_alert("You left this channel successfully");
            setisJoined(true);
        }).catch(() => {
            error_alert();
            setisJoined(false);
        })
    }

    return (
        <div onClick={() => {
            setChannel({ ...channel, ...data });
            getMessages(data.id)
            setChannelClicked(true)
            // setChat(data.messages);
        }} className={`flex items-center space-x-4 py-7 ${channel.id === data.id && "bg-login-gradient"}  hover:bg-login-gradient px-4 rounded-lg cursor-pointer`}>
            <div className="flex-1 min-w-0">
                <div className='flex w-full items-center justify-start space-x-3'>
                    <p className="text-xl font-bold ">
                        {data.name}
                    </p>
                    <span>{data.type === 'public' ? <LockOpenIcon className='w-4 h-4' /> : <LockClosedIcon className='w-4 h-4' />}</span>
                </div>
                <div className="mt-2  p-4 flex -space-x-2 overflow-hidden">
                    {data.images.map((src) => (
                        <img key={src} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={src} alt="member image" />
                    ))}
                </div>
            </div>
            {/* Protect Channel Modal*/}

            <div className="dropdown dropdown-left z-40">
                {/* invisible hover:visible */}
                <div tabIndex={0} className=""><EllipsisVerticalIcon className='header-icon' /></div>
                <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-[#242424] rounded-box w-26 sm:w-52">
                    <li> {isJoined ? <div onClick={() => LeaveChannel(data.id)} className="btn  w-full">Leave</div>
                        :
                        data.type === "public" ?
                            <div onClick={() => {
                                const param = { roomId: data.id, type: data.type, password: "" }; JoinChannel(param)
                            }} className="btn w-full">Join
                            </div> :
                            <label htmlFor="my-modal-5" className="btn">Join</label>
                    }
                    </li>
                    <li> {isJoined ? <label htmlFor="my-modal-6" className={`btn my-1`}>View Members</label> : ""}</li>
                </ul>
            </div>
            {/* <div className="inline-flex items-center text-base font-semibold">
                <div className='w-6 bg-red-600 rounded-lg text-center font-bold'>1</div>
            </div> */}
        </div>
    )
}

export default ChannelCard