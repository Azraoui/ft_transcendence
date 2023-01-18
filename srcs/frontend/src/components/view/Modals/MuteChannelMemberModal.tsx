import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import Service from "../../controller/services";
import { error_alert, error_alert_channel, success_alert } from "../Utils/Alerts";




function MuteChannelMemberModal({ roomId, memberId }: { roomId: number, memberId: number }) {

    const [isSubmit, setSubmit] = useState(false);
    const [duration, setDuration] = useState('1')
    console.log(roomId, " ******* ", memberId);
    
    const onSubmit = (e: any) => {
        e.preventDefault();
      const data = {
            roomId: roomId,
            duration: +duration, //default
            memberId: memberId
        }
        console.log(data.duration," duration +++++++++++++++++++++++");
        
        Service.muteMember(data).then(() => {
            success_alert("member muted successfuly")
            setSubmit(false);

        }).catch((err: Error) => {
        setSubmit(false);
            error_alert()
        })
    }

    const onOptionChange = (e: any) => {
        const value = e.target.value;
        setSubmit(true);
        setDuration(value)
    }

    return (
        <div>
            {/* <ToastContainer /> */}
            <input type="checkbox" id="my-modal-7" className="modal-toggle" />
            <div className="modal">

                <div className="modal-box relative bg-black">
                    <form className="w-full" onSubmit={onSubmit}>
                        <label htmlFor="my-modal-7" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg pb-4">Mute for :</h3>
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6">
                                <span className="label-text text-white font-bold  ">1 min</span>
                                <input type="radio" name="duration" checked={duration == '1'} className="radio   radio-info" value='1' onChange={onOptionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6" >
                                <span className="label-text text-white font-bold">2 min</span>
                                <input type="radio" name="duration" checked={duration == '2'} className="radio radio-info" value='2' onChange={onOptionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6" >
                                <span className="label-text text-white font-bold ">3 min</span>
                                <input type="radio" name="duration" checked={duration == '3'} className={`radio radio-info`} value='3' onChange={onOptionChange} />
                            </label>
                        </div>
                        <div className="modal-action">
                            {isSubmit ? <button type="submit" className="btn"> Confirm</button > : <label htmlFor="my-modal-7" className="btn">Close</label>}
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default MuteChannelMemberModal