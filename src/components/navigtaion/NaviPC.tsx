import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import searchICON from "assets/img/searchICON.svg";
import { Link, useNavigate } from "react-router-dom";
import logo from "assets/img/Logo.png";
import cart from "assets/img/Cart.svg";
import user from "assets/img/Person.svg";
import { userType } from "hooks/fetchUserData";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCartItemList } from "components/cart/hooks/getCartItemList";
import { fetchsearchKeyWord } from "./hooks/fetchsearchKeyWord";

const NavigationPC = styled.div`
  @media (max-width: 1023px) {
    display: none;
  }
  padding: 10px 0 10px 0;
  /* border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 2px solid rgba(0, 0, 0, 0.1); */
  box-shadow: rgba(149, 157, 165, 0.2) 0px 2px 5px;
  position: fixed;
  top: 0;
  z-index: 20;
  width: 100vw;
  background-color: #fdfdfe;
`;

const SearchButton = styled.input`
  width: 20px;
  height: 20px;
  background-image: url(${searchICON});
  background-position: center;
  position: absolute;
  right: 5px;
`;
interface INavProps {
  userData: userType;
}
export const NaviPC = ({ userData }: INavProps) => {
  const [isMyMenu, setIsMyMenu] = useState(false);
  const [searchKeyWord, setSearchKeyWord] = useState<string>("");
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const myPageRef = useRef(null);
  const handleNav = (location: string) => {
    nav(`${location}`);
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
  const handleLogOut = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/class/${searchKeyWord}`);
    queryClient.prefetchQuery({
      queryKey: ["searchList"],
      queryFn: () => fetchsearchKeyWord(searchKeyWord),
    });
  };
  return (
    <NavigationPC>
      <nav className=" lg:flex justify-between items-center py-3  my-0 mx-auto max-w-[1200px] w-[100vw] h-[64px]">
        <img
          src={logo}
          alt="logo-pc"
          className="w-20 cursor-pointer object-cover"
          onClick={() => {
            handleNav("/");
          }}
        />
        <ul className="lg:flex justify-between w-44">
          <li
            className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer"
            onClick={() => handleNav("/class")}
          >
            <span>
              <span>강의</span>
            </span>
          </li>
          <li
            className="px-3 border-solid border-[1px] border-blue-100 rounded-[3px] py-1 cursor-pointer"
            onClick={() => handleNav("/community/qna")}
          >
            <span>
              <span>커뮤니티</span>
            </span>
          </li>
          {/* <li>멘토링</li> */}
        </ul>
        <form action="" onSubmit={handleSubmitSearch}>
          <div className="lg:flex justify-center items-center relative">
            <input
              type="text"
              placeholder="강의를 검색해보세요"
              className="border-2 rounded-md w-72 h-[36px] px-2 text-sm py-1 focus:outline-blue-600"
              value={searchKeyWord}
              onChange={(e) => setSearchKeyWord(e.target.value)}
            />

            <SearchButton type="button" aria-label="searchBtn">
              {/* <img src={searchICON} alt="" /> */}
            </SearchButton>
          </div>
        </form>
        {userData && userData.userId ? (
          <ul className="lg:flex  items-center justify-around w-80">
            <li className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors">
              <span>
                <Link to={"mypage/dashboard"}>대시보드</Link>
              </span>
            </li>
            <li
              className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer relative"
              onClick={() => handleNav("/cart")}
            >
              <img src={cart} alt="장바구니" className="w-6" />
              {data?.length >= 0 && (
                <div className="absolute bg-red-500 rounded-[50%] -top-[30%] -right-[10%] w-5 h-5 flex justify-center items-center">
                  <p className="text-white">{data.length}</p>
                </div>
              )}
            </li>
            <li className=" flex items-center justify-center z-20 relative ">
              <div
                className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer"
                onClick={() => setIsMyMenu((prev) => !prev)}
                ref={myPageRef}
              >
                <img src={user} alt="마이페이지" className="w-6" />
              </div>

              {isMyMenu && (
                <ul
                  className="absolute animate-drop-down mt-5  bg-white   border-[1px] border-[#67A3F9] top-[25px] z-0 rounded-md"
                  ref={myPageRef}
                >
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
          <ul className="lg:flex items-center justify-around w-48">
            <li className="lg:px-2 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors">
              <span>
                <Link to={"signIn"}>로그인</Link>
              </span>
            </li>
            <li className="lg:px-3 py-1 border-solid border-[2px] border-blue-500/50 rounded-md cursor-pointer hover:bg-blue-300 hover:text-white hover:transition-colors">
              <span>
                <Link to={"signIn"}>회원가입</Link>
              </span>
            </li>
          </ul>
        )}
      </nav>
    </NavigationPC>
  );
};
