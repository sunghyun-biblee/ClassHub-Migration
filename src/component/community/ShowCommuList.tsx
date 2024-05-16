import React, { useState } from "react";
import styled from "styled-components";
import { PageNation } from "component/class/PageNation";
import { CommnuItem } from "./CommnuItem";

import { useQuery } from "@tanstack/react-query";
import { fetchCommuList } from "./hook/fetchCommuArray";
import { useLocation, useNavigate } from "react-router-dom";
import { PopularList } from "./PopularList";
import { useGetpathname } from "./hook/getPathname";

export interface IcommunityItem {
  commentCount: number;
  communityId: number;
  communityType: string;
  editDate: string | null;
  favoriteCount: number;
  image: string | null;
  regDate: string;
  text: string;
  title: string;
  userId: number;
}
export const ShowCommuList = () => {
  const category = useGetpathname();

  const nav = useNavigate();
  const [page, setPage] = useState(1);
  const postLimit = 5;
  const renderText = () => {
    switch (category) {
      case undefined:
        return <h1 className="text-lg font-semibold ">질문 & 답변</h1>;
      case "qna":
        return <h1 className="text-lg font-semibold ">질문 & 답변</h1>;
      case "study":
        return <h1 className="text-lg font-semibold ">스터디</h1>;
      default:
        break;
    }
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["question", page],
    queryFn: fetchCommuList,
  });

  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치
  console.log(data?.data.data.contents);
  return (
    <div className="md:mr-3">
      <div
        className="flex justify-between items-center md:px-0 mysm:px-3
      md:pt-0
      mysm:pt-6
      
      "
      >
        {renderText()}
        <select
          id="select"
          className={` border-2 border-solid px-1 py-1
        rounded-md focus:border-blue-300  outline-blue-400
        ${category === "study" ? "block" : "hidden"}`}
        >
          <option value="all">전체</option>
          <option value="unfinish">모집중</option>
          <option value="finish">모집완료</option>
        </select>
      </div>
      <div className="flex  justify-between  mysm:mt-4 md:px-0 mysm:px-2">
        <div className="flex w-[88%] ">
          <input
            type="text"
            className="rounded-lg border-[1px] border-solid w-[100%] text-sm pl-3 py-3 focus:outline-blue-400"
            placeholder="검색어를 입력해주세요"
          />
          <Button className="w-20 mx-1 bg-blue-400">검색</Button>
        </div>
        <Button
          className="w-20 bg-gray-600"
          onClick={() => nav("/community/addpost")}
        >
          글쓰기
        </Button>
      </div>
      <article>
        <ul className="md:pt-10 mysm:pt-6">
          {data?.data.data.contents.map(
            (item: IcommunityItem, index: number) => (
              <li
                className="my-2 py-4 px-2 border-[1px] border-solid rounded-md mx-1"
                key={item.userId + "AZ" + index}
              >
                <CommnuItem item={item}></CommnuItem>
              </li>
            )
          )}
        </ul>
      </article>
      <aside>
        <PopularList category={category}></PopularList>
      </aside>
      {/* <PageNation
        // listLength={data ? data.length : 0}
        postLimit={postLimit}
        page={page}
        setPage={setPage}
      ></PageNation> */}
    </div>
  );
};

const Button = styled.button`
  padding: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  color: #efefef;
  font-weight: 600;
`;
