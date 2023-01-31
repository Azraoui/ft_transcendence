import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { ChatFriendNav, ChatFriends } from '../../model/atoms/ChatFriends';
import { error_alert, success_alert } from '../Utils/Alerts';

function BlockModal() {

    const [activeNavFriend, setActiveNavFriend] = useRecoilState(ChatFriendNav)
    const [isOK, setOK] = useState(false);

     const Block =  ()=>
    {
            Service.blockFriend(activeNavFriend.id).then(() =>
            {
                success_alert(activeNavFriend.nickName + " blocked successfully")
                setOK(true)
            }).catch(()=>
            {
                error_alert()
            })
    }
    
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Block {activeNavFriend.nickName}</h3>
                    <p className="py-4">{activeNavFriend.nickName} will be blocked you can unblock him/her anytime</p>
                    <div className="modal-action">
                        {isOK  ?  <label htmlFor="my-modal-3" className="btn">Close</label> : <button  onClick={Block} className='btn'>Confirm</button> }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BlockModal