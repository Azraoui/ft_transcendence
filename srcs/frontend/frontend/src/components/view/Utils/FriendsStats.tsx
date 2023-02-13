import React from 'react'
import { useRecoilState } from 'recoil';
import { ProfileData } from '../../model/atoms/ProfileData';
import { StatsCard } from './Cards'
type Props = {
 
         games:number,
         wins:number,
         loses:number

}
function FriendsStats(data:Props) {

  return (
    <div className="flex items-center flex-col lg:flex-row w-full justify-around  ">
    <div className='flex w-full flex-col '>
      <h1 className='w-full font-bold sm:text-xl px-10 text-center pt-12'> Stats</h1>
      <div className='flex w-full items-center flex-col md:flex-row md:space-x-4 justify-evenly  '>
        <StatsCard title='Games' count={data.games} color='bg-[#10559A]' />
        <StatsCard title='Wins' count={data.wins} color='bg-[#488786]' />
        <StatsCard title='Loses' count={data.loses} color='bg-[#DB4C77]' />
      </div>
    </div>
  </div>
  )
}

export default FriendsStats