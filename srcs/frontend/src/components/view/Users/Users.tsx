import React, { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { ActiveTabState } from '../../model/atoms/ActiveTabState';
import { ProfileData } from '../../model/atoms/ProfileData';
import { UsersDB } from '../../model/Users'
import UserCard from './UserCard';

function Users() {
  const [profileData, setprofileData] = useRecoilState(ProfileData);
  const [activeNacItem, setActiveNavItem] = useRecoilState(ActiveTabState)
  useEffect(()=>
  {
    setActiveNavItem(3)
  })
  const [Users, setUsers] = useState([{
    firstName : "",
    id: -1,
    lastName:"",
    nickName:"",
    username:"",
    picture:"",
    bio:"",
    active:"off"
  }])
  useEffect(() => {
    retrieveProfile();
  }, []);

  const retrieveProfile = () => {
    Service.getNoFriends()
      .then((response: any) => {
    
        console.log(response.data);
        setUsers(response.data)
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  return (
    <div className='col-span-10 h-[100%] xl:h-[calc(100vh-88px)] sm:px-12 flex items-start justify-center flex-col px-12  w-full scrollbar-hide  space-y-12 pt-10'>
      <h1 className='font-extrabold w-full px-12'>All Users <code>({Users.length})</code> </h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-4 gap-4 h-[1000px] overflow-auto px-12 scrollbar-hide  w-full '>
      {
        
   
      Users.map((item) => (
         <UserCard data={item} key={item.id} /> 
        ))
     
      }
      </div>
    </div>
  )
}

export default Users