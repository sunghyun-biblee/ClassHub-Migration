import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "./component/main/MainPage";
import { Nav } from "./component/navigtaion/Nav";
import { Mypage } from "./component/mypage/Mypage";
import { Community } from "./component/community/Community";
import { Class } from "./component/class/Class";
import { NaviMobileBottom } from "./component/navigtaion/NaviMobileBottom";
import { ClassDetail } from "./component/class/ClassDetail";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { classProp } from "./component/main/PreviewClass";
import { CommuDetail } from "./component/community/CommunityDeatil/CommuDetail";
import { Dashboard } from "./component/mypage/dashboard/Dashboard";
import { MypageHome } from "./component/mypage/MypageHome";
import { Profile } from "./component/mypage/profile/Profile";
import { ManageMent } from "./component/mypage/management/ManageMent";
import { Application } from "./component/mypage/application/Application";
import { MyCommu } from "./component/mypage/myCommunity/MyCommu";
import { AuthProvider } from "./hook/AuthProvider";
import { LoginPage } from "./component/login/LoginPage";

interface Ipages {
  id: string;
  pathname: string;
  title: string;
}
function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    // 현재 경로에 맞는 타이틀 찾기
    const page = pages.find((p) => p.pathname === pathname);
    const subTitle = page ? page.title : ""; // pathname이 정의되지 않았거나 일치하는 페이지가 없을 때는 빈 문자열을 할당
    console.log(page);
    console.log(subTitle);
    if (subTitle === "home") {
      document.title = "Classhub";
    } else {
      document.title = "Classhub - " + subTitle; // title 적용
    }
  }, [pathname]);
  const queryClient = new QueryClient();
  const LayOut = () => {
    return (
      <div className="relative ">
        <Nav />
        <Outlet />
        <NaviMobileBottom />
      </div>
    );
  };
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LayOut />}>
            <Route index element={<MainPage />}></Route>
            <Route path="mypage" element={<Mypage></Mypage>}>
              <Route index element={<MypageHome />}></Route>
              <Route index path="profile" element={<Profile></Profile>}></Route>
              <Route
                index
                path="management"
                element={<ManageMent></ManageMent>}
              ></Route>
              <Route
                index
                path="application"
                element={<Application></Application>}
              ></Route>
              <Route
                index
                path="dashboard"
                element={<Dashboard></Dashboard>}
              ></Route>
              <Route index path="mycommu" element={<MyCommu></MyCommu>}></Route>
            </Route>
            <Route path="community" element={<Community></Community>}></Route>
            <Route path="class" element={<Class></Class>}></Route>
            <Route
              path="class/:classId"
              element={<ClassDetail></ClassDetail>}
            ></Route>
            <Route
              path="community/:commuId"
              element={<CommuDetail></CommuDetail>}
            ></Route>
            <Route path="signIn" element={<LoginPage />}></Route>
          </Route>
        </Routes>
        <ReactQueryDevtools></ReactQueryDevtools>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
const pages = [
  {
    id: "pages1",
    pathname: "/",
    title: "home",
  },
  {
    id: "pages2",
    pathname: "/mypage",
    title: "마이페이지",
  },
  {
    id: "pages3",
    pathname: "/mypage/profile",
    title: "프로필",
  },
  {
    id: "pages4",
    pathname: "/mypage/management",
    title: "학습관리",
  },
  {
    id: "pages5",
    pathname: "/mypage/application",
    title: "수강신청 관리",
  },
  {
    id: "pages6",
    pathname: "/mypage/dashboard",
    title: "대시보드",
  },
  {
    id: "pages7",
    pathname: "/mypage/mycommu",
    title: "나의 게시글 관리",
  },
  {
    id: "pages8",
    pathname: "/community",
    title: "커뮤니티",
  },
  {
    id: "pages9",
    pathname: "/class",
    title: "강의",
  },
];
