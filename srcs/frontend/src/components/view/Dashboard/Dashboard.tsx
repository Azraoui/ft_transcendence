import React from 'react'
import coq from "../../../assets/coq.png"
import table from "../../../assets/table.png"
import Tabs from './Tabs'

function Dashboard() {
  return (
    <main className='col-span-10  h-[100%] xl:h-[calc(100vh-88px)] sm:px-12  px-8 w-full  flex flex-col items-start justify-start space-y-12 pt-10'>
      <section className='flex w-full flex-col px-8 sm:px-14   space-y-16'>
        <h1 className=' text-xl lg:text-3xl font-extrabold text-gradient'>Good Morning, <p>Mohamed El Hadjaoui</p>  </h1>
        <div className='rounded-lg  px-8 sm:px-12 lg:ml-8 ring-1 ring-white flex items-center justify-around h-72 bg-gradient-to-b from-[#670196] to-[#DA00FE] ' >
          <div className='flex flex-col '>
            <h1 className='font-extrabold text-3xl lg:text-6xl'>Ping Pong</h1>
            <span className='font-light text-3xl lg:text-4xl text-center xl:text-end '>Game</span>
          </div>
          <div className='relative lg:w-96 w-56 h-full md:flex hidden items-center justify-center'>
          <img className=' absolute ' src={table} alt="pong table" />
          </div>
        </div>
      </section>
      <section className='flex w-full flex-col px-8 sm:px-14   space-y-4'>
        <h1 className=' text-xl lg:text-3xl font-extrabold '>Games</h1>
        <Tabs/>

      </section>
    </main>
  )
}

export default Dashboard