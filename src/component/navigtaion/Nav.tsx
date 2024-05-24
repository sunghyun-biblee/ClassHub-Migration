import React from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";

import { fetchUserStorage } from "hooks/fetchUserStorage";
import { useAuth } from "hooks/AuthProvider";

export const Nav = () => {
  const { userData, userIsLoading, userIsError, userError } = useAuth();

  if (userIsLoading) {
    return <div></div>;
  }
  if (userIsError) {
    return <div>{userError?.message}</div>;
  }
  return (
    <>
      <NaviPC userData={userData}></NaviPC>
      <NaviMobile userData={userData}></NaviMobile>
    </>
  );
};
