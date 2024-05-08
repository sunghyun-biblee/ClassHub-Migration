import React from "react";
import styled from "styled-components";
import preview from "../../assets/img/preview.jpg";
import { Icon } from "./Icon";
import { GradeUpBtn } from "./GradeUpBtn";
import { Link, useLocation } from "react-router-dom";
import path from "path";

export const MypageCategory = () => {
  const { pathname } = useLocation();

  let stylePath = pathname.split("/")[2];
  if (stylePath === undefined) {
    stylePath = "home";
  }

  return (
    <CategoryContainer
      className="lg:px-4 lg:py-3 md:px-2 md:py-2 border-[1px] rounded-lg lg:mr-3 md:mx-1 lg:block md:grid md:grid-cols-[1fr,3fr]  mysm:flex
    lg:shadow-[0px_8px_24px_rgba(149,157,165,0.3)]
    lg:h-[530px]
    
    "
    >
      <div className="flex justify-between w-[100%] lg:pb-3  lg:border-none md:border-r-[1px] md:p-2">
        <div className="flex flex-col justify-between py-1">
          <h1 className="font-semibold">Admin</h1>
          <p className="text-gray-400 font-semibold">학생</p>
        </div>
        <img
          src={preview}
          alt=""
          className="object-cover lg:w-[50%] md:w-[50%]  rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.3)] "
        />
      </div>
      <ul className="lg:pt-5 lg:pb-5 lg:border-t-[1px] lg:border-b-[1px] lg:block md:flex md:justify-around md:items-center md:pl-2">
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "home" ? "md:border-blue-400 md:border-b-[2px]" : ""
          }`}
        >
          <button className="flex items-center" id="home">
            <Icon category={stylePath} id="home"></Icon>
            <p
              className={
                stylePath === "home" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage"}>홈</Link>{" "}
            </p>
          </button>
        </Li>
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "profile"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button className="flex items-center" id="profile">
            <Icon category={stylePath} id="profile"></Icon>
            <p
              className={
                stylePath === "profile" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/profile"}>정보수정</Link>
            </p>
          </button>
        </Li>
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "management"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button className="flex items-center" id="management">
            <Icon category={stylePath} id="management"></Icon>
            <p
              className={
                stylePath === "management" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/management"}>학습 관리</Link>
            </p>
          </button>
        </Li>
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "dashboard"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button className="flex items-center" id="dashboard">
            <Icon category={stylePath} id="dashboard"></Icon>
            <p
              className={
                stylePath === "dashboard" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/dashboard"}>대시보드</Link>
            </p>
          </button>
        </Li>
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "mycommu"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button className="flex items-center" id="mycommu">
            <Icon category={stylePath} id="mycommu"></Icon>
            <p
              className={
                stylePath === "mycommu" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/mycommu"}>게시글 관리</Link>
            </p>
          </button>
        </Li>
        <Li
          className={`lg:mb-1 lg:border-none ${
            stylePath === "application"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button className="flex items-center" id="application">
            <Icon category={stylePath} id="application"></Icon>
            <p
              className={
                stylePath === "application" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/application"}>수강신청 관리</Link>
            </p>
          </button>
        </Li>
      </ul>
      <div className="lg:block md:hidden mysm:hidden lg:pt-5">
        <GradeUpBtn></GradeUpBtn>
      </div>
    </CategoryContainer>
  );
};

const CategoryContainer = styled.div``;
const Li = styled.li`
  padding: 10px 0;
`;
