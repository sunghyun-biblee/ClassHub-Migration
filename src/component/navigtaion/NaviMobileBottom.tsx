import React from "react";

import styled from "styled-components";

export const NaviMobileBottom = () => {
  return (
    <NaviBottom>
      <ul className="flex justify-around items-center w-[100vw] h-10 text-sm lg:hidden font-semibold ">
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
  position: fixed;
  bottom: 0;
  left: 0;
  ul {
    box-shadow: rgba(149, 157, 165, 0.5) 2px 0px 1px 1px;
  }
`;
