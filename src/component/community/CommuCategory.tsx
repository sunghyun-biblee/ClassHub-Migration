import React from "react";
import styled from "styled-components";

interface ICommnuprop {
  setCategory: (category: string) => void;
  category: string;
}
export const CommuCategory = ({ setCategory, category }: ICommnuprop) => {
  const handleChangeCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
  };
  return (
    <div className="lg:mr-3 mysm:mr-0 w-[100%] ">
      <div
        className="md:block mysm:flex justify-between items-center 
      mysm:border-b-[1px]
      md:border-0
      md:pb-2
      mysm:pb-4
      "
      >
        <h1
          className="pl-3 text-xl font-semibold 
"
        >
          카테고리
        </h1>
        <select
          name="category"
          id="categoryfilter"
          onChange={handleChangeCategory}
          className="md:hidden mysm:block border-2 border-solid px-1 py-1 mr-3
          rounded-md focus:border-blue-300  outline-blue-400"
        >
          <option value="qna">질문 & 답변</option>
          <option value="study">스터디</option>
        </select>
      </div>
      <ul className="px-2 md:py-0 mysm:py-2 md:block mysm:hidden">
        <Li onClick={() => setCategory("qna")}>
          <span
            className={`cursor-pointer text-sm ${
              category === "qna" && "text-blue-500 font-bold"
            }`}
          >
            질문 & 답변
          </span>
        </Li>
        <Li onClick={() => setCategory("study")}>
          <span
            className={`cursor-pointer text-sm ${
              category === "study" && "text-blue-500 font-bold"
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
