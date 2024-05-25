import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MypageCategory } from "./MypageCategory";
import { useQueryClient } from "@tanstack/react-query";
import { fetchQuestionList } from "../community/hooks/fetchCommuArray";
import { getTeacherData } from "./hooks/getTeacherData";

export const Mypage = () => {
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["myCommu"],
    queryFn: () => fetchQuestionList(1),
  });

  return (
    <MypageContainer className="lg:pt-[130px] md:pt-[100px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px] lg:grid lg:grid-cols-[1fr,4fr] md:flex md:flex-col">
      <MypageCategory></MypageCategory>
      <Outlet></Outlet>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  margin: 0 auto;
`;
