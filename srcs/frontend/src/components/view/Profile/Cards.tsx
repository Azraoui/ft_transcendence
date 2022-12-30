import React from 'react'

type StatsCardProps = 
{
    title:string,
    count:string,
    color:string,
}

type AcheivementCardProps = 
{
    title:string,
    color:string,
    cost: number,
    wingames: number,
    avatar:string
}

export function StatsCard({title, count, color} :StatsCardProps) {
  const shadow = "shadow-["+color+"]";
  return (
    <div className={`flex items-center justify-around  flex-col sm:flex-row h-40 w-full ring-1 ring-white ${color} rounded-xl mt-8  p-4`}>
            <h1 className='font-extrabold text-xl sm:text-5xl'>{count}</h1>
            <h1 className='font-bold sm:text-xl'>{title}</h1>
    </div>
  )
}

export function AcheivementCard({title, cost, color, avatar, wingames = 0} :AcheivementCardProps) {
  console.log(wingames);
  
  return (
    <div data-tip={`${cost} Wins to unlock this badge`} className={`flex items-center justify-around flex-col sm:flex-row xl:flex-col ${  cost > wingames && "grayscale"} ${color} h-40 w-full rounded-xl mt-8 p-4 ring-1 ring-white  tooltip` }>
            <img className='sm:h-32  h-16' src={avatar} alt="acheivement avatar" />
            <h1 className='font-bold sm:text-xl'>{title}</h1>
    </div>
  )
}

