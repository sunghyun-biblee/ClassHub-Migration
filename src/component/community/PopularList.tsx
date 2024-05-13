import React from "react";
import styled from "styled-components";

type IPopularProp = {
  category: string;
};

export const PopularList = ({ category }: IPopularProp) => {
  const title = "인기글 입니다.";
  const title2 = "안녕하세요 전 최근 ^";
  const name = "admin";
  return (
    <ListContainer
      className={`p-3 absolute right-[1%] top-[11%] lg:block md:hidden mysm:hidden ${
        category === "addpost" && "lg:hidden"
      }`}
    >
      <h1 className="pb-1">인기 게시글</h1>
      <ul>
        <Li>
          <h3 className="text-sm mr-2">{title}1</h3>
          <p className="text-[14px]">{name}</p>
        </Li>
        <Li>
          <h3 className="text-sm mr-2">{title}2</h3>
          <p className="text-[14px]">{name}</p>
        </Li>
        <Li>
          <h3 className="text-sm mr-2">
            {title2.length > 10 ? title2.slice(0, 10) + "..." : title2}
          </h3>
          <p className="text-[14px]">{name}</p>
        </Li>
        <Li>
          <h3 className="text-sm mr-2">{title}4</h3>
          <p className="text-[14px]">{name}</p>
        </Li>
        <Li>
          <h3 className="text-sm mr-2">{title}5</h3>
          <p className="text-[14px]">{name}</p>
        </Li>
      </ul>
    </ListContainer>
  );
};

const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 8px;
  height: 50px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  margin: 5px 0;
  background-color: rgba(246, 246, 246, 0.8);
`;

const ListContainer = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.4);
  border-radius: 10px;
  background-color: rgba(255, 238, 238, 0.7);
`;
