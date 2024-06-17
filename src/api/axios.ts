import axios, { AxiosInstance } from "axios";

const instance = axios.create({
  baseURL: "/api",
  // withCredentials: true,
});
// https://api.devproject.store
// const instance: AxiosInstance = axios.create({
//   baseURL: "/api",
// });

export default instance;
