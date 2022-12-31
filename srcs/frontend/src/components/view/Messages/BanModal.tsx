import React from 'react'

function BanModal({name} :{name:string}) {
    return (
        <div>
            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Block {name}</h3>
                    <p className="py-4">{name} will be blocked you can unblock him/her anytime</p>
                    <div className="modal-action">
                        <label htmlFor="my-modal" className="btn">Confirm</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default BanModal