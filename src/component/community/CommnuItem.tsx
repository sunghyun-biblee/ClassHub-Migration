import React from "react";
import styled from "styled-components";
import likes from "../../assets/img/likes.svg";
import comment from "../../assets/img/comment.svg";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { selectCommuinfo } from "./hook/fetchCommuArray";

interface ICommnuItemprop {
  item: {
    id: number;
    title: string;
    name: string;
    likes: string;
    category: string;
    comment: string;
    overview: string;
  };
}
export const CommnuItem = ({ item }: ICommnuItemprop) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/community/post/${item.id}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["commuDeatil", item.id],
    queryFn: () => selectCommuinfo(item.id),
  });
  return (
    <div>
      <div onClick={handleClick}>
        <div className="flex ">
          <Span className="mr-10">{item.category}</Span>
          <h1 className="font-extrabold">{item.title}</h1>
        </div>
        <div className="flex  pt-5 relative">
          <span className="mr-10">{item.name}</span>
          <p>
            {item.overview?.length > 20
              ? item.overview.slice(0, 20)
              : item.overview}
          </p>
          <div className="flex absolute right-0 items-center">
            <div className="flex mr-3 cursor-pointer">
              <img src={likes} alt="" className="w-[16px] h-auto mr-1" />
              <p>{item.likes}</p>
            </div>
            <div className="flex cursor-pointer">
              <img src={comment} alt="" className="w-[16px] h-auto mr-1" />
              <p>{item.comment}</p>
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
