import { Link, Route, Routes } from 'react-router-dom'
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
import ProtectedChannelModal from './components/view/Modals/ProtectedChannelModal'
import ChannelMembersModal from './components/view/Modals/ChannelMembersModal'
import MuteChannelMemberModal from './components/view/Modals/MuteChannelMemberModal'
import { io } from 'socket.io-client'
import { chatSocket, game_socket } from './components/controller/socket'
import GameView from './components/view/game/GameNormal'
import FriendProfileModal from './components/view/Modals/FriendProfileModal'
import GameNormal from './components/view/game/GameNormal'
import GameAdvanced from './components/view/game/GameAdvanced'
import GameSpectator from './components/view/game/GameSpectator'
import GameInviter from './components/view/game/GameInviter'
import { muted_user_alert, new_message_alert, success_alert } from './components/view/Utils/Alerts'
import { toast, ToastContainer } from 'react-toastify'
import GameInvited from './components/view/game/GameInvited'
import { Inviter } from './components/model/atoms/ChatFriends'
import AddChannelMembersModal from './components/view/Modals/AddChannelMembersModal'


const Accept = ({ msg, inviter }: { msg: string, inviter: string }) => {
  const handleClick = () => {
    chatSocket.emit("declined", inviter)
    toast.dismiss()
  }
  return (
    <div>
      <h3 className='font-bold'>
        {msg}
      </h3>
      <div className='flex w-full items-center justify-between'>
        <Link className='btn' onClick={() => {
          toast.dismiss()
          if (game_socket.connected) {
            game_socket.disconnect();
            game_socket.removeAllListeners();
          }

        }} to={'/invited'}>Accept</Link>
        <button className='btn' onClick={handleClick}>Decline</button>
      </div>
    </div>
  );
};
function App() {

  const [status, setStatus] = useRecoilState(Status);
  const [twofaEnabled, settwofaEnabled] = useRecoilState(TwoFAEnabled);
  const [profileData, setprofileData] = useRecoilState(ProfileData);
  const [inviter, setInviter] = useRecoilState(Inviter);


  useEffect(() => {

    // chatSocket
    retrieveToken();

    // retrieveProfile();
  }, [status]);

  useEffect(() => {
    chatSocket.on("muteNotification", (data) => {
      muted_user_alert("You're  muted till " + data.duration)
    });
    return () => { chatSocket.off("muteNotification") };

  }, [chatSocket])

  // useEffect(() => {
  //   chatSocket.on("msgToClients", (data) => {
  //     if (data.type == "CH")  // channel
  //     {
  //       if (data.senderId !== profileData.id)
  //         new_message_alert("new channel message from " + data.nickName)
  //     }
  //   });

  //   return () => { chatSocket.off("msgToClients") };

  // }, [chatSocket])

  // useEffect(() => {
  //   chatSocket.on("msgToClients", (data) => {
  //     console.log("data = ", data);
  //     if (data.type == "DM") {
  //       // console.log("sender id = ", data.senderId);
  //       // console.log("me id =", profileData.id);

  //       if (data.senderId !== profileData.id)
  //         new_message_alert("new message from " + data.nickName)
  //     }
  //   });
  //   return () => { chatSocket.off("msgToClients") };
  // }, [chatSocket])

  useEffect(() => {
    chatSocket.on("invited", (inviter) => {
      setInviter(inviter.nickname)
      toast(<Accept msg={`Invitation to play by ${inviter.nickname}`} inviter={inviter.nickname} />, {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "colored",
      });
      // success_alert(`Invitation to play by ${ inviter.nickname}`);
      // Display invitation (inviter.nickname, inviter.piclink)
      //   // If click on Decline: chat.socket.emit("declined", inviter.nickname) and stop displaying invitation
      //   // If click on Accept : disconnect game_socket the use GameInvited.tsx after modifying game_socket query nickname to inviter.nickname and stop displaying invitation

    });
    return () => { chatSocket.off("invited") };
  }, [chatSocket])

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
        setprofileData({ ...profileData, ...response.data })
        setStatus(false);
        chatSocket;
        game_socket;
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
          profileData.isTwoFacAuthEnabled && (profileData.isTwoFacAuthVerified === false) ? <TwoFA /> :
            <div>
              <Header />
              {/** All those Modals are being called by the user there not visible till they got called */}
              <BanModal /> {/*this modal is here  to prevent the state from changing (this modal is called by chatFriend)*/}
              <BlockModal />
              <AddChannelModal />
              <ProtectedChannelModal />
              <ChannelMembersModal />
              <MuteChannelMemberModal />
              <FriendProfileModal />
              <AddChannelMembersModal/>
              {/* <ToastContainer /> */}

              <div className='w-full bg-black   grid grid-cols-12'>
                <Navbar />
                <Routes>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/game-normal' element={<GameNormal />} />
                  <Route path='/game-advanced' element={<GameAdvanced />} />
                  <Route path='/live-games' element={<GameSpectator />} />
                  <Route path='/inviter' element={<GameInviter />} />
                  <Route path='/invited' element={<GameInvited />} />
                  <Route path='/users' element={<Users />} />
                  <Route path='/profile' element={<Profile />} />
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
