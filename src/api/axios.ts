import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.devproject.store",
  withCredentials: true,
});

export default instance;
