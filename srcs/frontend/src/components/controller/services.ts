import axios from "axios";
import { fileURLToPath } from "url";
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
  const Login = () => {
    return http.get("/auth/42-redirect", {withCredentials:true});
  };

// const get = (id: any) => {
//   return http.get<>(`/tutorials/${id}`);
// };

// const create = (data: ) => {
//   return http.post<>("/tutorials", data);
// };

const updateProfile = async (data: {file:FormData,nickname:string,bio:string}) => {
  try {
    console.log("================>",data.file);
    
    const response = await axios({
      method: "put",
      url: "http://localhost:5000/api/user/updateProfile",
      data: {
        file: data.file,
        bio: data.bio,
        nickname: data.nickname
      },
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
  Login,
  updateProfile
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default Service;