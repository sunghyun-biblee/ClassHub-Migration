import React from "react";
import google from "assets/img/SNSIMG/web_light_sq_na.svg";
export const GoogleLogin = () => {
  return (
    <div id="google" className="flex rounded-md">
      <img src={google} alt="" className="lg:my-1 h-[40px]" />
      <button
        className=" z-10 bg-[#FFFFFF] px-2
      border-y-[1px] border-r-[1px] border-[#747775] rounded-r-[4px]
      text-gray-500 translate-x-[-5px]
      font-semibold
      text-[12px]
      lg:my-1
      w-[8.1rem]
      max-h-[40px]
      "
      >
        Google 로그인
      </button>
    </div>
  );
};
