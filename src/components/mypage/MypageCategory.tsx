import React from "react";
import styled from "styled-components";
import preview from "assets/img/preview.jpg";
import { Icon } from "./Icon";
import { GradeUpBtn, handleClick } from "./GradeUpBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { userType } from "hooks/fetchUserData";

interface IMyCategoryType {
  userData: userType;
}

export const MypageCategory = ({ userData }: IMyCategoryType) => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  console.log(userData);
  let stylePath = pathname.split("/")[2];
  if (stylePath === undefined) {
    stylePath = "home";
  }

  const teacherDataString = localStorage.getItem("teacher");
  const teacherData = teacherDataString ? JSON.parse(teacherDataString) : null;
  const renderUserType = () => {
    if (userData) {
      switch (userData.role) {
        case "1":
          return "학생";
        case "2":
          return "강사";
        default:
          break;
      }
    }
  };
  return (
    <CategoryContainer
      className="lg:px-4 lg:py-3 md:px-2 md:py-2 border-[1px] rounded-lg lg:mr-3 mysm:mx-1 lg:block mysm:grid md:grid-cols-[1fr,3fr] mysm:grid-cols-[1.6fr,3fr]
      
    lg:shadow-[0px_8px_24px_rgba(149,157,165,0.3)]
    lg:h-[530px]
    
    "
    >
      <div
        className="flex md:justify-between mysm:justify-between  md:w-[100%] mysm:w-[100%] lg:pb-3  lg:border-none mysm:border-r-[1px] mysm:p-2"
        onClick={() => nav("/mypage")}
      >
        <div className="flex flex-col  justify-between py-1">
          <h1 className="font-semibold">{userData && userData.name}</h1>
          <p className="text-gray-400 font-semibold">{renderUserType()}</p>
        </div>
        <img
          src={userData && userData.profilePicture}
          alt="userImg"
          className="object-cover md:w-[50%] mysm:w-[50%] rounded-2xl shadow-[0px_8px_24px_rgba(149,157,165,0.3)] 
          "
        />
      </div>
      <ul
        className="lg:pt-5 lg:pb-5 lg:border-t-[1px] lg:border-b-[1px] lg:block md:flex md:justify-around md:items-center md:pl-2 w-[100%]
        mysm:grid mysm:grid-cols-3 
        md:gap-0
        mysm:gap-1
        
      "
      >
        <Li
          className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
            stylePath === "profile"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button
            className="flex items-center md:text-base mysm:text-sm"
            id="profile"
          >
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
          className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
            stylePath === "dashboard"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button
            className="flex items-center md:text-base mysm:text-sm"
            id="dashboard "
          >
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
          className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
            stylePath === "management"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button
            className="flex items-center md:text-base mysm:text-sm"
            id="management"
          >
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
          className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
            stylePath === "mycommu"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button
            className="flex items-center md:text-base mysm:text-sm"
            id="mycommu"
          >
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
          className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
            stylePath === "application"
              ? "md:border-blue-400 md:border-b-[2px]"
              : ""
          }`}
        >
          <button
            className="flex items-center md:text-base mysm:text-[13px]"
            id="paymented"
          >
            <Icon category={stylePath} id="paymented"></Icon>
            <p
              className={
                stylePath === "paymented" ? "text-blue-500 font-semibold" : ""
              }
            >
              <Link to={"/mypage/paymented"}>구매내역</Link>
            </p>
          </button>
        </Li>
        {teacherData?.type ? (
          <Li
            className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
              stylePath === "teacherpage"
                ? "md:border-blue-400 md:border-b-[2px]"
                : ""
            }`}
          >
            <button
              className="flex items-center md:text-base mysm:text-sm"
              id="teacherpage"
            >
              <Icon category={stylePath} id="teacherpage"></Icon>
              <p
                className={
                  stylePath === "teacherpage"
                    ? "text-blue-500 font-semibold"
                    : ""
                }
              >
                <Link to={"teacherpage"}>강의 관리</Link>{" "}
              </p>
            </button>
          </Li>
        ) : (
          <li
            className={`lg:mb-1 lg:border-none md:block mysm:flex mysm:justify-center ${
              stylePath === "home" ? "md:border-blue-400 md:border-b-[2px]" : ""
            }`}
          >
            <button
              className="md:p-2 mysm:px-3 mysm:py-1 mysm:my-1 mysm:flex items-center md:text-base mysm:text-[13px] border-[1px] rounded-lg
              lg:hidden
              text-[#efefef]
              font-extrabold
              bg-[#3B82F6]
              "
              id="teacherpage"
              onClick={handleClick}
            >
              강사신청
            </button>
          </li>
        )}
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
