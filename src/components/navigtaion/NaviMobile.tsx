import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import searchICON from "assets/img/searchICON.svg";
import MenuBar from "assets/img/MenuBar.svg";
import logo from "assets/img/Logo.png";
import cart from "assets/img/Cart.svg";
import user from "assets/img/Person.svg";
import { Link, useNavigate } from "react-router-dom";
import { userType } from "hooks/fetchUserData";
import { useQuery } from "@tanstack/react-query";
import { getCartItemList } from "components/cart/hooks/getCartItemList";
import { NaviMobileCategory } from "./NaviMobileCategory";
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
export const SearchButton = styled.button`
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
  const [isMyMenu, setIsMyMenu] = useState(false);
  const myPageRef = useRef(null);
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
  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["cartItemList"],
    queryFn: () => getCartItemList(userData.userId),
  });

  const handleClickOutside = (event: MouseEvent) => {
    if (
      myPageRef.current &&
      !(myPageRef.current as HTMLElement).contains(event.target as Node)
    ) {
      setIsMyMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
            <NaviMobileCategory handleClick={handleClick}></NaviMobileCategory>
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
          {userData && userData.userId ? (
            <ul className="md:flex justify-between  items-center w-42 second-menu font-semibold ">
              <li
                className="px-4 cursor-pointer"
                onClick={() => handleNav("cart")}
              >
                <div className="relative">
                  <img src={cart} alt="장바구니" className="md:w-7 mysm:w-6" />
                  {data?.length >= 0 && (
                    <div className="absolute bg-red-500 rounded-[50%] -top-[30%] -right-[40%] w-5 h-5 flex justify-center items-center">
                      <p className="text-white">1</p>
                    </div>
                  )}
                </div>
              </li>
              <li className="px-3 cursor-pointer relative " ref={myPageRef}>
                <div onClick={() => setIsMyMenu((prev) => !prev)}>
                  <img
                    src={user}
                    alt="마이페이지"
                    className="md:w-7 mysm:w-6"
                  />
                </div>
                {isMyMenu && (
                  <ul className="absolute animate-drop-down mt-5  bg-white   border-[1px] border-[#67A3F9] top-[25px] md:-right-[8px]  mysm:right-0 rounded-md">
                    <li className="border-b-[1px] border-[#67A3F9] p-3 font-semibold ">
                      <button onClick={() => handleNav("mypage")}>MyHub</button>
                    </li>
                    <li className=" p-3 font-semibold ">
                      <button onClick={handleLogOut}>LogOut</button>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          ) : (
            <ul className="flex justify-between  items-center w-42 second-menu font-semibold ">
              <li
                className=" border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors
              mr-3 p-1
              text-sm
              "
              >
                <span>
                  <Link to={"signIn"}>로그인</Link>
                </span>
              </li>
            </ul>
          )}
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
