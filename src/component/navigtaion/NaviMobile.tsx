import React, { useState } from "react";
import styled from "styled-components";
import searchICON from "assets/img/searchICON.svg";
import MenuBar from "assets/img/MenuBar.svg";
import logo from "assets/img/Logo.png";
import cart from "assets/img/Cart.svg";
import user from "assets/img/Person.svg";
import { useNavigate } from "react-router-dom";
import { userType } from "hooks/fetchUserData";
import { useQuery } from "@tanstack/react-query";
import { getCartItemList } from "component/cart/hooks/getCartItemList";
const NavigationMobile = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;

  background-color: #fdfdfe;
  @media (max-width: 767px) {
    display: block;
  }
  .bottomNav {
    position: fixed;
    bottom: 0;
    left: 0;
  }
  nav {
    display: flex;
    justify-content: space-between;
    .second-menu {
      display: flex;
    }
    .side-menu {
      div {
        display: flex;
      }
    }
  }

  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
`;
const SearchButton = styled.button`
  width: 20px;
  height: 20px;
  background-image: url(${searchICON});
  background-position: center;
  position: absolute;
  right: 20px;
`;

const SideMenu = styled.div<{ menu?: string }>`
  display: ${(props) => (props.menu === "true" ? "block" : "hidden")};
  width: 300px;
  height: 100dvh;
  z-index: 2;
  background-color: aliceblue;
  position: fixed;
  transition: left 0.3s;
  top: 0;
  left: ${(props) =>
    props.menu === "true" ? "0" : "-300px"}; /* 트랜지션 속성을 left에 적용 */
`;
const BackPage = styled.div<{ menu?: string }>`
  display: ${(props) => (props.menu === "true" ? "block" : "none")};
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 1;
  height: 100dvh;
  position: fixed;
  left: 0;
  top: 0;
`;
interface INavtype {
  userData: userType;
}
export const NaviMobile = ({ userData }: INavtype) => {
  const nav = useNavigate();
  const [menu, setMenu] = useState("false");
  const handleClick = () => {
    if (menu === "false") {
      setMenu("true");
    } else if (menu === "true") {
      setMenu("false");
    }
  };

  const handleNav = (location: string) => {
    nav(`${location}`);
  };

  const { data } = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => getCartItemList(userData.userId),
  });
  console.log(typeof data);

  return (
    <NavigationMobile className="screen-width lg:hidden z-20 h-[72px]">
      <nav className=" md:flex justify-between items-center py-[4px] md:pl-5 md:pr-2 mysm:pl-2 ">
        <div>
          <img
            src={MenuBar}
            alt="menubar"
            className="menu_bar w-8 h-8 cursor-pointer"
            onClick={handleClick}
          />
          <SideMenu menu={menu.toString()} className="side-menu">
            <div className=" relative md:flex justify-center items-center p-3">
              <input
                placeholder="검색어를 입력해주세요"
                type="text"
                className="border-2 rounded-md w-[280px] py-1 pl-[8px] text-[14px] focus:outline-green-600"
              />
              <SearchButton className="button"></SearchButton>
            </div>
            <ul>
              <li></li>
              <li className="mysm:text-blue-600">2</li>
              <li className="sm:text-blue-100">3</li>
              <li className="sm:text-red-500">4</li>
              <li>
                <p onClick={handleClick}>닫기</p>
              </li>
            </ul>
          </SideMenu>
          <BackPage
            menu={menu.toString()}
            className="back"
            onClick={handleClick}
          ></BackPage>
        </div>
        <div
          onClick={() => handleNav("/")}
          className="mysm:translate-x-7 md:translate-x-5"
        >
          <img src={logo} alt="" className="logo w-[64px] h-13 " />
        </div>
        <div>
          <ul className="md:flex justify-between  items-center w-42 second-menu font-semibold ">
            <li
              className="px-4 cursor-pointer"
              onClick={() => handleNav("cart")}
            >
              <div className="relative">
                <img src={cart} alt="장바구니" className="md:w-7 mysm:w-6" />
                {data?.length >= 1 && (
                  <div className="absolute bg-red-500 rounded-[50%] -top-[30%] -right-[40%] w-5 h-5 flex justify-center items-center">
                    <p className="text-white">1</p>
                  </div>
                )}
              </div>
            </li>
            <li
              className="px-3 cursor-pointer"
              onClick={() => handleNav("mypage")}
            >
              <div>
                <img src={user} alt="마이페이지" className="md:w-7 mysm:w-6" />
              </div>
            </li>
          </ul>
        </div>
      </nav>
    </NavigationMobile>
  );
};

// {/* <div className="lg:flex justify-center items-center relative">
// <input
//   type="text"
//   className="border-2 rounded-md w-72 p-1 focus:outline-green-600"
// />
// <SearchButton>{/* <img src={searchICON} alt="" /> */}</SearchButton> */}
