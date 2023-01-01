import http from "./http-common";

const getAll = () => {
  return http.get<>("/friends");
};

const get = (id: any) => {
  return http.get<>(`/tutorials/${id}`);
};

const create = (data: ) => {
  return http.post<>("/tutorials", data);
};

const update = (id: any, data: ) => {
  return http.put<any>(`/tutorials/${id}`, data);
};

const remove = (id: any) => {
  return http.delete<any>(`/tutorials/${id}`);
};

const removeAll = () => {
  return http.delete<any>(`/tutorials`);
};

const findByTitle = (title: string) => {
  return http.get<>(`/tutorials?title=${title}`);
};

const Service = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default Service;