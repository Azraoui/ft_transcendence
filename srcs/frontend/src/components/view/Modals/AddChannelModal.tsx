import { useEffect, useState } from "react"
import { ToastContainer } from "react-toastify";
import Service from "../../controller/services";
import { success_alert } from "../Utils/Alerts";

function AddChannelModal() {

    const [isSubmit, setSubmit] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        type: "public", //default
        password:""
      })

    const onSubmit = (e:any) => {
        e.preventDefault();
        const data = {
            name: inputs.name,
            type: inputs.type,
            password: inputs.password
          }
        Service.addChannel(data).then(()=>
        {
                setSubmit(false);
            success_alert("Channel created Successfuly")

        }).catch((err:Error)=>
        {
                console.log(err);
                
        })
    }

    const onOptionChange = (e: any) => {

        console.log(e.target.value);
        const value = e.target.value;
            setSubmit(true);
            setInputs({
                ...inputs,
                [e.target.name]: value,
            })

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
                        <input type="text" placeholder="name" name="name" className="input w-full m-2 text-black" required onChange={onOptionChange} />
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
                            {inputs.type === "protected" ? <input name="password" onChange={onOptionChange} type="password" placeholder="Channel password" className={`input w-full m-2 text-black`} /> : " "}
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