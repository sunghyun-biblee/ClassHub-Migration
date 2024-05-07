import React from "react";

export const GradeUpBtn = () => {
  return (
    <div
      className="lg:flex lg:justify-between    lg:flex-row md:flex-col 
    mysm:flex-col 
   "
    >
      <button className=" border-none rounded-lg lg:p-2 md:p-1  lg:text-sm md:text-[12px]  bg-blue-500 text-gray-100 lg:font-semibold ">
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
