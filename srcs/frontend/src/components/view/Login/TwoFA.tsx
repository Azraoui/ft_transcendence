import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { ProfileData } from '../../model/atoms/ProfileData';
import { TwoFAEnabled } from '../../model/atoms/TwoFAEnabled';
import { Alert } from '../Modals/Confirm2FAModal';

// target='_blank'

function TwoFA() {
  const [profileData, setprofileData] = useRecoilState(ProfileData);



  const [code, setCode] = useState("");

    const Activate = (evt:FormEvent) => {
        evt.preventDefault();
        Service.post2FQRCode(code).then((res: any) => {
          // setprofileData({});
            // console.log(res.data);
            window.location.reload()
        })
            .catch((e: Error) => {
                console.log(e);
            })
    }



    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        const val = e.target.value;
        setCode(e.target.value)
    }
  return (
    <div className='flex items-center justify-center w-[100vw] h-[100vh] bg-login-gradient'>
        <div className='flex flex-col h-96 w-96 justify-around items-center backdrop-blur-sm bg-white/30 rounded-xl px-2 py-2'>
            <h1 className='font-extrabold text-2xl text-center'>Verify Your 2FA Code</h1>
            <form onSubmit={Activate}>
                        <input required type="text" placeholder="Code" className="input w-full m-2 text-black" onChange={onInputChange} />
                        <div className='flex justify-center items-center'>
                            <button type="submit"  className="btn ">Verify</button >
                        </div>
                    </form>
            <h1 className='font-extralight text-2xl text-center'>Begin Your Journey</h1>

        </div>
    </div>
  )
}

export default TwoFA