import React from "react";
import { SearchButton } from "./NaviMobile";
import styled from "styled-components";

import { useClassCategory } from "hooks/ClassTypeProvider";
import { useNavigate } from "react-router-dom";

interface IMobileCategory {
  handleClick: () => void;
}
export const NaviMobileCategory = ({ handleClick }: IMobileCategory) => {
  const nav = useNavigate();
  const classType = useClassCategory();

  const handleClickChangeCategory = (value: number) => {
    try {
      classType.updateCategory(value);
    } catch (error) {
      console.log(error);
      return;
    } finally {
      nav(`/class`);
    }
  };
  return (
    <>
      <div className=" relative md:flex justify-center items-center p-3">
        <input
          placeholder="검색어를 입력해주세요"
          type="text"
          className="border-2 rounded-md w-[280px] py-1 pl-[8px] text-[14px] focus:outline-green-600"
        />
        <SearchButton className="button"></SearchButton>
      </div>
      <ul className="px-2">
        <Li onClick={() => handleClickChangeCategory(0)}>
          <span>전체 강의</span>
        </Li>
        <Li onClick={() => handleClickChangeCategory(1)}>
          <span>개발·프로그래밍</span>
        </Li>
        <Li onClick={() => handleClickChangeCategory(2)}>
          <span>게임 개발</span>
        </Li>
        <Li onClick={() => handleClickChangeCategory(3)}>
          <span>인공지능</span>
        </Li>
        <Li onClick={() => handleClickChangeCategory(4)}>
          <span>보안·네트워크</span>
        </Li>
        <Li>
          <p onClick={handleClick}>닫기</p>
        </Li>
      </ul>
    </>
  );
};

const Li = styled.li`
  padding: 15px 10px;
  cursor: pointer;
  font-weight: 600;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    color: #3ba4f9;
    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;
