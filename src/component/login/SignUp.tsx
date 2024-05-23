import React, { useState } from "react";
import { ILoginProps } from "./LoginPage";
import { SNSlogin } from "./SNSlogin";
import styled from "styled-components";
import { KakaoLogin } from "./KakaoLogin";
import { GoogleLoginBtn } from "./GoogleLogin";

export const SignUp = ({ setPage }: ILoginProps) => {
  const [userName, setUserName] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [userPassWord, setuserPassWord] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [userPhone, setUserPhone] = useState<string>("");
  const [userNickName, setUserNickName] = useState<string>("");

  const handleChangeuserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };
  const handleChangeuserId = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(e.target.value);
  };
  const handleChangeuserPassWord = (e: React.ChangeEvent<HTMLInputElement>) => {
    setuserPassWord(e.target.value);
  };
  const handleChangeuserEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };
  const handleChangeuserPhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserPhone(e.target.value);
  };
  const handleChangeuserNickName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserNickName(e.target.value);
  };

  return (
    <div>
      <div className="lg:grid lg:grid-cols-[1fr,0.5fr] gap-2">
        <form
          action="submit"
          encType="multipart/form-data"
          className="flex flex-col"
        >
          <h1 className="px-2 pb-4">회원가입</h1>
          <ul className="w-[100%] flex flex-col pb-3 ">
            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center">
              <span>이름</span>
              <input
                type="text"
                name="name"
                value={userName}
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                placeholder="이름을 입력해주세요"
                onChange={handleChangeuserName}
              />
            </Li>
            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center">
              <span>아이디</span>
              <input
                type="text"
                name="userId"
                value={userId}
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                placeholder="아이디를 입력해주세요"
                onChange={handleChangeuserId}
              />
            </Li>
            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center ">
              <span>비밀번호</span>
              <input
                type="password"
                name="userPassword"
                value={userPassWord}
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                placeholder="비밀번호를 입력해주세요"
                onChange={handleChangeuserPassWord}
              />
            </Li>
            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center">
              <span>이메일</span>
              <input
                type="email"
                name="userEmail"
                value={userEmail}
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                placeholder="이메일을 입력해주세요"
                onChange={handleChangeuserEmail}
              />
            </Li>
            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center">
              <span>전화번호</span>
              <input
                type="tel"
                name="userPhone"
                value={userPhone}
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                placeholder={` "-" 빼고를 입력해주세요`}
                onChange={handleChangeuserPhone}
              />
            </Li>

            <Li className="py-2 px-2 lg:flex-row mysm:flex-col mysm:items-baseline lg:items-center ">
              <span>닉네임 </span>
              <input
                type="text"
                name="userNickName"
                value={userNickName}
                placeholder="선택사항입니다"
                className="rounded-[4px] text-sm lg:w-[73%] mysm:w-[100%]  px-2 py-2 text-black"
                onChange={handleChangeuserNickName}
              />
            </Li>
          </ul>
          <input
            type="submit"
            value={"가입하기"}
            className="px-1 py-1  mx-2 mb-3 rounded-lg bg-sky-400"
          />
        </form>
        <div className="flex flex-col justify-between items-end h-[100%]">
          <div className="w-[100%] h-[100%] flex flex-col justify-end items-end ">
            <div className="mysm:block md:hidden">
              <SNSlogin></SNSlogin>
            </div>
            <div className=" w-[100%] lg:flex-col md:flex-row justify-around items-end mysm:hidden md:flex pb-5 lg:pt-0 md:pt-5 lg:border-none md:border-t-2">
              <KakaoLogin></KakaoLogin>
              <GoogleLoginBtn></GoogleLoginBtn>
            </div>
            <div className="flex justify-between px-4">
              <button onClick={() => setPage(0)} className="mr-5">
                처음으로
              </button>
              <button onClick={() => setPage(1)}>로그인</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Li = styled.li`
  display: flex;

  justify-content: space-between;
  input:focus {
    outline: #5cdcec solid;
    border-radius: 4px;
  }
`;
