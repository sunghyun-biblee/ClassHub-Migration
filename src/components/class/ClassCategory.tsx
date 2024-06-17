import { useClassCategory } from "hooks/ClassTypeProvider";
import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ICategorySet {
  categoryType: number;
}

export const ClassCategory = ({ categoryType }: ICategorySet) => {
  const classtype = useClassCategory();

  return (
    <div className="lg:block md:hidden mysm:hidden">
      <ul className="mx-5">
        <Li>
          <span
            className={` ${
              classtype.classCategoryType === 0
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classtype.updateCategory(0);
            }}
          >
            전체강의
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classtype.classCategoryType === 1
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classtype.updateCategory(1);
            }}
          >
            개발·프로그래밍
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classtype.classCategoryType === 2
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classtype.updateCategory(2);
            }}
          >
            게임 개발
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classtype.classCategoryType === 3
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classtype.updateCategory(3);
            }}
          >
            인공지능
          </span>
        </Li>
        <Li>
          <span
            className={` ${
              classtype.classCategoryType === 4
                ? "text-[#1386e5] font-extrabold"
                : "text-zinc-600"
            }`}
            onClick={() => {
              classtype.updateCategory(4);
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
