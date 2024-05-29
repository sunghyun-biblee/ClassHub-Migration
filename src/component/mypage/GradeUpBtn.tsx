import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import requests from "api/requests";
import axios from "api/axios";
import { useNavigate } from "react-router-dom";

export const GradeUpBtn = () => {
  const nav = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("user");
    nav("/");
  };
  return (
    <div
      className="lg:flex lg:justify-between    lg:flex-row md:flex-col 
    mysm:flex-col 
   "
    >
      <button
        className=" border-none rounded-lg lg:p-2 md:p-1  lg:text-sm md:text-[12px]  bg-blue-500 text-gray-100 lg:font-semibold "
        onClick={handleClick}
      >
        강사 신청
      </button>
      <button
        className=" border-none  rounded-lg lg:p-2 lg:m-0 md:mt-1 md:p-1 lg:text-sm md:text-[12px]  bg-gray-400 text-black-300 font-semibold"
        onClick={handleLogOut}
      >
        로그아웃
      </button>
    </div>
  );
};

let newTdata = {
  id: "teacher1",
  type: true,
};

export const handleClick = async () => {
  const tdataString = localStorage.getItem("teacher");
  const tdata = tdataString ? JSON.parse(tdataString) : null;
  if (tdata) {
    localStorage.removeItem("teacher");
  } else {
    localStorage.setItem("teacher", JSON.stringify(newTdata));
  }
  const requestBody = {
    userId: 2,
    name: "성현",
    field: "개발프로그래밍",
    text: "해줘",
    userType: "1",
    requestStatus: "1",
  };
  try {
    const res = await axios.post(requests.lecture.addInstructor, requestBody);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
};
