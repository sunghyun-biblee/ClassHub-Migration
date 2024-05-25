import React from "react";
import styled from "styled-components";
import likes from "assets/img/likes.svg";
import comment from "assets/img/comment.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import {
  selectCommuCommentinfo,
  selectCommuinfo,
} from "./hooks/fetchCommuArray";
import { IcommunityItem } from "./ShowCommuList";

interface ICommnuItemprop {
  item: IcommunityItem;
}
export const CommnuItem = ({ item }: ICommnuItemprop) => {
  const { pathname } = useLocation();
  const category = pathname.split("/")[2];
  console.log("여기는", category);
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/community/${category}/${item.communityId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["commuDetail", item.communityId],
    queryFn: () => selectCommuinfo(item.communityId, category),
  });
  queryClient.prefetchQuery({
    queryKey: ["commuDetailComment", item.communityId],
    queryFn: () => selectCommuCommentinfo(item.communityId),
  });
  const renderCategory = (communityType: string) => {
    switch (communityType) {
      case "1":
        return "질문 & 답변";

      case "2":
        return "스터디 모집중";

      case "3":
        return "스터디 모집완료";
      default:
        break;
    }
  };
  return (
    <div>
      <div onClick={handleClick} className="flex justify-between">
        <div className="flex flex-col justify-between w-[100%]">
          <div className="flex ">
            <Span className="mr-5 ">{renderCategory(item.communityType)}</Span>
            <h1 className="font-extrabold">{item.title}</h1>
          </div>
          <p>{item.text?.length > 20 ? item.text.slice(0, 20) : item.text}</p>
        </div>

        <div className="flex">
          <div className="flex  items-end flex-col justify-between gap-3">
            <p className="px-1">{item.userId}</p>
            <div className="flex px-2 pt-2">
              <div className="flex mr-7 cursor-pointer items-center">
                <img src={likes} alt="" className="w-[16px] h-auto mr-2" />
                <strong>{item.favoriteCount}</strong>
              </div>
              <div className="flex cursor-pointer items-center">
                <img src={comment} alt="" className="w-[16px] h-auto mr-2" />
                <strong>{item.commentCount}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Span = styled.span`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: gray;

  text-align: center;
  color: white;
  padding: 3px 8px;
  font-size: 14px;
`;
