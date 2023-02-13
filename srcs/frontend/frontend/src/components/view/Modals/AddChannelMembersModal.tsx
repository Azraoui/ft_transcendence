import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { channel } from 'diagnostics_channel'
import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import { ChannelMemberData, ChannelNavAtom, ChannelsMember } from '../../model/atoms/ChannelsAtom'
import { ProfileData } from '../../model/atoms/ProfileData'
import { error_alert, success_alert } from '../Utils/Alerts'
import MuteChannelMemberModal from './MuteChannelMemberModal'

function AddChannelMembersModal() {
    const [channel, setChannel] = useRecoilState(ChannelNavAtom)
    const [profileData, setprofileData] = useRecoilState(ProfileData);
    const [data, setData] = useRecoilState(ChannelsMember)

    useEffect(() => {

        Service.getFriends().then((res: any) => {
            setData(res.data);
        }).catch(() => {
        })
    }, [channel])
    return (
        <div>
            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Members ({data.members?.length})</h3>
                    <div className='px-4 py-6 rounded-lg mt-6 flex flex-col space-y-4  overflow-auto scrollbar-hide h-[500px] w-full'>
                        {data.members?.map((item) => (
                            <MemberCard key={item.id} params={item}/>
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
        pictureLink: string,
        role: string,
        active: string,
        isMuted: boolean
    }
}
const MemberCard = ({ params }: MemberCardProps) => {
    const [memberData, setMemberData] = useRecoilState(ChannelMemberData)


const Add = () =>{

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
            setMemberData({ ...memberData, ...params })
            // console.log("memberdata: ", params.id, memberData.memberId);

        }} className={`flex items-center bg-[#242424]   ${memberData.memberId == params.id && "bg-login-gradient"} hover:bg-login-gradient justify-start px-4 py-6 rounded-lg relative space-x-3 `}>
            <div className="avatar relative ">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={params.pictureLink} alt="Avatar Tailwind CSS Component" />
                </div>
                <div className={` h-2 w-2 ${BgColour} absolute bottom-1  right-0 ring-white ring-4 rounded-full`}></div>
            </div>
            <div>
                <div className=" truncate text-sm">{params.nickName}</div>
                {/* <div className="font-bold truncate text-xs">{params.role}</div> */}
            </div>
            <div onClick={Add} className="btn">
                Add
            </div>
        </div>
    );

}

export default AddChannelMembersModal