import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { ChatFriends } from '../../model/atoms/ChatFriends';
import { error_alert, success_alert } from '../Utils/Alerts';

function ProtectedChannelModal(param : {roomId :number, type :string}) {
    const [isOK, setOK] = useState(false);
    const [code, setCode] = useState("");

    const Activate = (evt: FormEvent) => {
        evt.preventDefault();
        Service.joinChannel(param.roomId, param.type, code).then((res: any) => {
            console.log(res.data);
            success_alert("You Joined this channel Successfuly");
        
            setOK(true);
            setCode("");
            // window.location.reload()
        })
            .catch((e: Error) => {
                error_alert()
                setOK(false)
                console.log(e);
            })

    }
    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCode(e.target.value)
    }
    return (
        <div>
            <input type="checkbox" id="my-modal-5" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-5" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg">Confirm channel password</h3>
                    <form onSubmit={Activate}>
                        <input required type="password" placeholder="Code" name="code" value={code} className="input w-full m-2 text-black" onChange={onInputChange} />
                        <div className="modal-action ">
                            {isOK ? <label htmlFor="my-modal-5" className="btn">Close</label> : <button type="submit" className="btn "> Verify & Join</button >}

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default ProtectedChannelModal