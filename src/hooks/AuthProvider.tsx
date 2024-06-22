import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { userType } from "./fetchUserData";
import { fetchUserStorage } from "./fetchUserStorage";
import { useUserQuery } from "components/navigtaion/hooks/useUserQuery";
import { getCookie } from "./CustomCookie";
import axios from "axios";
import requests from "api/requests";
import { useCookies } from "react-cookie";

// 인터페이스 정의
interface AuthContextType {
  userData: userType;
  userIsLoading: boolean | null;
  userIsError: boolean | null;
  userError: Error | null;
  userId: number;
  logOut: () => void;
}

const inistialState: AuthContextType = {
  userData: {
    userId: 0,
    userName: "",
    name: "",
    nickname: "",
    email: "",
    profilePicture: "",
    introduce: "",
    regDate: "",
    exitDate: "",
    role: "",
  },
  userId: 0,
  userIsLoading: null,
  userIsError: null,
  userError: null,
  logOut: () => {},
};

const AuthContext = createContext<AuthContextType>(inistialState);

type AuthProviderType = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  // const [user, setUser] = useState<userType>(inistialState.userData);
  const testUserId = localStorage.getItem("user");
  const userId = testUserId ? parseInt(testUserId) : inistialState.userId;
  const userCookie = getCookie("Authorization");
  console.log(userCookie);
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

  useEffect(() => {
    if (userData) {
      console.log(userData.userId);
      // setUser(userData);
      localStorage.setItem("user", userData.userId);
    }
  }, [userData]);

  const logOut = () => {
    // setUser(inistialState.userData);
    localStorage.removeItem("user");
    window.location.href = "https://api.devproject.store/logout";
  };
  // console.log(user);
  console.log(userData);
  return (
    <AuthContext.Provider
      value={{
        userData: userData,
        userIsLoading,
        userIsError,
        userError,
        logOut,
        userId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
