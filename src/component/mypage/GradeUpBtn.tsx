import { useQueryClient } from "@tanstack/react-query";
import React from "react";

export const GradeUpBtn = () => {
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
        className=" border-none cursor-no-drop rounded-lg lg:p-2 lg:m-0 md:mt-1 md:p-1 lg:text-sm md:text-[12px]  bg-gray-400 text-gray-300"
        disabled
      >
        멘토 신청
      </button>
    </div>
  );
};

let newTdata = {
  id: "teacher1",
  type: true,
};

export const handleClick = () => {
  const tdataString = localStorage.getItem("teacher");
  const tdata = tdataString ? JSON.parse(tdataString) : null;
  if (tdata) {
    localStorage.removeItem("teacher");
  } else {
    localStorage.setItem("teacher", JSON.stringify(newTdata));
  }
};
