import axios from "axios";

export interface userType {
  userId: number;
  snsId: string;
  accessToken: string;
  name: string;
  nickname: string | null;
  email: string;
  profilePicture: string | null;
  platformType: string;
  introduce: string | null;
  regDate: string;
  exitDate: string | null;
  role: string | null;
}
export const fetchUserData = async (userSnsId: string) => {
  if (userSnsId) {
    try {
      const data = await axios.get("https://devproject.store/selectUser", {
        params: {
          snsId: userSnsId,
        },
      });
      console.log(data.data.data);
      return data.data.data;
    } catch (error) {
      console.log(error);

      return null;
    }
  } else {
    const guest = {
      userId: "",
      snsId: "",
      accessToken: "",
      name: "",
      nickname: "",
      email: "",
      profilePicture: "",
      platformType: "",
      introduce: "",
      regDate: "",
      exitDate: "",
      role: "",
    };
    return guest;
  }
};
