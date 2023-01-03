import { type } from "os";
import { useEffect, useState } from "react"


type TwoFAProps = 
{
    src:string,
    isEnabled:boolean
}

function Confirm2FAModal({src,isEnabled}:TwoFAProps) {

    const [isCheck, setCheck] = useState("none");


    const onOptionChange = (e: any) => {
        console.log(e.target.value);

        setCheck(e.target.value)
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

                    <img src={`data:image/jpeg;charset=utf-8;base64,${src}`} alt="QRCode"></img>
                    <input type="number" placeholder="Code" className="input w-full m-2 text-black" onChange={onOptionChange} />
                    
                    <div className="modal-action">
                        <label htmlFor="my-modal-2" className="btn">Verify & Activate</label>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Confirm2FAModal