import { Route, Routes } from 'react-router-dom'
import Dashboard from './components/view/Dashboard/Dashboard'
import Users from './components/view/Users/Users'
import Header from './components/view/Header/Header'
import Login from './components/view/Login/Login'
import Messages from './components/view/Messages/Messages'
import Navbar from './components/view/Navbar/Navbar'
import Profile from './components/view/Profile/Profile'
import { getCookie } from 'typescript-cookie'
import Service from './components/controller/services'
import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'
import { Status } from './components/model/atoms/Status'
import BanModal from './components/view/Modals/BanModal'
import AddChannelModal from './components/view/Modals/AddChannelModal'
import Confirm2FAModal from './components/view/Modals/Confirm2FAModal'
import BlockModal from './components/view/Modals/BlockModal'
import { ProfileData } from './components/model/atoms/ProfileData'
import { TwoFAEnabled } from './components/model/atoms/TwoFAEnabled'
import TwoFA from './components/view/Login/TwoFA'
import PageNotFound from './components/view/NotFound/PageNotFound'
import FriendProfile from './components/view/FriendProfile/FriendProfile'




function App() {

  const [status, setStatus] = useRecoilState(Status);
  const [twofaEnabled, settwofaEnabled] = useRecoilState(TwoFAEnabled);
  const [profileData, setprofileData] = useRecoilState(ProfileData);

  useEffect(() => {
    retrieveToken();
    // retrieveProfile();
  }, [status]);




  // const retrieveProfile = () => {
  //   Service.getProfile()
  //     .then((response: any) => {
  //       setprofileData(response.data)
  //       console.log(profileData);
        
  //       settwofaEnabled(profileData.twofactor)
  //     })
  //     .catch((e: Error) => {
  //       console.log(e);
  //     });
  // };
  const retrieveToken = () => {

    Service.getToken()
      .then((response: any) => {
        setprofileData({...profileData, ...response.data})
        console.log(response.data);
        
        setStatus(false);
      })
      .catch((e: Error) => {
        console.log(`error === > ${e}`);
        setStatus(true);
      });
  };

  return (
    <div className='text-white  '>
      {
      
        status ? <Login />
          :
          profileData.isTwoFacAuthEnabled  &&  (profileData.isTwoFacAuthVerified === false) ? <TwoFA/> : 
          <div>
            <Header />
            {/** All those Modals are being called by the user there not visible till they got called */}
            <BanModal/> {/*this modal is here  to prevent the state from changing (this modal is called by chatFriend)*/}
            <BlockModal/>
            <AddChannelModal/>
            <div className='w-full bg-black  grid grid-cols-12'>
              <Navbar />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/profile/:id' element={<FriendProfile />} />
                <Route path='/messages' element={<Messages />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </ div>
      }
      </div>
    
  )
}

export default App
