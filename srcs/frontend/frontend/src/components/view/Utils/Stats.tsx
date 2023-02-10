import React from 'react'
import { useRecoilState } from 'recoil';
import { ProfileData } from '../../model/atoms/ProfileData';
import { StatsCard } from './Cards'

function Stats() {
  const [profileData, setprofileData] = useRecoilState(ProfileData);

  return (
    <div className="flex items-center flex-col lg:flex-row w-full justify-around  ">
    <div className='flex w-full flex-col '>
      <h1 className='w-full font-bold sm:text-xl px-10 text-center pt-12'> Stats</h1>
      <div className='flex w-full items-center flex-col md:flex-row md:space-x-4 justify-evenly  '>
        <StatsCard title='Games' count={profileData.game.stats.games} color='bg-[#10559A]' />
        <StatsCard title='Wins' count={profileData.game.stats.wins} color='bg-[#488786]' />
        <StatsCard title='Loses' count={profileData.game.stats.loses} color='bg-[#DB4C77]' />
      </div>
    </div>
  </div>
  )
}

export default Stats