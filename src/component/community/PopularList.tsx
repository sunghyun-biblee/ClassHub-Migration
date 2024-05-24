import React from "react";
import styled from "styled-components";
import { usePopularList } from "./hooks/usePopularList";
import { Icommuitem } from "./hooks/fetchCommuArray";
import { IcommunityItem } from "./ShowCommuList";

type IPopularProp = {
  category: string;
};

export const PopularList = ({ category }: IPopularProp) => {
  const { listData, listIsLoading, listIsError, listError } =
    usePopularList(category);

  if (listIsLoading) {
    return <p>로딩즁</p>;
  }
  if (listIsError) {
    return <p>{listError?.message}</p>;
  }
  console.log(listData);
  return (
    <ListContainer
      className={`p-3 absolute right-[1%] top-[11%] lg:block md:hidden mysm:hidden ${
        category === "addpost" && "lg:hidden"
      }`}
    >
      <h1 className="pb-1 font-extrabold">인기 게시글</h1>
      <ul>
        {listData &&
          listData.contents.map((item: IcommunityItem) => (
            <Li>
              <h3 className="text-sm mr-2 font-semibold">{item.title}</h3>
              <p className="text-[14px]">{"biblee"}</p>
            </Li>
          ))}
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
