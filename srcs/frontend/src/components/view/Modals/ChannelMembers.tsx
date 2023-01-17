import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import avtar from '../../../assets/avatar.jpeg'
import Service from '../../controller/services'
import { ChannelNavAtom } from '../../model/atoms/ChannelsAtom'

function ChannelMembers() {
    const [channel, setChannel] = useRecoilState(ChannelNavAtom)

    useEffect(()=>
    {
        Service.getChannelMembers(channel.id).then((res:any)=>
        {
                console.log(res.data);
                
        }).catch(()=>
        {
            
        })
    })
    return (
        <div>

            <input type="checkbox" id="my-modal-6" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-6" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Members (5)</h3>
                    <div className='px-4 py-6 rounded-lg mt-6 flex flex-col  overflow-auto h-[500px] w-full'>
                        <div className="flex items-center  justify-between px-4 py-6 rounded-lg  space-x-3 bg-[#242424]">
                            <div className="avatar relative ">
                                <div className="mask mask-squircle w-12 h-12">
                                    <img src={avtar} alt="Avatar Tailwind CSS Component" />
                                </div>
                                <div className={` h-2 w-2 bg-red-500 absolute bottom-1  right-0 ring-white ring-4 rounded-full`}></div>

                            </div>
                            <div className="font-bold ">Test</div>
                        </div>
                        
                    </div>


                </div>
            </div>
        </div>
    )
}

export default ChannelMembers