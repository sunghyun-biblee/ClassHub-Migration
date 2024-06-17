import React, { useEffect } from "react";
import "./App.css";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { MainPage } from "./components/main/MainPage";
import { Nav } from "./components/navigtaion/Nav";
import { Mypage } from "./components/mypage/Mypage";
import { Community } from "./components/community/Community";
import { Class } from "./components/class/Class";
import { NaviMobileBottom } from "./components/navigtaion/NaviMobileBottom";
import { ClassDetail } from "./components/class/ClassDetail";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { CommuDetail } from "./components/community/CommunityDeatil/CommuDetail";
import { Dashboard } from "./components/mypage/dashboard/Dashboard";
import { MypageHome } from "./components/mypage/MypageHome";
import { Profile } from "./components/mypage/profile/Profile";
import { ManageMent } from "./components/mypage/management/ManageMent";
import { Application } from "./components/mypage/application/Application";
import { MyCommu } from "./components/mypage/myCommunity/MyCommu";
import { AuthProvider } from "./hooks/AuthProvider";
import { LoginPage } from "./components/login/LoginPage";
import { TeacherPage } from "./components/mypage/teacherPage/TeacherPage";
import { AddPost } from "./components/community/addpost/AddPost";
import { ShowCommuList } from "./components/community/ShowCommuList";
import { AddClass } from "./components/mypage/teacherPage/addclass/AddClass";
import { LearningPage } from "components/learningpage/LearningPage";
import { LearnPlayer } from "components/learningpage/learnplayer/LearnPlayer";
import { Footer } from "components/footer/Footer";
import { Cart } from "components/cart/Cart";
import { CartList } from "components/cart/CartList";
import { OrderPage } from "components/cart/OrderPage";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fetchUserData } from "hooks/fetchUserData";
import { ModifyPost } from "components/community/modifyPost/ModifyPost";
import { ClassTypeProvider } from "hooks/ClassTypeProvider";
import { SearchPage } from "components/class/searchpage/SearchPage";
import { PaymentedPage } from "components/cart/PaymentedPage";
import { EditClass } from "components/mypage/teacherPage/editClass/EditClass";
import { CookiesProvider } from "react-cookie";
import axios from "axios";

const cliendtId =
  "386437749459-jjvcsk0qiqdg429e7ihbkhu411b21l0c.apps.googleusercontent.com";
function App() {
  const text = async () => {
    try {
      const res = await axios.get("/api/community/mainpage");
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const { pathname } = useLocation();
  const pathData = pathname.split("/")[1];
  const footerHiddenArray = ["mypage", "signIn", "learnplay"];
  useEffect(() => {
    // 현재 경로에 맞는 타이틀 찾기
    const page = pages.find((p) => p.pathname === pathname);
    const subTitle = page ? page.title : ""; // pathname이 정의되지 않았거나 일치하는 페이지가 없을 때는 빈 문자열을 할당
    if (subTitle === "home") {
      document.title = "Classhub";
    } else {
      document.title = "Classhub - " + subTitle; // title 적용
    }
  }, [pathname]);

  const queryClient = new QueryClient();
  const LayOut = () => {
    const userData = localStorage.getItem("user");
    const loginuser = userData ? JSON.parse(userData) : {};
    const QueryClient = useQueryClient();
    if (loginuser.snsId) {
      QueryClient.prefetchQuery({
        queryKey: ["UserData", loginuser.snsId],
        queryFn: () => fetchUserData(loginuser.snsId),
      });
    }

    return (
      <div>
        <Nav />
        <Outlet />
        <NaviMobileBottom />
      </div>
    );
  };
  text();
  return (
    <CookiesProvider>
      <GoogleOAuthProvider clientId={cliendtId}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <ClassTypeProvider>
              <div className="min-h-[100vh] flex flex-col ">
                <Routes>
                  <Route path="/" element={<LayOut />}>
                    <Route index element={<MainPage />}></Route>
                    <Route path="mypage" element={<Mypage></Mypage>}>
                      <Route index element={<MypageHome />}></Route>
                      <Route
                        index
                        path="profile"
                        element={<Profile></Profile>}
                      ></Route>
                      <Route
                        index
                        path="management"
                        element={<ManageMent></ManageMent>}
                      ></Route>
                      <Route
                        index
                        path="paymented"
                        element={<Application></Application>}
                      ></Route>
                      <Route
                        index
                        path="dashboard"
                        element={<Dashboard></Dashboard>}
                      ></Route>
                      <Route
                        index
                        path="teacherpage"
                        element={<TeacherPage></TeacherPage>}
                      ></Route>

                      <Route
                        index
                        path="teacherpage/addClass"
                        element={<AddClass></AddClass>}
                      ></Route>
                      <Route
                        index
                        path="teacherpage/editClass/:classid"
                        element={<EditClass></EditClass>}
                      ></Route>
                      <Route
                        index
                        path="mycommu"
                        element={<MyCommu></MyCommu>}
                      ></Route>
                    </Route>
                    <Route path="community" element={<Community></Community>}>
                      {/* <Route index element={<ShowCommuList />}></Route> */}
                      <Route
                        index
                        path=":category"
                        element={<ShowCommuList />}
                      ></Route>
                      <Route
                        path="addpost"
                        element={<AddPost></AddPost>}
                      ></Route>
                      <Route
                        path="modifyPost/:category/:postId"
                        element={<ModifyPost></ModifyPost>}
                      ></Route>
                    </Route>
                    <Route path="class" element={<Class></Class>}></Route>
                    <Route
                      path="class/:search"
                      element={<SearchPage></SearchPage>}
                    ></Route>
                    <Route
                      path="classDetail/:classId"
                      element={<ClassDetail></ClassDetail>}
                    ></Route>
                    <Route
                      path="community/:category/:commuId"
                      element={<CommuDetail></CommuDetail>}
                    ></Route>
                    <Route path="signIn" element={<LoginPage />}></Route>
                    <Route
                      path="learn/:classId"
                      element={<LearningPage></LearningPage>}
                    ></Route>
                    <Route
                      path="learnplay/:classId/:videoId"
                      element={<LearnPlayer></LearnPlayer>}
                    ></Route>
                    <Route path="cart" element={<Cart></Cart>}>
                      <Route index element={<CartList></CartList>}></Route>
                      <Route
                        index
                        path="order"
                        element={<OrderPage></OrderPage>}
                      ></Route>
                      <Route
                        index
                        path="order/paymented/:ordersId"
                        element={<PaymentedPage></PaymentedPage>}
                      ></Route>
                      <Route index path=""></Route>
                    </Route>
                  </Route>
                </Routes>
              </div>
              {!footerHiddenArray.includes(pathData) && <Footer></Footer>}
              <ReactQueryDevtools></ReactQueryDevtools>
            </ClassTypeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </GoogleOAuthProvider>
    </CookiesProvider>
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
  {
    id: "pages9",
    pathname: "/mypage/teacherpage",
    title: "강사페이지",
  },
];
