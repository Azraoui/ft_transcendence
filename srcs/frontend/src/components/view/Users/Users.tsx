import React from 'react'
import UserCard from './UserCard'

function Users() {
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12  px-8 w-full scrollbar-hide flex flex-col items-start justify-start space-y-12 pt-10'>
      <UserCard/>
    </div>
  )
}

export default Users