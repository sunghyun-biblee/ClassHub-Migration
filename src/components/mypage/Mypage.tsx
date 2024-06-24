import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MypageCategory } from "./MypageCategory";
import { useQueryClient } from "@tanstack/react-query";
import {
  fetchMyCommuList,
  fetchPaymentedList,
} from "../community/hooks/fetchCommuArray";

import { useAuth } from "hooks/AuthProvider";

export const Mypage = () => {
  const { userData, userId, userIsLoading } = useAuth();
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.prefetchQuery({
      queryKey: ["paymentedList"],
      queryFn: () => fetchPaymentedList(userData.userId),
    });
    queryClient.prefetchQuery({
      queryKey: ["myCommu"],
      queryFn: () => fetchMyCommuList(userId),
    });
    // queryClient.prefetchQuery({
    //   queryKey: ["myLectureList"],
    //   queryFn: () => fetchMyLectureList(),
    // });
  }, [userData, queryClient, userId]);

  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  return (
    <MypageContainer className="lg:pt-[130px] md:pt-[100px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px] lg:grid lg:grid-cols-[1fr,4fr] md:flex md:flex-col">
      <MypageCategory userData={userData}></MypageCategory>
      <Outlet></Outlet>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  margin: 0 auto;
`;
