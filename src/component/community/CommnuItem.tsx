import React from "react";
import styled from "styled-components";
import likes from "assets/img/likes.svg";
import comment from "assets/img/comment.svg";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { selectCommuinfo } from "./hooks/fetchCommuArray";
import { IcommunityItem } from "./ShowCommuList";

interface ICommnuItemprop {
  item: IcommunityItem;
}
export const CommnuItem = ({ item }: ICommnuItemprop) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/community/post/${item.communityId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["commuDeatil", item.communityId],
    queryFn: () => selectCommuinfo(item.communityId),
  });
  return (
    <div>
      <div onClick={handleClick} className="flex justify-between">
        <div className="flex flex-col justify-between w-[100%]">
          <div className="flex ">
            <Span className="mr-5">{item.communityType}</Span>
            <h1 className="font-extrabold">{item.title}</h1>
          </div>
          <p>{item.text?.length > 20 ? item.text.slice(0, 20) : item.text}</p>
        </div>

        <div className="flex">
          <div className="flex  items-end flex-col justify-between gap-3">
            <p className="px-1">{item.userId}</p>
            <div className="flex px-2 pt-2">
              <div className="flex mr-7 cursor-pointer items-center">
                <img src={likes} alt="" className="w-[16px] h-auto mr-1" />
                <p>{item.favoriteCount}</p>
              </div>
              <div className="flex cursor-pointer items-center">
                <img src={comment} alt="" className="w-[16px] h-auto mr-1" />
                <p>1</p> {/* 댓글 수 수정*/}
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
  width: 50px;
  text-align: center;
  color: white;
  padding: 3px 8px;
  font-size: 14px;
`;
