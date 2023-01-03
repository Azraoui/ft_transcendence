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
  //   const get2FQRCode = (isEnabled:boolean) => {
  //   return http.post("/2fa/generate", {isEnabled}, {withCredentials:true,responseType: "arraybuffer",} ,);
  // };
  const Logout = () => {
    return http.get("/auth/log-out", {withCredentials:true});
  };

// const get = (id: any) => {
//   return http.get<>(`/tutorials/${id}`);
// };

// const create = (data: ) => {
//   return http.post<>("/tutorials", data);
// };

// const update = (id: any, data: ) => {
//   return http.put<any>(`/tutorials/${id}`, data);
// };

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
  Logout
  // get,
  // create,
  // update,
  // remove,
  // removeAll,
  // findByTitle,
};

export default Service;