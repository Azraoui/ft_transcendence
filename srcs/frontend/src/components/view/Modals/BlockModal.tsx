import React, { useEffect } from 'react'
import { useRecoilState } from 'recoil';
import { ChatFriends } from '../../model/atoms/ChatFriends';

function BlockModal() {

    const [activeNavItem, setActiveNavItem] = useRecoilState(ChatFriends)
    useEffect(()=>
    {

    }, [])
    
    return (
        <div>
            <input type="checkbox" id="my-modal-3" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Block {activeNavItem.name}</h3>
                    <p className="py-4">{activeNavItem.name} will be blocked you can unblock him/her anytime</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal-3" className="btn">Confirm</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BlockModal