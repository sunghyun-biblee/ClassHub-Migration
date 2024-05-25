import React, { useEffect } from "react";
import { NaviPC } from "./NaviPC";
import { NaviMobile } from "./NaviMobile";

import { fetchUserStorage } from "hooks/fetchUserStorage";
import { useAuth } from "hooks/AuthProvider";
import { useQueryClient } from "@tanstack/react-query";
import { getCartItemList } from "component/cart/hooks/getCartItemList";

export const Nav = () => {
  const { userData, userIsLoading, userIsError, userError } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["cartItemList"],
      queryFn: () => getCartItemList(userData.userId),
    });
  }, [queryClient, userData]);

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
