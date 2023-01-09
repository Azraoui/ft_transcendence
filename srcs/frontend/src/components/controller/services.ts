import axios from "axios";
import http from "./http-common";

const getFriends = () => {
  return http.get("/friends");  // Andak Tnsa (withCredentials)
};
const getToken = () => {
  return http.get("/auth/status", {withCredentials:true});
};
const getProfile = () => {
    return http.get("/user/profile", {withCredentials:true});
  };
  const getAllUsers = () => {
    return http.get("/user/getAllUsers", {withCredentials:true});
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
const updatePicture = async (file:FormData) => {
  try {
    
    const response = await axios({
      method: "put",
      url: "http://localhost:5000/api/user/updatePicture",
      data: file,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials:true,
    });
  } catch(error) {
    console.log(error)
  }
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
  getAllUsers,
  addFriend,
  viewFriend
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default Service;