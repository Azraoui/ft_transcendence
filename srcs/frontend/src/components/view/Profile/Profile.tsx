import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Service from '../../controller/services'
import { AcheivementsLinks } from '../../model/Acheivements'
import { EditProfile } from '../../model/atoms/EditProfile'
import { ProfileData } from '../../model/atoms/ProfileData'
import Stats from '../Utils/Stats'
import History from '../Utils/History'

import ProfileCard from './ProfileCard'
import { ProfileEditCard } from './ProfileEditCard'
import { ActiveTabState } from '../../model/atoms/ActiveTabState'

function Profile() {
  const [isMe, setIsMe] = useRecoilState(EditProfile);
  const [activeNacItem, setActiveNavItem] = useRecoilState(ActiveTabState)
  useEffect(()=>
  {
    setActiveNavItem(1)
  })
  // const [profileData, setprofileData] = useRecoilState(ProfileData);
  // useEffect(() => {
  //   retrieveProfile();
  // }, []);

  // const retrieveProfile = () => {
  //   Service.getProfile()
  //     .then((response: any) => {
  //       setprofileData(response.data)
  //       // console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //     });
  // };
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)]  w-full grid grid-cols-1 xl:grid-cols-5 px-12 pt-12 pb-6'>
      <div className='col-span-3  order-last xl:order-first sm:px-12 px-1'>
        <Stats />
        <History />
      </div>
      {
        isMe ? <ProfileCard /> : <ProfileEditCard />
      }
    </div>
  )
}

export default Profile