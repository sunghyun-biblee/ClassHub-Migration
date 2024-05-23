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

// 인터페이스 정의
interface AuthContextType {
  userData: userType;
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
  },
};

const AuthContext = createContext<AuthContextType>(inistialState);

type AuthProviderType = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [user, setUser] = useState<userType>(inistialState.userData);

  const userStore = fetchUserStorage();
  const { userData } = useUserQuery(userStore.snsId);
  useEffect(() => {
    setUser(userData);
  }, [userData, user, userStore]);

  return (
    <AuthContext.Provider value={{ userData: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
