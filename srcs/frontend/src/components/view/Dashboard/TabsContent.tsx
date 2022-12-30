import React from 'react'

type TabsContentProps = {
  params: {
    id: number,
    title: string,
    img?: string
  }

}


export function TabsPlayContent({ params }: TabsContentProps) {
  return (
    <div className='flex xl:flex-col 2xl:w-80 w-full px-8 items-center justify-around 2xl:justify-between xl:h-96 bg-[#242424] ring-1 ring-white hover:bg-tab-gradient rounded-xl py-6 my-2 cursor-pointer'>
      <div className='w-56   '>
        <img className=' ' src={params.img} alt={params.title} />
      </div>
      <span className='md:flex hidden flex-col space-y-5 items-center justify-center'>
        <h1 className='font-bold text-center'>{params.title}</h1>
        <h1 className= 'font-bold'>Play</h1>
      </span>

    </div>
  )
}

export function TabsLiveContent({ params }: TabsContentProps) {
  return (
    <div className='flex xl:flex-col 2xl:w-80 w-full px-8 items-center justify-center ring-1 ring-white 2xl:justify-between xl:h-96 bg-[#242424] hover:bg-tab-gradient rounded-xl py-6 my-2 cursor-pointer'>
      <div className='w-56 h-w-56  '>
  
      </div>
      <span className='xl:flex hidden flex-col space-y-5 items-center justify-center'>
        <h1 className='font-bold'>{params.title}</h1>
        <h1 className='font-bold'>Play</h1>
      </span>

    </div>
  )
}




