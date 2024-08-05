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
import { CHPostData } from "./hooks/useFbPostListQuery";
import { useSetRecoilState } from "recoil";
import { postDetailCategory, postDetailId } from "recoilAtoms/CommuState";

export const CommnuItem = (props: CHPostData) => {
  const {
    createAt,
    photos,
    postCategory,
    postText,
    postTitle,
    userId,
    userName,
    docId,
  } = props;
  const { pathname } = useLocation();
  const category = pathname.split("/")[2];

  const setDetailId = useSetRecoilState(postDetailId);
  const setDetailCategory = useSetRecoilState(postDetailCategory);

  const nav = useNavigate();
  const handleClick = () => {
    setDetailId(docId);
    setDetailCategory(postCategory);
    nav(`/community/${category}/${docId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["commuDetail", docId],
    queryFn: () => selectCommuinfo(docId, category),
  });
  queryClient.prefetchQuery({
    queryKey: ["commuDetailComment", docId],
    queryFn: () => selectCommuCommentinfo(docId),
  });
  const renderCategory = (communityType: string) => {
    switch (communityType) {
      case "qna":
        return "질문 & 답변";

      case "study":
        return "모집중";

      case "completed":
        return "모집완료";
      default:
        break;
    }
  };
  return (
    <div>
      <div onClick={handleClick} className="flex justify-between">
        <div className="flex flex-col justify-between w-[80%]">
          <div className="flex ">
            <Span className="mr-4 lg:min-w-[6rem]">
              {renderCategory(postCategory)}
            </Span>
            <h1 className="font-extrabold w-[calc(100%-7rem)] overflow-hidden text-ellipsis whitespace-nowrap ">
              {postTitle}
            </h1>
          </div>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[400px] mysm:max-w-[300px]">
            {postText}
          </p>
        </div>

        <div className="flex w-[20%] justify-end px-1">
          <div className="flex  items-end flex-col justify-between gap-3">
            <p className="px-1">{userName}</p>
            <div className="flex  pt-2 min-w-[50px]">
              <div className="flex md:mr-7 mysm:mr-4 cursor-pointer items-center">
                <img
                  src={likes}
                  alt=""
                  className="w-4 h-auto md:mr-2 mysm:mr-1"
                />
                <strong>{1}</strong>
              </div>
              <div className="flex cursor-pointer items-center">
                <img
                  src={comment}
                  alt=""
                  className="w-4 h-auto md:mr-2 mysm:mr-1"
                />
                <strong>{1}</strong>
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
