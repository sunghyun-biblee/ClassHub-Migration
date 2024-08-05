import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { PageNation } from "components/class/PageNation";
import { CommnuItem } from "./CommnuItem";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchCommuList, fetchQuestionList } from "./hooks/fetchCommuArray";
import { useNavigate } from "react-router-dom";
import { PopularList } from "./PopularList";
import { useGetpathname } from "./hooks/getPathname";
import { useCommuList } from "./hooks/useCommuList";
import { CHPostData, useFbPostListQuery } from "./hooks/useFbPostListQuery";

export interface IcommunityItem {
  commentCount: number;
  communityId: number;
  communityType: string;
  editDate: string | null;
  favoriteCount: number;
  image: string | null;
  imageIds: number[];
  likeUsers: number[];
  nickname: string;
  regDate: string;
  text: string;
  title: string;
  userId: number;
}

export const ShowCommuList = () => {
  const postLimit = 5;
  const category = useGetpathname();
  const queryClient = useQueryClient();
  const nav = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [searchType, setSearchType] = useState<number>(0);

  const { postData, loading, noMore, plusLoading } =
    useFbPostListQuery(postLimit);
  console.log(postData);

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

  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  const handleChangeSearchType = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(parseInt(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    console.log("hello");
    e.preventDefault();
  };

  return (
    <div className="md:mr-3">
      <div
        className="flex justify-between items-center md:px-0 mysm:px-3 md:pt-0
  mysm:pt-6"
      >
        {renderText()}
        <select
          id="select"
          onChange={handleChangeSearchType}
          value={searchType}
          className={` border-2 border-solid px-1 py-1
    rounded-md focus:border-blue-300  outline-blue-400
    ${category === "study" ? "block" : "hidden"}`}
        >
          <option value="">전체</option>
          <option value="2">모집중</option>
          <option value="3">모집완료</option>
        </select>
      </div>
      <div className="flex  justify-between  mysm:mt-4 md:px-0 mysm:px-2">
        <form className="flex w-[88%]" onSubmit={handleSubmit}>
          <input
            type="text"
            className="rounded-lg border-[1px] border-solid w-[100%] text-sm pl-3 py-3 focus:outline-blue-400"
            placeholder="검색어를 입력해주세요"
            value={search}
            onChange={handleChangeSearch}
          />
          <Button className="w-20 mx-1 bg-blue-400" type="submit">
            검색
          </Button>
        </form>
        <Button
          className="w-20 bg-gray-600"
          onClick={() => nav("/community/addpost")}
        >
          글쓰기
        </Button>
      </div>
      <article>
        <ul className="md:pt-10 mysm:pt-6">
          {postData.map((post: CHPostData, index) => (
            <li
              className="my-2 py-4 px-2 border-[1px] border-solid rounded-md mx-1"
              key={post.docId}
            >
              <CommnuItem {...post}></CommnuItem>
            </li>
          ))}
          {/* {postData.map((item: IcommunityItem, index: number) => (
            <li
              className="my-2 py-4 px-2 border-[1px] border-solid rounded-md mx-1"
              key={
                item.communityId + new Date().getSeconds().toString() + index
              }
            >
              <CommnuItem item={item}></CommnuItem>
            </li>
          ))} */}
        </ul>
      </article>
      <aside>
        <PopularList category={category}></PopularList>
      </aside>
      {/* {renderPageNation()} */}
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
