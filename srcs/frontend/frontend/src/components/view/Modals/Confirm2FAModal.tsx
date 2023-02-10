import { type } from "os";
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Service from "../../controller/services";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { error_alert, success_alert } from "../Utils/Alerts";


type TwoFAProps =
    {
        src: string,
        isEnabled: boolean
    }

function Confirm2FAModal({ src, isEnabled }: TwoFAProps) {

    const [code, setCode] = useState("");
    const [isOK, setOK] = useState(false);


    const Activate = (evt: FormEvent) => {
        evt.preventDefault();
        Service.post2FQRCode(code).then((res: any) => {
            console.log(res.data);
            if (res.data.status)
                success_alert("Your 2FA has been enabled Successfuly")
            else
                error_alert()
            setOK(res.data.status);
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
        const val = e.target.value;
        setCode(e.target.value)
    }
    return (
        <div>
            {/** ToastContainer required for the notification to be shown*/}
            <ToastContainer />
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
                        <input required type="text" placeholder="Code" name="code" value={code} className="input w-full m-2 text-black" onChange={onInputChange} />
                        <div className="modal-action ">
                            {isOK ? <label htmlFor="my-modal-2" className="btn">Close</label> : <button type="submit" className="btn "> Verify & Activate</button >}

                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}





export default Confirm2FAModal