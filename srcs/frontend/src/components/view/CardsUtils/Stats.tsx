import React from 'react'
import { StatsCard } from './Cards'

function Stats() {
  return (
    <div className="flex items-center flex-col lg:flex-row w-full justify-around  ">
    <div className='flex w-full flex-col '>
      <h1 className='w-full font-bold sm:text-xl px-10 text-center pt-12'> Stats</h1>
      <div className='flex w-full items-center flex-col md:flex-row md:space-x-4 justify-evenly  '>
        <StatsCard title='Games' count='8' color='bg-[#10559A]' />
        <StatsCard title='Wins' count='5' color='bg-[#488786]' />
        <StatsCard title='Loses' count='3' color='bg-[#DB4C77]' />
      </div>
    </div>
  </div>
  )
}

export default Stats