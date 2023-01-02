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
import BanModal from './components/view/Messages/BanModal'




function App() {

  const [status, setStatus] = useRecoilState(Status);
  useEffect(() => {
    retrieveToken();
  }, [status]);

  const retrieveToken = () => {
    // console.log(`Herrerereereerrerere`);

    Service.getToken()
      .then((response: any) => {
        // console.log(response);
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
          <div>
            <Header />
            <div className='w-full bg-black  grid grid-cols-12'>
              <Navbar />
            <BanModal name="ddd" />
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/users' element={<Users />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/messages' element={<Messages />} />
                {/* <Route path='/login' element={<Login/>}/> */}
              </Routes>
            </div>
          </ div>
      }
      </div>
    
  )
}

export default App
