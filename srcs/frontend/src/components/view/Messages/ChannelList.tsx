import React from 'react'

import Card from '../CardsUtils/FriendCard'
import { PlusIcon } from '@heroicons/react/24/outline';

import junkData from '../../model/ChannelDB.json'
import AddChannelModal from '../Modals/AddChannelModal';
import ChannelCard from '../CardsUtils/ChannelCard';


function ChannelList(my_message: any) {


    return (
        <div className="col-span-1 border-r  sm:px-6 px-1 bg-[#242424] py-8 max-h-[800px] overflow-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
                <span className='flex items-center justify-between w-full'>
                    <h5 className="text-xl font-bold leading-none ">Channels</h5>
                    <label htmlFor="my-modal-1" ><PlusIcon className="header-icon Add channel"/></label>
                </span>

            </div>

            {
                junkData.channels.map((item) =>
                (
                    <ChannelCard key={item.id} data={item} />

                ))
            }





        </div>

    )
}

export default ChannelList