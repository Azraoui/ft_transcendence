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
            setCode("");

            console.log(res.data);
        })
            .catch((e: Error) => {
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
                            {isOK ? Alert(): ""}
                            {isOK ? <label htmlFor="my-modal-2" className="btn">Close</label> : <button type="submit"  className="btn "> Verify & Activate</button >}
                                
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}


export function Alert()
{
    return (<div id="alert-1" className="flex p-4 mb-4 text-blue-700 bg-blue-100 rounded-lg " role="alert">
    <svg aria-hidden="true" className="flex-shrink-0 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path></svg>
    <span className="sr-only">Info</span>
    <div className="ml-3 text-sm font-medium">
    Your 2FA has been Set Successfuly
    </div>
      <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-blue-100 text-blue-500 rounded-lg focus:ring-2 focus:ring-blue-400 p-1.5 hover:bg-blue-200 inline-flex h-8 w-8 dark:bg-gray-800 dark:text-blue-400 dark:hover:bg-gray-700" data-dismiss-target="#alert-1" aria-label="Close">
        <span className="sr-only">Close</span>
        <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
    </button>
  </div>)
}


export default Confirm2FAModal