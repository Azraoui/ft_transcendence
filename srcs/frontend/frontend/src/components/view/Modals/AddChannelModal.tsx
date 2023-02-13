import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import Service from "../../controller/services";
import { error_alert_channel, success_alert } from "../Utils/Alerts";

function AddChannelModal() {

    const [isSubmit, setSubmit] = useState(false);
    const [channelName, setchannelName] = useState("");
    const [inputs, setInputs] = useState({
        type: "default", //default
        password:""
      })

    const onSubmit = (e:any) => {
        e.preventDefault();
        const data = {
            name: channelName,
            type: inputs.type,
            password: inputs.password
          }
        Service.addChannel(data).then(()=>
        {
                setSubmit(false);
            success_alert("Channel created Successfuly")
            setInputs({
                type: "default", //default
                password:""
              })

        }).catch((err:Error)=>
        {
            error_alert_channel()                
                setInputs({

                    type: "default", //default
                    password:""
                  })
        })
    }
const onNameChange = (e:any) =>
{
    setchannelName(e.target.value)
}
    const onOptionChange = (e: any) => {

        const value = e.target.value;
            setInputs({
                ...inputs,
                [e.target.name]: value,
            })
            setSubmit(true);


    }

    return (
        <div>
             <ToastContainer />
            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal">

                    <div className="modal-box relative bg-black">
                <form className="w-full" onSubmit={onSubmit}>
                        <label htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 className="font-bold text-lg pb-4">Add Channel</h3>
                        <input type="text" placeholder="name" name="name" className="input w-full m-2 text-pink-500" value={channelName} required onChange={onNameChange} />
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6">
                                <span className="label-text text-white font-bold  ">public</span>
                                <input type="radio" name="type" checked={inputs.type === "public"} className="radio   radio-info" value="public" onChange={onOptionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6" >
                                <span className="label-text text-white font-bold">private</span>
                                <input type="radio" name="type" checked={inputs.type === "private"} className="radio radio-info" value="private" onChange={onOptionChange} />
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label cursor-pointer  px-6" >
                                <span className="label-text text-white font-bold ">protected</span>
                                <input type="radio" name="type" checked={inputs.type === "protected"} className={`radio radio-info`} value="protected" onChange={onOptionChange} />
                            </label>
                            {inputs.type === "protected" ? <input name="password" value={inputs.password} required maxLength={40}  minLength={8} onChange={onOptionChange} type="password" placeholder="Channel password" className={`input w-full m-2 text-black`} /> : " "}
                        </div>
                        <div className="modal-action">
                            {isSubmit ? <button type="submit" className="btn"> Confirm</button > : <label htmlFor="my-modal-1" className="btn">Close</label>}
                        </div>
                </form>
                    </div>
            </div>
        </div>

    )
}

export default AddChannelModal