import { useEffect, useState } from "react"

function AddChannelModal() {

    const [isCheck, setCheck] = useState("none");


    const onOptionChange =( e:any) => {
        console.log(e.target.value);
        
        setCheck(e.target.value)
      }
    return (
        <div>
            <input type="checkbox" id="my-modal-1" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-1" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg pb-4">Add Channel</h3>
                    <input type="text" placeholder="Channel name" className="input w-full m-2 text-black" onChange={onOptionChange}/>
                    <div className="form-control">
                        <label className="label cursor-pointer  px-6">
                            <span className="label-text text-white font-bold  ">public</span>
                            <input type="radio" name="radio-10" className="radio   radio-info"  value="public" onChange={onOptionChange} />
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer  px-6" >
                            <span className="label-text text-white font-bold">private</span>
                            <input type="radio" name="radio-10" className="radio radio-info" value="private" onChange={onOptionChange}/>
                        </label>
                    </div>
                    <div className="form-control">
                        <label className="label cursor-pointer  px-6" >
                            <span className="label-text text-white font-bold ">protected</span>
                            <input type="radio" name="radio-10" className={`radio radio-info`}  value="protected"  onChange={onOptionChange}/>
                        </label>
                        {isCheck === "protected" ?   <input type="text" placeholder="Channel password" className={`input w-full m-2 text-black  `} /> :  " "}
                    </div>
                    <div className="modal-action">
                        <label htmlFor="my-modal-1" className="btn">Confirm</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AddChannelModal