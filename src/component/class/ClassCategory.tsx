import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";

interface ICategorySet {
  setCategory: (category: string) => void;
}

export const ClassCategory = ({ setCategory }: ICategorySet) => {
  const selectClick = (category: string): void => {
    setCategory(category);
  };
  return (
    <div className="lg:block md:hidden mysm:hidden">
      <ul className="mx-5">
        <Li>
          <span className="text-zinc-600" onClick={() => selectClick("all")}>
            전체강의
          </span>
        </Li>
        <Li>
          <span
            className="text-zinc-600"
            onClick={() => selectClick("devProgram")}
          >
            개발·프로그래밍
          </span>
        </Li>
        <Li>
          <span
            className="text-zinc-600"
            onClick={() => selectClick("devGame")}
          >
            게임 개발
          </span>
        </Li>
        <Li>
          <span className="text-zinc-600" onClick={() => selectClick("ai")}>
            인공지능
          </span>
        </Li>
        <Li>
          <span
            className="text-zinc-600"
            onClick={() => selectClick("security")}
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
    color: green;

    text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.1);
  }
`;
