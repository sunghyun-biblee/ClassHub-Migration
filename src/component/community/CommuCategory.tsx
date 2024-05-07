import React from "react";
import styled from "styled-components";

interface ICommnuprop {
  setCategory: (category: string) => void;
  category: string;
}
export const CommuCategory = ({ setCategory, category }: ICommnuprop) => {
  return (
    <div className="lg:mr-3 mysm:mr-0 w-[100%] ">
      <h1 className="pl-2 text-lg font-semibold ">카테고리</h1>
      <ul className="px-2 py-2">
        <Li onClick={() => setCategory("qna")}>
          <span
            className={`cursor-pointer ${
              category === "qna" && "text-green-500 font-bold"
            }`}
          >
            질문 & 답변
          </span>
        </Li>
        <Li onClick={() => setCategory("study")}>
          <span
            className={`cursor-pointer ${
              category === "study" && "text-green-500 font-bold"
            } `}
          >
            스터디
          </span>
        </Li>
      </ul>
    </div>
  );
};

const Li = styled.li`
  padding: 8px 4px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  margin-right: 20px;
`;
