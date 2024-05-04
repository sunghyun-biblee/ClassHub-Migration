import React from "react";

import styled from "styled-components";

export const NaviMobileBottom = () => {
  return (
    <NaviBottom>
      <ul className="flex justify-around shadow-[2px_0_1px_1px_rgba(149,157,165,0.5)] items-center w-[100vw] h-10 text-sm bg-[#efefef] fixed bottom-0 left-0 z-10 lg:hidden font-semibold ">
        <li>대시보드</li>
        <li>강의</li>
        <li>홈</li>
        <li>커뮤니티</li>
        <li>마이페이지</li>
      </ul>
    </NaviBottom>
  );
};

const NaviBottom = styled.div`
  margin-top: 40px;
  ul {
    li {
      cursor: pointer;
      width: 100%;
      text-align: center;
    }
  }
`;
