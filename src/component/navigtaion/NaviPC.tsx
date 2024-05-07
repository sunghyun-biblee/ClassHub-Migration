import React from "react";
import styled from "styled-components";
import searchICON from "../../assets/img/searchICON.svg";
import { Link, useNavigate } from "react-router-dom";
const NavigationPC = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
  padding: 10px 0 10px 0;
  margin-top: 1px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100vw;
  background-color: #fdfdfe;
`;

const SearchButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${searchICON});
  background-position: center;
  position: absolute;
  right: 5px;
`;
export const NaviPC = () => {
  const nav = useNavigate();
  const handleGoindex = (): void => {
    nav("/");
  };
  return (
    <NavigationPC>
      <nav className=" lg:flex justify-between items-center py-3 px-3  my-0 mx-auto max-w-[1200px] w-[100vw] h-[64px]">
        <img
          src={searchICON}
          alt="logo-pc"
          className="w-8 cursor-pointer"
          onClick={handleGoindex}
        />
        <ul className="lg:flex justify-between w-44">
          <li className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer">
            <span>
              <Link to={"class"}>강의</Link>
            </span>
          </li>
          <li className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer">
            <span>
              <Link to={"community"}>커뮤니티</Link>
            </span>
          </li>
          {/* <li>멘토링</li> */}
        </ul>
        <div className="lg:flex justify-center items-center relative">
          <input
            type="text"
            className="border-2 rounded-md w-72 p-1 focus:outline-green-600"
          />
          <SearchButton>{/* <img src={searchICON} alt="" /> */}</SearchButton>
        </div>
        <ul className="lg:flex   justify-around w-80">
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>
              <Link to={"mypage/dashboard"}>대시보드</Link>
            </span>
          </li>
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>장바구니</span>
          </li>
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>
              <Link to={"mypage"}>마이페이지</Link>
            </span>
          </li>
        </ul>
      </nav>
    </NavigationPC>
  );
};
