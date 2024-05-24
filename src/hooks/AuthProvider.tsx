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
  const [user, setUser] = useState<userType>(inistialState.userData);

  const userStore = fetchUserStorage();
  const { userData, userIsLoading, userIsError, userError } = useUserQuery(
    userStore.snsId
  );
  useEffect(() => {
    setUser(userData);
  }, [userData, user, userStore]);

  return (
    <AuthContext.Provider
      value={{ userData: user, userIsLoading, userIsError, userError }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
