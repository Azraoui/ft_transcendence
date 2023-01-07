import React from 'react'
import { UsersDB } from '../../model/Users'
import UserCard from './UserCard'

function Users() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12 flex items-start justify-center  px-12  w-full scrollbar-hide  space-y-12 pt-10'>
      <div className='flex flex-wrap h-[1000px] overflow-auto scrollbar-hide items-center justify-between w-full max-w-5xl'>

      {UsersDB.map((item) => (
        <UserCard data={item} key={item.id}/>
        ))}
      </div>
    </div>
  )
}

export default Users