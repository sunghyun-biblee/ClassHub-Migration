import React from "react";
import { ILoginProps } from "./LoginPage";
import { SNSlogin } from "./SNSlogin";

export const SignIn = ({ setPage }: ILoginProps) => {
  return (
    <div
      className="flex flex-col  h-[100%] relative md:pb-0 mysm:pb-7
    "
    >
      <div className="md:grid md:grid-cols-2">
        <h1 className="text-2xl font-extrabold px-2 text-left ">로그인</h1>
        <h1 className="text-2xl font-bold  text-left md:block mysm:hidden">
          SNS로그인
        </h1>
      </div>
      <div className="md:grid md:grid-cols-2 mysm:flex mysm:flex-col">
        <div className=" flex flex-col md:items-start lg:py-5 md:py-0 lg:m-0 md:mt-2">
          <div className="flex flex-col lg:w-56 py-2  px-1">
            <input
              type="text"
              className="my-1 py-2 px-3 rounded-lg bg-[#efefef] focus:outline-sky-700"
              placeholder="아이디를 입력하세요"
            />

            <input
              type="text"
              className="my-1 
            py-2 px-3 rounded-lg bg-[#efefef] focus:outline-sky-700"
              placeholder="비밀번호를 입력하세요"
            />
            <button className="my-1 p-2 lg:w-54 bg-[#002A5F] rounded-lg">
              로그인
            </button>
          </div>
        </div>
        <SNSlogin></SNSlogin>
      </div>
      <div
        className="w-[100%] flex mysm:justify-end absolute bottom-0 right-0
      lg:px-0 md:px-3
      "
      >
        <button
          className="text-gray-300/90 cursor-pointer
           lg:text-base 
           mysm:text-sm text-center pr-5"
          onClick={() => setPage(0)}
        >
          처음으로
        </button>
        <button
          className="text-gray-300/90 cursor-pointer text-sm text-center "
          onClick={() => setPage(2)}
        >
          회원가입
        </button>
      </div>
    </div>
  );
};
