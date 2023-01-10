import React from 'react'
import Acheivements from '../CardsUtils/Acheivements'
import ProfileImage from '../CardsUtils/ProfileImage'
import {PencilSquareIcon } from '@heroicons/react/24/outline';
import { useRecoilState } from 'recoil';
import { EditProfile } from '../../model/atoms/EditProfile';
import { ProfileData } from '../../model/atoms/ProfileData';


function ProfileCard() {
  const [isMe, setIsMe] = useRecoilState(EditProfile);
  const [profileData, setprofileData] = useRecoilState(ProfileData);


    return (
        <div className='col-span-2 bg-[#242424] ring-2 ring-gray-600 ring-offset-1 rounded-md w-full  flex flex-col items-center justify-evenly  px-4 pt-12 pb-6'>
            <div className='flex flex-col items-center justify-between ring-2 ring-gray-600 ring-offset-1 rounded-md px-2 sm:px-12 pt-12 pb-6 shadow-lg shadow-slate-700 w-3/4 space-y-8' >
                <div className='w-full flex  justify-end items-end'>

                <PencilSquareIcon  onClick={() => setIsMe(false)} className='header-icon hover:text-[#DA00FE] '/>
                </div>
                <ProfileImage />
              

                <h1 className='font-bold text-center w-full overflow-auto'>{profileData.firstName} {profileData.lastName}</h1>
                <h1 className='font-bold text-center w-full overflow-auto'>{profileData.nickName}</h1>
                <h1 className='font-bold text-center w-full overflow-auto'>{profileData?.bio}</h1>
               

            </div>


            <Acheivements />
        </div>

    )
}

export default ProfileCard