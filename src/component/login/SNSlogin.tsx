import React from "react";
import google from "../../assets/img/SNSIMG/web_light_sq_na.svg";
import kakao from "../../assets/img/SNSIMG/kakao_login_PC.png";
export const SNSlogin = () => {
  return (
    <div className="py-2 md:border-0 mysm:border-t-2">
      <h1
        className="text-left md:py-3 md:px-2 mysm:py-2 mysm:px-1
       text-xl font-semibold md:hidden mysm:block"
      >
        SNS로그인
      </h1>
      <div
        className="flex
    md:flex-col
    mysm:flex-row
    md:items-start
    md:justify-normal
    mysm:justify-around
    lg:py-5
    mysm:py-3 "
      >
        <div id="kakao">
          <img
            src={kakao}
            alt=""
            className="h-[40px] cursor-pointer lg:my-1 md:mb-2"
          />
        </div>
        <div id="google" className="flex rounded-md">
          <img src={google} alt="" className="lg:my-1" />
          <button
            className=" z-10 bg-[#FFFFFF] px-2
      border-y-[1px] border-r-[1px] border-[#747775] rounded-r-[4px]
      text-gray-500 translate-x-[-5px]
      font-semibold
      text-sm
      lg:my-1
      w-[8.1rem]
      "
          >
            Google 로그인
          </button>
        </div>
      </div>
    </div>
  );
};
