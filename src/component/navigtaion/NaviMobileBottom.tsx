import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

export const NaviMobileBottom = () => {
  return (
    <NaviBottom>
      <ul className="flex justify-around shadow-[2px_0_1px_1px_rgba(149,157,165,0.5)] items-center w-[100vw] h-10 text-sm bg-[#efefef]  lg:hidden font-semibold ">
        <li>
          <Link to={"dashboard"}>대시보드</Link>
        </li>
        <li>
          <Link to={"class"}>강의</Link>
        </li>
        <li>
          <Link to={"/"}>홈</Link>
        </li>
        <li>
          <Link to={"community"}>커뮤니티</Link>
        </li>
        <li>
          <Link to={"mypage"}>마이페이지</Link>
        </li>
      </ul>
    </NaviBottom>
  );
};

const NaviBottom = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 20;
  ul {
    li {
      cursor: pointer;
      width: 100%;
      text-align: center;
    }
  }
`;
