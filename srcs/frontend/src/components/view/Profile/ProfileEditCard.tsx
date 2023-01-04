import React, { ChangeEvent, useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { EditProfile } from '../../model/atoms/EditProfile';
import { ProfileData } from '../../model/atoms/ProfileData';
import Confirm2FAModal from '../Modals/Confirm2FAModal';
import Acheivements from './Acheivements'
import ProfileImage from './ProfileImage'
// import {Buffer} from 'buffer';




export function ProfileEditCard() {
  const [isMe, setIsMe] = useRecoilState(EditProfile);
  const [profileData, setprofileData] = useRecoilState(ProfileData);
  const [is2fEnabled, set2F] = useState(profileData.twofactor)
  const [qrCode, setQrCode] = useState("")

  //e: ChangeEvent<HTMLInputElement>
  

  const onClickDisable2fa = () => {
    Service.turnOff2FQRCode().then((response:any)=>
    {
      console.log(response.data);
    // set2F(e.target.);

  
    }).catch((e:Error) => 
    {
      console.log(e);
    })
  };
  const onClickEnable2fa = () => {
    // set2F(e.target.checked);
    Service.get2FQRCode().then((response:any)=>
    {
      console.log(response.data);
      const base64 = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      )
      setQrCode(base64)
    }).catch((e:Error) => 
    {
      console.log(e);
    })
  };



  return (
    <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
      <div className='flex flex-col items-center justify-between ring-2 ring-gray-600 ring-offset-1 rounded-md px-2 sm:px-12 pt-12 pb-6 shadow-lg shadow-slate-700 w-3/4 space-y-8' >
        <ProfileImage />
        <div className="mb-3 w-full">
          <label htmlFor="formFile" className="form-label inline-block mb-2">Choose your Image</label>
          <input type="file" className="file-input file-input-bordered file-input-accent w-full text-gray-700 " />
          {/* <input className="form-control block w-full px-3 py-1.5 text-base font-normal    text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" type="file" id="formFile" /> */}
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label htmlFor='exampleText0' className="form-label inline-block mb-2 ">NickName</label>
            <input type="text" placeholder={profileData.username} className="input input-bordered input-success text-gray-800 w-full" />
          </div>
        </div>
        <div className="flex w-full justify-center">
          <div className="mb-3 w-full">
            <label className="form-label inline-block mb-2 ">About You</label>
            <textarea className="textarea textarea-accent w-full text-gray-800" placeholder={profileData.bio}></textarea>
          </div>
        </div>

        <div className="form-control flex w-full justify-center ">
          <label className="cursor-pointer label">
            {/* <span className="label-text text-white font-extrabold sm:text-xl">Enabale 2f verification</span> */}
            {/**onChange={onChangeEnable2fa} */}
            {is2fEnabled ?  <button className="btn w-full" onClick={onClickDisable2fa}>Disable 2FA Verification</button>  :<label htmlFor="my-modal-2" className="btn w-full" onClick={onClickEnable2fa}>Enabale 2FA Verification</label>}
            {/* <input type="checkbox" className="toggle toggle-accent"  onChange={onChangeEnable2fa}></input> */}
          </label>
        </div>
        {/** Call Confirm 2FA Modal */}
        <Confirm2FAModal src={qrCode} isEnabled={is2fEnabled}/>
        {/* {is2fEnabled  ?  <img src={`data:image/jpeg;charset=utf-8;base64,${qrCode}`} alt="QRCode"></img> : ""} */}
        <div className='flex sm:flex-row flex-col items-center justify-evenly w-full' >
        <button className="btn w-20 btn-accent transition duration-300 ease-in-out mb-2 hover:-translate-y-1 hover:scale-110">Save</button>
        <button className="btn w-20 btn-secondary   mb-2 transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-110" onClick={()=> setIsMe(true)}>Cancel</button>
        </div>
        
      </div>


      <Acheivements />

    </div>
  )
}

