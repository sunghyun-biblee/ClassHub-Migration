import React from "react";
import { useNavigate } from "react-router-dom";

export const TeacherHeader = () => {
  const nav = useNavigate();
  return (
    <div className="flex justify-between">
      <h1 className="text-2xl font-semibold text-indigo-950 px-2">
        등록한 강의
      </h1>
      <button
        onClick={() => nav("/mypage/teacherpage/addClass")}
        className="px-3 py-[6px] border-[1px] rounded-lg bg-[#3B82F6] text-white font-semibold text-sm"
      >
        강의등록
      </button>
    </div>
  );
};
