import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import likes from "assets/img/likes.svg";
import commentImg from "assets/img/comment.svg";
import styled from "styled-components";
import { DetailProfile } from "./DetailProfile";
import { useTargetPost } from "../hooks/useTargetPost";
import { useTargetPostComment } from "../hooks/useTargetPostComment";

import { addComment, deleteComment, updateComment } from "../hooks/commentFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface commentType {
  commentId: number;
  communityId: number;
  editDate: string;
  favoriteCount: string;
  regDate: string;
  text: string;
  userId: number;
}
interface prevData {
  data: {
    data: commentType[];
  };
}

export const CommuDetail = () => {
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3], 10);
  const [comment, setComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { postData, isPostLoading, isPostError, postError } = useTargetPost(id);
  const { commentData, isCommentLoading, isCommentError, comentError } =
    useTargetPostComment(id);
  const userId = 5;
  const deleteMutation = useMutation({
    mutationKey: ["deleteComment"],
    mutationFn: deleteComment,
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetailComment", id],
      });
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetailComment", id],
      });
      // 낙관적 업데이트: 변경 전 데이터 저장
      const prevData: prevData | undefined = queryClient.getQueryData([
        "commuDetailComment",
        id,
      ]);
      if (prevData) {
        const updatedData = prevData.data.data.filter(
          (item) => item.commentId !== commentId
        );
        queryClient.setQueryData(["commuDetailComment", id], updatedData);
      }
      // 변경 전 데이터를 반환하여 롤백시 사용
      return { prevData };
    },
  });

  const addMutation = useMutation({
    mutationKey: ["addComment"],
    mutationFn: addComment,
    onSuccess: () => {
      setComment("");
    },
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetailComment", id],
      });
    },
    onMutate: async (commentObj) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetailComment", id],
      });
      const prevData: prevData | undefined = queryClient.getQueryData([
        "commuDetailComment",
        id,
      ]);
      if (prevData) {
        const newData = [...prevData.data.data, commentObj];
        queryClient.setQueryData(
          ["commuDetailComment", commentObj.communityId],
          newData
        );
      }

      return { prevData };
    },
  });

  if (isPostLoading && isCommentLoading) {
    return <div>Loading...</div>;
  }
  if (isPostError && isCommentError) {
    return (
      <div className="flex flex-col">
        <p>{postError?.message}</p>
        <p>{comentError?.message}</p>
      </div>
    );
  }
  const handleChangeEditComment = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditComment(e.target.value);
  };
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment.length < 1) {
      alert("댓글 내용이 없습니다");
      return;
    }
    const commentObj = {
      userId: 5,
      text: comment,
      communityId: postData?.communityId,
    };
    await addMutation.mutate(commentObj);
  };
  console.log(postData);
  return (
    <div
      className="
  lg:w-[1200px] mysm:w-[100vw]  lg:pt-[90px] md:pt-[80px] mysm:pt-[80px] mx-auto my-0"
    >
      {postData && (
        <section
          className="md:grid md:grid-cols-[4fr,1.5fr] lg:w-[1200px] 
        mysm:flex
        mysm:flex-col
        
        mysm:w-[100vw]"
        >
          <div className="lg:border-x-[1px]  md:border-r-[1px] lg:mr-5 mysm:pb-[50px]">
            <article className="md:pt-5 md:border-0 mysm:border-b-[1px]">
              <div className="mysm:block md:hidden px-1 md:border-0 mysm:border-b-[1px] ">
                <DetailProfile name={"admin"} category={"학생"}></DetailProfile>
              </div>
              <h1 className="py-5 px-5 text-2xl font-extrabold">
                {postData.title}
              </h1>
              <div className="flex justify-between md:px-5 mysm:pl-5 mysm:pr-10  pb-5 pt-2 text-gray-500 ">
                <p>2024-05-07</p>
                <div className="flex ">
                  <img src={likes} alt="likes" className="lg:w-5 md:w-5 mr-1" />
                  <p>{postData.favoriteCount}</p>
                </div>
              </div>
            </article>
            <Overview className="p-5 md:border-t-[1px]  border-b-[1px] border-solid">
              <div>
                <p>{postData.text}</p>
              </div>
              <div className="overflow-hidden">
                {postData.image.map((item: string) => (
                  <div className="flex flex-col">
                    {item !== "null" ? (
                      <img
                        src={`https://devproject.store${item}`}
                        alt="postImg"
                        className="pt-5"
                      ></img>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </div>
            </Overview>

            <article className="md:px-5 mysm:p-3">
              <div className="flex items-center">
                <h4 className="font-semibold text-gray-700">댓글</h4>
                <img src={commentImg} alt="comment" className="w-5  mr-2" />
                <p className="font-bold text-blue-600 text-lg border-b-2 border-blue-600 ">
                  {commentData?.data.length}
                </p>
              </div>

              <form
                className="py-5 flex justify-between items-end"
                onSubmit={handleCommentSubmit}
              >
                <textarea
                  name="commentWrite"
                  id="commentWrite"
                  placeholder="답변을 남겨주세요"
                  className="border-[1px] md:w-[90%] mysm:w-[85%] resize-none rounded-md focus:outline-blue-400 p-2 mr-1
                  shadow-[0px_8px_24px_rgba(149,157,165,0.2)]
                  h-[50px]
                  "
                  onChange={handleChangeComment}
                  value={comment}
                ></textarea>
                <button
                  className=" border-[1px] p-1 rounded-md bg-blue-400 text-white font-semibold shadow-[0px_8px_24px_rgba(149,157,165,0.2)] lg:w-20 md:w-14 text-center lg:text-base md:text-sm  mysm:px-2
                h-[50px]
                "
                >
                  등록
                </button>
              </form>
              <div id="commentList">
                <ul>
                  {commentData?.data.map((item: commentType) => (
                    <li className="border-b-[1px] py-1 px-3 flex flex-col my-1 justify-between">
                      <p className="flex items-center justify-between">
                        <strong className="py-2 mr-1">{item.userId}</strong>
                        <span className="text-gray-600 font-semibold">
                          {item.regDate}
                        </span>
                      </p>
                      <div className="flex justify-between pt-3 pb-1 items-end">
                        {isEdit && userId === item.userId ? (
                          <input
                            type="text"
                            value={editComment}
                            onChange={handleChangeEditComment}
                            className="border-[1px] py-1 px-2 rounded-md w-[70%]"
                          />
                        ) : (
                          <span className="py-1 w-[75%]">{item.text}</span>
                        )}
                        <div className="text-gray-500 font-semibold">
                          {userId === item.userId ? (
                            <>
                              <button
                                className="text-sm mr-2"
                                onClick={() => {
                                  updateComment(item.commentId);
                                  setEditComment(item.text);
                                  setIsEdit((prev) => !prev);
                                }}
                              >
                                {isEdit ? "확인" : "수정"}
                              </button>
                              <button
                                className="text-sm"
                                onClick={() =>
                                  deleteMutation.mutate(item.commentId)
                                }
                              >
                                삭제
                              </button>
                            </>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <div className="mysm:hidden md:block">
            <DetailProfile name={"admin"} category={"학생"}></DetailProfile>
          </div>
        </section>
      )}
    </div>
  );
};

const Overview = styled.article``;
{
  /* <Profile className="flex  lg:px-5 md:px-2 lg:py-8 md:py-5 flex-col ">
            <div
              className="flex justify-between border-[1px] lg:p-3 md:p-2 rounded-xl
            shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
            >
              <div className=" flex flex-col justify-between">
                <p className="font-bold">{data[0].name}</p>
                <p className="text-sm text-gray-400">{data[0].category}</p>
              </div>
              <img
                src={preview}
                alt=""
                className="lg:w-44 md:w-28
               h-auto object-cover rounded-2xl"
              />
            </div>
          </Profile> */
}
