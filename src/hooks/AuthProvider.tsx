import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { userType } from "./fetchUserData";
import { fetchUserStorage } from "./fetchUserStorage";
import { useUserQuery } from "component/navigtaion/hooks/useUserQuery";
import { getCookie } from "./CustomCookie";
import axios from "axios";
import requests from "api/requests";

// 인터페이스 정의
interface AuthContextType {
  userData: userType;
  userIsLoading: boolean | null;
  userIsError: boolean | null;
  userError: Error | null;
}

const inistialState: AuthContextType = {
  userData: {
    userId: 0,
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
  },
  userIsLoading: null,
  userIsError: null,
  userError: null,
};

const AuthContext = createContext<AuthContextType>(inistialState);

type AuthProviderType = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  // const [user, setUser] = useState<userType>(inistialState.userData);

  const userCookie = getCookie("Authorization");

  // if (userCookie) {
  //   try {
  //     const res = axios.get(requests.user.getUserData, {
  //       withCredentials: true,
  //     });
  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const { userData, userIsLoading, userIsError, userError } =
    useUserQuery(userCookie);

  return (
    <AuthContext.Provider
      value={{ userData: userData, userIsLoading, userIsError, userError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
