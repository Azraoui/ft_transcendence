import React from 'react'
import { useRecoilState } from 'recoil';
import avtar from '../../../assets/avatar.jpeg'
import { ProfileData } from '../../model/atoms/ProfileData';

function ProfileImage({avatar,BgColour}:{avatar:string, BgColour:string}) {

    return (
        <div className="avatar relative mb-3">
          <div className="mask mask-squircle w-12 h-12 sm:w-24 sm:h-24 ">
            <img src={avatar} alt="Avatar Tailwind CSS Component" />
          </div>
          <div className={` h-2 w-2  ${BgColour} absolute bottom-1  right-1 ring-white ring-4 rounded-full`}></div>
        </div>
    )
}

export default ProfileImage