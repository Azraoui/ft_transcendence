import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Friends } from '../../model/chatDB'
import FriendCard from '../Utils/FriendCard'

import junkData from '../../model/ChatDB.json'
import Service from '../../controller/services'
import { useRecoilState } from 'recoil'
import { ChatFriends } from '../../model/atoms/ChatFriends'


function FriendList(my_message:any) {
    const [friends, setFriends] = useRecoilState(ChatFriends)
    
    
    useEffect(()=>
    {
        Service.getFriends().then((res:any)=>
        {
            console.log(res.data);
            setFriends(res.data)
        }).catch(()=>
        {

        })
    },[])

    return (
        <div className="col-span-1 xl:border-r border-b sm:px-6 px-1 bg-[#242424] py-8 max-h-[800px] overflow-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none ">Friends</h5>
            </div>
            
                {
                    friends.map((item) =>
                    (
                        <FriendCard  key={item.id} data={item}/>

                    ))
                }
                
       

           

        </div>

    )
}

export default FriendList




