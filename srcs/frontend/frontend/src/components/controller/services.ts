import axios from "axios";
import http from "./http-common";


const getToken = () => {
  return http.get("/auth/status", {withCredentials:true});
};
const getProfile = () => {
    return http.get("/user/profile", {withCredentials:true});
  };
  const getNoFriends = () => {
    return http.get("/user/getNoFriends", {withCredentials:true});
  };
  const get2FQRCode = () => {
    return http.get("/2fa/generate", {withCredentials:true,responseType: "arraybuffer",} ,);
  };
    const post2FQRCode = (twoFactorAuthenticationCode:string) => {
    return http.post("/2fa/turn-on", {twoFactorAuthenticationCode}, {withCredentials:true} );
  };
  const turnOff2FQRCode = () => {
    return http.put("/2fa/turn-off", {test:false}, {withCredentials:true});
  };
  const Logout = () => {
    return http.get("/auth/log-out", {withCredentials:true});
  };
  const viewFriend = (id:number) => {
    return http.get(`/user/getUserProfile/${id}`, {withCredentials:true});
  };
  const updateUserInfo = (data: {bio:string, nickname:string}) => {
    return http.put("/user/updateUserInfo", data, {withCredentials:true});
  };
  const addFriend = (id:number) => {
    return http.post(`/user/addFriend/${id}`,{}, {withCredentials:true} );
  };
    const addChannel = (data :{name:string, type:string,password:string}) => {
    return http.post('/chat/createRoom',data, {withCredentials:true} );
  };

  const makeNewChannelAdmin = (data :{roomId:number, memberId:number}) => {
    return http.post('/chat/addAdmin',data, {withCredentials:true} );
  };
    const banChannelMember = (data :{roomId:number, memberId:number}) => {
    return http.post('/chat/blockMember',data, {withCredentials:true} );
  };
    const unmuteChannelMember = (data :{roomId:number, memberId:number}) => {
    return http.post('/chat/unMuteMember',data, {withCredentials:true} );
  };
  const getChannels = () => {
    return http.get('/chat/getAllRooms', {withCredentials:true});
  };
  const getChannelMembers = (id:number) => {
    return http.get(`/chat/viewMembers/${id}`, {withCredentials:true});
  };
  const joinChannel = (roomId:number, type:string, password?:string) => {    
    return http.post(`/chat/joinRoom`, {roomId,type, password}, {withCredentials:true});
  };
  const muteMember = (data :{roomId:number, memberId:number, duration:number}) => {
    
    return http.post(`/chat/muteMember`, data, {withCredentials:true});
  };
  const leaveChannel = (id:number) => {
    return http.delete(`/chat/leftRoom/${id}`, {withCredentials:true});
  };

    const getChannelMessages = (id:number) => {
    return http.get(`/chat/getRoomData/${id}`, {withCredentials:true});
  };


  const getFriends = () => {
    return http.get('/user/getAllFriends', {withCredentials:true});
  };

  const getFriendMessages = (id:number) => {

    return http.get(`/chat/getDirectMsgs/${id}`, {withCredentials:true});
  };

  const blockFriend = (id:number) => {
    return http.post(`/user/blockFriend/${id}`,{}, {withCredentials:true} );
  };

const updatePicture = async (file:FormData) => {
  try {
    
    const response = await axios({
      method: "put",
      url:`http://${import.meta.env.VITE_IP}:5000/api/user/updatePicture`,
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials:true,
    });
  } catch(error) {
    console.log(error)
  }
};

  const addFriend2PrivateRoom = (id:number, roomId:number) => {
    return http.post(`/chat/addFriend2PrivateRoom`,{id,roomId}, {withCredentials:true} );
  };



// const remove = (id: any) => {
//   return http.delete<any>(`/tutorials/${id}`);
// };

// const removeAll = () => {
//   return http.delete<any>(`/tutorials`);
// };

// const findByTitle = (title: string) => {
//   return http.get<>(`/tutorials?title=${title}`);
// };

const Service = {
  getFriends,
  getProfile,
  getToken,
  get2FQRCode,
  post2FQRCode,
  turnOff2FQRCode,
  Logout,
  updatePicture,
  updateUserInfo,
  getNoFriends,
  addFriend,
  viewFriend,
  addChannel,
  getChannels,
  getChannelMessages,
  joinChannel,
  leaveChannel,
  getChannelMembers,
  makeNewChannelAdmin,
  banChannelMember,
  muteMember,
  unmuteChannelMember,
  getFriendMessages,
  blockFriend,
  addFriend2PrivateRoom
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default Service;