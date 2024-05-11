import React, { ReactNode, createContext, useContext, useState } from "react";

// 인터페이스 정의
interface AuthContextType {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

// 기본 상태값
const initialState = {
  isLogin: false,
  login: () => {},
  logout: () => {},
};

// Context 생성
const AuthContext = createContext<AuthContextType>(initialState);

type AuthProviderType = {
  children: ReactNode;
};
export const AuthProvider = ({ children }: AuthProviderType) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  // 로그인 함수
  const login = () => {
    setIsLogin(true);
  };

  // 로그아웃 함수
  const logout = () => {
    setIsLogin(false);
  };
  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
