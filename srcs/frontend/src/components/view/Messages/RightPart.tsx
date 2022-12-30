import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Friends } from '../../model/chatDB'
import Card from './Card'

import junkData from '../../model/ChatDB.json'


function RightPart(my_message:any) {
    console.log(junkData.friends);
    
    return (
        <div className="col-span-1 border-r  sm:px-12 px-1 bg-[#242424] py-8 max-h-[800px] overflow-auto scrollbar-hide">
            <div className="flex items-center justify-between mb-4">
                <h5 className="text-xl font-bold leading-none ">Friends</h5>
            </div>
            
                {
                    junkData.friends.map((item) =>
                    (
                        <Card  key={item.id} data={item}/>

                    ))
                }
                
       

           

        </div>

    )
}

export default RightPart




