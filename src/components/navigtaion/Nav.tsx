import React from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";

import { useAuth } from "hooks/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { getCookie } from "hooks/CustomCookie";
import axios from "api/axios";
import requests from "api/requests";

export const Nav = () => {
  const { userData, userIsLoading, userIsError, userError } = useAuth();
  const queryClient = useQueryClient();
  const value = getCookie("Authorization");

  const fetchData = async () => {
    if (userData) {
      try {
        await axios.get(requests.user.getUserData, {
          withCredentials: true,
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  fetchData();
  // console.log(userData.userId);
  // useEffect(() => {
  //   if (userData.userId) {
  //     queryClient.prefetchQuery({
  //       queryKey: ["cartItemList", userData.userId],
  //       queryFn: () => getCartItemList(userData.userId),
  //     });
  //   }
  // }, [queryClient, userData]);
  if (userIsLoading) {
    return <div></div>;
  }
  return (
    <>
      <NaviPC userData={userData}></NaviPC>
      <NaviMobile userData={userData}></NaviMobile>
    </>
  );
};
