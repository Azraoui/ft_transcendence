import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import Service from '../../controller/services'
import { AcheivementsLinks } from '../../model/Acheivements'
import { EditProfile } from '../../model/atoms/EditProfile'
import Acheivements from './Acheivements'
import { AcheivementCard, StatsCard } from './Cards'
import History from './History'
import ProfileCard from './ProfileCard'
import { ProfileEditCard } from './ProfileEditCard'
import Stats from './Stats'

function Profile() {
  const [isMe, setIsMe] = useRecoilState(EditProfile);
  useEffect(() => {
    retrieveProfile();
  }, []);

  const retrieveProfile = () => {
    Service.getProfile()
      .then((response: any) => {
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(`error === > ${e}`);
      });
  };
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