import React, { useEffect, useState } from 'react'

import Card from '../Utils/FriendCard'
import { PlusIcon } from '@heroicons/react/24/outline';

import junkData from '../../model/ChannelDB.json'
import AddChannelModal from '../Modals/AddChannelModal';
import ChannelCard from '../Utils/ChannelCard';
import { useRecoilState } from 'recoil';
import { ChannelAtom } from '../../model/atoms/ChannelsAtom';
import Service from '../../controller/services';


function ChannelList() {
    const [channel, setChannel] = useRecoilState(ChannelAtom)
  
    
    useEffect(()=>
    {
        Service.getChannels().then((res:any)=>
        {
            console.log(res.data);
            setChannel(res.data)
        }).catch(()=>
        {

        })
    },[])


    return (
        <div className="col-span-1 xl:border-r border-b sm:px-6 px-1 bg-[#242424] py-8 max-h-[800px] overflow-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
                <span className='flex items-center justify-between w-full'>
                    <h5 className="text-xl font-bold leading-none ">Channels</h5>
                    <label htmlFor="my-modal-1" ><PlusIcon className="header-icon Add channel"/></label>
                </span>
            </div>
            <div className='flex flex-col-reverse'>
            {
                channel.map((item) =>
                (
                    <ChannelCard key={item.id} data={item} />
                    
                    ))
                }
                </div>
        </div>

    )
}

export default ChannelList