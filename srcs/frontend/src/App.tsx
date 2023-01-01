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




function App() {
  // const token = getCookie('Token');
  // console.log(token);
  const [tutorials, setTutorials] = useState([]);
  useEffect(() => {
    retrieveToken();
  }, []);

  const retrieveToken = () => {
    Service.getToken()
      .then((response: any) => {
        console.log(response.data);
        setTutorials(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
  
  return (
    <div className='text-white  '>
      <Login />
      <div>
        <Header />
        <div className='w-full bg-black  grid grid-cols-12'>
          <Navbar />
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/users' element={<Users />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/messages' element={<Messages />} />
            {/* <Route path='/login' element={<Login/>}/> */}
          </Routes>
        </div>
      </ div>
    </div>
  )
}

export default App
