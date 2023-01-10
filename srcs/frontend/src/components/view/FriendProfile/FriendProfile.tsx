import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Service from '../../controller/services'
import { AcheivementsLinks } from '../../model/Acheivements'
import { EditProfile } from '../../model/atoms/EditProfile'
import { ProfileData } from '../../model/atoms/ProfileData'
import Acheivements from '../CardsUtils/Acheivements'
import { AcheivementCard, StatsCard } from '../CardsUtils/Cards'
import History from '../CardsUtils/History'
import ProfileCard from './ProfileCard'
import Stats from '../CardsUtils/Stats'

function FriendProfile() {
  const [isMe, setIsMe] = useRecoilState(EditProfile);
  // const [profileData, setprofileData] = useRecoilState(ProfileData);
  useEffect(() => {
  
   console.log(window.location.pathname.split("/").pop());
   
    // retrieveFriendProfile();
  }, []);

  // const retrieveFriendProfile = () => {
  //   Service.viewFriend(5)
  //     .then((response: any) => {
  //       console.log(response.data);
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)]  w-full grid grid-cols-1 xl:grid-cols-5 px-12 pt-12 pb-6'>
      <div className='col-span-3  order-last xl:order-first sm:px-12 px-1'>
        <Stats />
        <History />
      </div>
        <ProfileCard /> 
    </div>
  )
}

export default FriendProfile