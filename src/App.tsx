import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MainPage } from "./component/main/MainPage";
import { Nav } from "./component/navigtaion/Nav";
import { Mypage } from "./component/mypage/Mypage";
import { Community } from "./component/community/Community";
import { Class } from "./component/class/Class";
import { NaviMobileBottom } from "./component/navigtaion/NaviMobileBottom";

function App() {
  const queryClient = new QueryClient();
  const LayOut = () => {
    return (
      <div>
        <Nav />
        <Outlet />
        <NaviMobileBottom />
      </div>
    );
  };
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<MainPage />}></Route>
          <Route path="mypage" element={<Mypage></Mypage>}></Route>
          <Route path="community" element={<Community></Community>}></Route>
          <Route path="class" element={<Class></Class>}>
            <Route path=":classId"></Route>
          </Route>
        </Route>
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
