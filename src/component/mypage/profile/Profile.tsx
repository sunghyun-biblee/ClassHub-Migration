import React, { useState } from "react";
import myIMG from "../../../assets/img/preview.jpg";
import styled from "styled-components";
export const Profile = () => {
  const [isEdit, setIseEdit] = useState(false);
  const email = "admin20240509@classhub.co.kr123123123123123";

  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
  flex flex-col
  md:mt-2
  "
    >
      <section className="md:py-10 md:px-5 mysm:py-5 mysm:px-3 flex flex-col gap-y-3">
        <article className="flex md:flex-row mysm:flex-col md:gap-5 mysm:gap-2 ">
          <img
            src={myIMG}
            alt="profileIMG"
            className="md:w-[40%] mysm:w-[55%] rounded-3xl shadow-[0px_8px_24px_rgba(149,157,165,0.3)]"
          />

          <ul className="md:p-3 mysm:p-2  flex flex-col justify-between relative">
            <ul className="flex flex-col justify-between">
              <li className="py-5 border-b-[1px]">
                <span className="text-md font-semibold">닉네임</span>
                <span className="shadow-[0px_1px_10px_rgba(149,157,165,0.3)] md:ml-7 mysm:ml-7 border-[1px] py-1 px-3 rounded-md">
                  admin
                </span>
              </li>
              <li className="py-5 border-b-[1px] flex ">
                <span className="text-md font-semibold">이메일</span>
                <p
                  className="shadow-[0px_1px_10px_rgba(149,157,165,0.3)] md:ml-7 mysm:ml-7 border-[1px] py-1 px-3 rounded-md  max-h-[31px] overflow-hidden whitespace-nowrap 
              md:max-w-[280px] mysm:max-w-[260px]
                text-ellipsis"
                >
                  {email}
                </p>
              </li>
              <li className="py-5 border-b-[1px] ">
                <span className="text-md font-semibold">전화번호</span>
                <span className="shadow-[0px_1px_10px_rgba(149,157,165,0.3)] ml-3 border-[1px] py-1 px-3 rounded-md">
                  010-0000-0000
                </span>
              </li>
            </ul>
            <li>
              <div
                className="justify-between mysm:flex 
                md:flex-row
                mysm:flex-col
                md:static
                md:text-base
                mysm:text-[12px]
                mysm:absolute mysm:top-[-80px]
              right-0 "
              >
                <button
                  className="border-[1px] py-1 px-2.5 rounded-xl
                shadow-[0px_1px_10px_rgba(149,157,165,0.3)]
               md:max-w-[100%]
               mysm:max-w-26
               md:font-normal
               mysm:font-semibold
             
                "
                >
                  비밀번호 수정 및 찾기
                </button>
                <button
                  className="border-[1px] py-1 px-2.5 rounded-xl
                shadow-[0px_1px_10px_rgba(149,157,165,0.3)] bg-red-300 font-semibold
                md:max-w-[100%]
               mysm:max-w-26
               md:mt-0
               mysm:mt-4
                "
                >
                  회원탈퇴
                </button>
              </div>
            </li>
          </ul>
        </article>
        <article>
          <div className="p-3 mt-3 flex flex-col justify-between">
            <div className="flex justify-between items-center pb-4">
              <h1 className="text-lg font-semibold">소개</h1>
              <button className="border-[1px] py-1 px-2 rounded-lg text-sm">
                수정하기
              </button>
            </div>
            <p className="p-3 border-[1px] lg:min-h-[10dvh] md:min-h-[20dvh] overflow-y-scroll lg:max-h-[15dvh] md:max-h-[30dvh] rounded-l-lg">
              작성된 소개가 없습니다
            </p>
          </div>
        </article>
      </section>
    </div>
  );
};
