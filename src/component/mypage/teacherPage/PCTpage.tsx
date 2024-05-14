import React from "react";
import { useNavigate } from "react-router-dom";

export const PCTpage = () => {
  const nav = useNavigate();
  return (
    <div className="mysm:hidden md:flex">
      <button onClick={() => nav("/mypage/teacherpage/addClass")}>
        강의등록
      </button>
    </div>
  );
};
