import React from "react";
import styled from "styled-components";
import searchICON from "../../assets/img/searchICON.svg";
const NavigationPC = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
  padding: 10px 0 10px 0;
  margin-top: 1px;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
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
  return (
    <NavigationPC>
      <nav className=" lg:flex justify-between items-center py-3 px-3 w-[1200px] my-0 mx-auto ">
        <img src={searchICON} alt="logo-pc" className="w-8" />
        <ul className="lg:flex justify-between w-44">
          <li className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer">
            <span>강의</span>
          </li>
          <li className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer">
            <span>커뮤니티</span>
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
        <ul className="lg:flex  justify-around w-80">
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>대시보드</span>
          </li>
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>장바구니</span>
          </li>
          <li className="lg:px-3 py-1 border-solid border-[1px] border-green-500 rounded-[3px] cursor-pointer">
            <span>마이페이지</span>
          </li>
        </ul>
      </nav>
    </NavigationPC>
  );
};
