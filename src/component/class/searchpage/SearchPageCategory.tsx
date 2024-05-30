import { useClassCategory } from "hooks/ClassTypeProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const SearchPageCategory = () => {
  const nav = useNavigate();
  const classType = useClassCategory();
  return (
    <div className="lg:block md:hidden mysm:hidden">
      <ul className="mx-5">
        <Li>
          <span
            className={` ${
              classType.classCategoryType === 0
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classType.updateCategory(0);
              nav("/class");
            }}
          >
            전체강의
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classType.classCategoryType === 1
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classType.updateCategory(1);
              nav("/class");
            }}
          >
            개발·프로그래밍
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classType.classCategoryType === 2
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classType.updateCategory(2);
              nav("/class");
            }}
          >
            게임 개발
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classType.classCategoryType === 3
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classType.updateCategory(3);
              nav("/class");
            }}
          >
            인공지능
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classType.classCategoryType === 4
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classType.updateCategory(4);
              nav("/class");
            }}
          >
            보안·네트워크
          </span>
        </Li>
      </ul>
    </div>
  );
};
const Li = styled.li`
  padding: 15px 10px;
  cursor: pointer;
  font-weight: bold;

  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  :hover {
    color: #8cb7da;

    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;
