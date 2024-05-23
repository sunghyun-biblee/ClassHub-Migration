import React from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";
import { useUserQuery } from "./hooks/useUserQuery";
import { fetchUserStorage } from "hooks/fetchUserStorage";
import { useAuth } from "hooks/AuthProvider";

export const Nav = () => {
  const loginuser = fetchUserStorage();
  const { userData } = useAuth();
  console.log(userData);
  return (
    <>
      <NaviPC userData={userData}></NaviPC>
      <NaviMobile userData={userData}></NaviMobile>
    </>
  );
};
