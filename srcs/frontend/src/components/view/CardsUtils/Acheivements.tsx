import React from 'react'
import { AcheivementsLinks } from '../../model/Acheivements'
import { AcheivementCard } from './Cards'

function Acheivements() {
  return (
    <div className="flex items-center flex-col lg:flex-row w-full justify-around mt-10 ">
    <div className='flex w-full flex-col '>
      <h1 className=' font-bold sm:text-xl text-center '> Achievements</h1>
      <div className='flex w-full items-center flex-col lg:flex-row lg:space-x-4 justify-evenly'>
        {
          AcheivementsLinks.map((items) => (
            <AcheivementCard key={items.id} title={items.title} cost={items.cost} color={items.color}
             avatar={items.avatar} wingames={items.wingames}></AcheivementCard>
          ))
        }
      </div>
    </div>
  </div>
  )
}

export default Acheivements