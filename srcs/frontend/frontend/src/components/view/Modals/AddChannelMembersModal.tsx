import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { channel } from 'diagnostics_channel'
import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import { ChannelMemberData, ChannelNavAtom, ChannelsMember } from '../../model/atoms/ChannelsAtom'
import { ChatFriends, PrivateRoomChannel } from '../../model/atoms/ChatFriends'
import { ProfileData } from '../../model/atoms/ProfileData'
import { error_alert, success_alert } from '../Utils/Alerts'
import MuteChannelMemberModal from './MuteChannelMemberModal'

function AddChannelMembersModal() {
    const [friends, setFriends] = useRecoilState(ChatFriends)


    // useEffect(()=>
    // {
    //     Service.getFriends().then((res:any)=>
    //     {
    //         setFriends(res.data)
    //     }).catch(()=>
    //     {

    //     })
    // },[])
    return (
        <div>
            <input type="checkbox" id="my-modal-10" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-10" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Friends ({friends?.length})</h3>
                    <div className='px-4 py-6 rounded-lg mt-6 flex flex-col space-y-4  overflow-auto scrollbar-hide h-[500px] w-full'>
                        {friends?.map((item) => (
                            <MemberCard key={item.id} params={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

type MemberCardProps = {

    params:
    {
        id: number,
        nickName: string
        picture: string,
        bio: string,
        active: string,
        roomId:number
    }
}
const MemberCard = ({ params }: MemberCardProps) => {
    const [privateRoomFriend, setPrivateRoomFriend] = useRecoilState(PrivateRoomChannel)
    const [channel, setChannel] = useRecoilState(ChannelNavAtom)




    const Add = () => {
            Service.addFriend2PrivateRoom(params.id, channel.id).then(()=>
            {
                    success_alert(`${privateRoomFriend.nickName} added successfully`)
            }).catch(()=>
            {
                error_alert()
            })
    }
    let BgColour = "";
    switch (params.active) {
        case "on":
            BgColour = "bg-green-500";
            break;
        case "in":
            BgColour = " bg-orange-500";
            break;
        default:
            BgColour = "bg-red-500"

    }
    return (
        <div onClick={() => {
            setPrivateRoomFriend({ ...privateRoomFriend, ...params })
            // console.log("memberdata: ", params.id, memberData.memberId);

        }} className={`flex items-center bg-[#242424]   ${privateRoomFriend.id == params.id && "bg-login-gradient"} hover:bg-login-gradient justify-start px-4 py-6 rounded-lg relative space-x-3 `}>
            <div className='flex  flex-row items-center w-full justify-between'>
                <div className='flex items-center space-x-5 w-full'>

                    <div className="avatar relative ">
                        <div className="mask mask-squircle w-12 h-12">
                            <img src={params.picture} alt="Avatar Tailwind CSS Component" />
                        </div>
                        <div className={` h-2 w-2 ${BgColour} absolute bottom-1  right-0 ring-white ring-4 rounded-full`}></div>
                    </div>
                    <div>
                        <div className=" truncate font-bold text-sm">{params.nickName}</div>
                        {/* <div className="font-bold truncate text-xs">{params.role}</div> */}
                    </div>
                </div>
                <div onClick={Add} className="btn">
                    Add
                </div>
            </div>
        </div>
    );

}

export default AddChannelMembersModal