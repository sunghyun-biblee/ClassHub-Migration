import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { MypageCategory } from "./MypageCategory";

export const Mypage = () => {
  const [category, setCategory] = useState<string>("home");
  return (
    <MypageContainer className="lg:pt-[130px] md:pt-[100px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px] lg:grid lg:grid-cols-[1fr,4fr] md:flex md:flex-col">
      <MypageCategory
        setCategory={setCategory}
        category={category}
      ></MypageCategory>
      <Outlet></Outlet>
    </MypageContainer>
  );
};

const MypageContainer = styled.div`
  margin: 0 auto;
`;
