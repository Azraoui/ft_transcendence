import React, { useEffect } from 'react'
import { BellIcon } from '@heroicons/react/24/outline';
import logo from "../../../assets/PingPong.png"
import avtar from '../../../assets/avatar.jpeg'
import { ProfileData } from '../../model/atoms/ProfileData';
import { useRecoilState } from 'recoil';
import Service from '../../controller/services';
import { Link } from 'react-router-dom';



function Header() {
  const [profileData, setprofileData] = useRecoilState(ProfileData);
  useEffect(() => {
    retrieveProfile();
  }, []);

  const retrieveProfile = () => {
    Service.getProfile()
      .then((response: any) => {
        setprofileData(response.data)
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  };
    const LogOut = () => {
    Service.Logout()
      .then((response: any) => {

        console.log(response.data);
        window.location.reload()
        window.location.href = "/";
      })
      .catch((e: Error) => {
        console.log("=>>>>>>.", e);
      });
  };
  return (
    <div className='bg-[#242424] w-full py-2  max-h-24 items-center justify-between flex px-12  '>

      {/*Logo*/}
      <div className='w-full flex  space-x-4 items-center lg:justify-start py-2'>
        <div className='sm:w-14 sm:h-14  w-6 h-6 flex items-center'>
          <img src={logo} alt="" />
        </div>
        {/* <CpuChipIcon className='w-6 h-6'></CpuChipIcon> */}
        <h1 className='sm:text-2xl  font-bold text-gradient-1'  >PongGame</h1>
      </div>

      {/*Icons*/}

      
      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={profileData.picture} />
          </div>
        </label>
        <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-[#242424] rounded-box w-52">
          <li>
            <Link to={'/profile'} className="btn w-full"> Profile </Link>
          </li>
          <li>  <a className="btn my-1 w-full" onClick={() => {
            LogOut();
          }}>Logout</a></li>
        </ul>
      </div>
    </div>
  )
}

export default Header