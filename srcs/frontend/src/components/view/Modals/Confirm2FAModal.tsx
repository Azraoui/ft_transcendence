import { type } from "os";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Service from "../../controller/services";


type TwoFAProps =
    {
        src: string,
        isEnabled: boolean
    }

function Confirm2FAModal({ src, isEnabled }: TwoFAProps) {

    const [code, setCode] = useState("");
    const [isOK, setOK] = useState(false);

    const Activate = (evt:FormEvent) => {
        evt.preventDefault();
        Service.post2FQRCode(code).then((res: any) => {
            setOK(res.data.status);
            console.log(res.data);
        })
            .catch((e: Error) => {
                setOK(false)
                console.log(e);
            })
    }



    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const val = e.target.value;
        setCode(e.target.value)
    }
    return (
        <div>
    
            <input type="checkbox" id="my-modal-2" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative bg-black">
                    <label htmlFor="my-modal-2" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="font-bold text-lg pb-4">Two-Factor Authentication (2FA)</h3>
                    <div className={`pb-4`}>
                        <li className="text-sm font-light">
                            Install Google Authenticator (IOS - Android) or Authy (IOS - Android).
                        </li>
                        <li className="text-sm font-light">In the authenticator app, select "+" icon.</li>
                        <li className="text-sm font-light">
                            Select "Scan a barcode (or QR code)" and scan this barcode.
                        </li>
                    </div>
                    <div className="flex items-center w-full justify-center">

                        <img src={`data:image/jpeg;charset=utf-8;base64,${src}`} alt="QRCode" ></img>
                    </div>
                    <form onSubmit={Activate}>
                        <input required type="text" placeholder="Code" className="input w-full m-2 text-black" onChange={onInputChange} />
                        <div className="modal-action ">
                            {isOK ? <div className="alert alert-success shadow-lg">
                                <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    <span>Your 2FA has been Set</span>
                                </div>
                            </div> : ""}
                            {isOK ? <label htmlFor="my-modal-2" className="btn">Close</label> : <button type="submit"  className="btn "> Verify & Activate</button >}

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}



export default Confirm2FAModal