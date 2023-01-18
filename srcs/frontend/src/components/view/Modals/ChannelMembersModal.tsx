import { EllipsisVerticalIcon } from '@heroicons/react/24/outline'
import { channel } from 'diagnostics_channel'
import { type } from 'os'
import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import { ChannelNavAtom, ChannelsMember } from '../../model/atoms/ChannelsAtom'
import { error_alert } from '../Utils/Alerts'

function ChannelMembersModal() {
    const [channel, setChannel] = useRecoilState(ChannelNavAtom)
    const [data, setData] = useRecoilState(ChannelsMember)

    useEffect(() => {

        Service.getChannelMembers(channel.id).then((res: any) => {
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
                    <div className='px-4 py-6 rounded-lg mt-6 flex flex-col space-y-4  overflow-auto h-[500px] w-full'>
                        {data.members?.map((item) => (
                            <MemberCard key={item.id} params={item} userRole={{ userRole: data.userRole }} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

type MemberCardProps = {
    userRole:
    {
        userRole: string
    }
    params:
    {
        id: number,
        nickName: string
        pictureLink: string,
        role: string
    }
}
const MemberCard = ({ params, userRole }: MemberCardProps) => {
    console.log(userRole.userRole);

    return (
        <div className="flex items-center   justify-start px-4 py-6 rounded-lg relative space-x-3 bg-[#242424]">

            <div className="avatar relative ">
                <div className="mask mask-squircle w-12 h-12">
                    <img src={params.pictureLink} alt="Avatar Tailwind CSS Component" />
                </div>
                <div className={` h-2 w-2 bg-red-500 absolute bottom-1  right-0 ring-white ring-4 rounded-full`}></div>

            </div>
            <div>
                <div className=" truncate text-sm">{params.nickName}</div>
                <div className="font-bold truncate text-xs">{params.role}</div>
            </div>
            {
                (userRole.userRole === "owner" ) && ( params.role !== "owner") ?
                    <div className="dropdown dropdown-left absolute  right-3 ">
                        {/* invisible hover:visible */}
                        <div tabIndex={0} className=""><EllipsisVerticalIcon className='header-icon' /></div>
                        <ul tabIndex={0} className="dropdown-content  menu p-2 shadow bg-[#242424] rounded-box w-26 sm:w-52">
                            <li> {params.role === "admin" || params.role === "owner" ? <label htmlFor="my-modal-6" className={`btn my-1`}>Block</label> : ""}
                            </li>
                            <li> {true ? <label htmlFor="my-modal-6" className={`btn my-1`}>View Members</label> : ""}</li>
                        </ul>
                    </div> : ""
            }
        </div>
    );

}

export default ChannelMembersModal