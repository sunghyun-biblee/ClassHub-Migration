import axios from "api/axios";
import requests from "api/requests";

export interface userType {
  userId: number;
  snsId: string;
  accessToken: string;
  name: string;
  nickname: string | null;
  email: string;
  profilePicture: string;
  platformType: string;
  introduce: string | null;
  regDate: string;
  exitDate: string | null;
  role: string | null;
}
export const fetchUserData = async (userCookie: string) => {
  if (userCookie) {
    try {
      const data = await axios.get(requests.user.getUserData, {
        withCredentials: true,
      });
      console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  } else {
    return null;
    // const guest = {
    //   userId: "",
    //   snsId: "",
    //   accessToken: "",
    //   name: "",
    //   nickname: "",
    //   email: "",
    //   profilePicture: "",
    //   platformType: "",
    //   introduce: "",
    //   regDate: "",
    //   exitDate: "",
    //   role: "",
    // };
    // return guest;
  }
};
