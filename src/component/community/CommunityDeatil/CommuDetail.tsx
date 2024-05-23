import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import likes from "assets/img/likes.svg";
import commentImg from "assets/img/comment.svg";
import styled from "styled-components";
import { DetailProfile } from "./DetailProfile";
import { CommuInfo, useTargetPost } from "../hooks/useTargetPost";
import { useTargetPostComment } from "../hooks/useTargetPostComment";

import { addComment, deleteComment, updateComment } from "../hooks/commentFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Heart } from "./Heart";
import { useAuth } from "hooks/AuthProvider";
import axios from "api/axios";
import requests from "api/requests";

export interface commentType {
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
  const { userData } = useAuth();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3], 10);
  const [comment, setComment] = useState<string>("");
  const [editComment, setEditComment] = useState<string>("");
  const [editCommentId, setEditCommentId] = useState<string | number>();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { postData, isPostLoading, isPostError, postError } = useTargetPost(id);
  const { commentData, isCommentLoading, isCommentError, comentError } =
    useTargetPostComment(id);
  const userId = 5;
  const [isLike, setIsLike] = useState<boolean>(false);

  const CommentUpdateMutation = useMutation({
    mutationKey: ["updateComment"],
    mutationFn: (requestObj: commentType) => updateComment(requestObj),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetailComment", id],
      });
    },
    onMutate: async (requestObj) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetailComment", id],
      });

      const prevData: prevData | undefined = queryClient.getQueryData([
        "commuDetailComment",
        id,
      ]);
      queryClient.setQueryData(
        ["commuDetailComment", id],
        (prevData: prevData | undefined) => {
          console.log(prevData);
          if (prevData) {
            const updateData = prevData.data.data.map((item) => {
              console.log(item);
              return item.commentId === requestObj.commentId
                ? { ...item, ...requestObj }
                : item;
            });
            console.log(updateData);
            queryClient.setQueryData(["commuDetailComment", id], updateData);
          }
        }
      );

      return { prevData };
    },
  });
  const CommentDeleteMutation = useMutation({
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

      return { prevData };
    },
  });

  const ComentAddMutation = useMutation({
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
        console.log(newData);
        queryClient.setQueryData(
          ["commuDetailComment", commentObj.communityId],
          newData
        );
      }

      return { prevData };
    },
  });
  console.log(postData);
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
  const handleUpdateComment = (item: commentType) => {
    if (editComment) {
      const requestObj: commentType = { ...item, text: editComment };
      CommentUpdateMutation.mutate(requestObj);
      setIsEdit(false);
    }
  };
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
    await ComentAddMutation.mutate(commentObj);
  };

  const handleAddLike = async (userid: number, favoritId: number) => {
    const requstBody = {
      user_id: userid,
      favorite_type_id: favoritId,
    };
    try {
      const res = await axios.post(requests.like.postLike, requstBody);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const compareLike = (postData: CommuInfo, userId: number) => {
    const isUserLinked = (array: number[], userId: number): boolean => {
      return array.includes(userId);
    };

    const result = isUserLinked(postData.likeUsers, userId);
    switch (result) {
      case true:
        return (
          <div
            onClick={() => handleAddLike(userData.userId, postData.communityId)}
          >
            <Heart></Heart>
          </div>
        );
      case false:
        return (
          <img
            src={likes}
            alt="like"
            className="lg:w-5 md:w-5 mr-1 h-5 cursor-pointer"
            onClick={() => handleAddLike(userData.userId, postData.communityId)}
          />
        );
      default:
        return "";
    }
  };
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
                <div className="flex items-center ">
                  {userData && compareLike(postData, userData.userId)}

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
                        {isEdit &&
                        userId === item.userId &&
                        item.commentId === editCommentId ? (
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
                              {isEdit ? (
                                <>
                                  <button
                                    className="text-sm mr-2"
                                    onClick={() => {
                                      handleUpdateComment(item);
                                    }}
                                  >
                                    확인
                                  </button>
                                  <button
                                    className="text-sm"
                                    onClick={() =>
                                      // CommentDeleteMutation.mutate(item.commentId)

                                      setIsEdit(false)
                                    }
                                  >
                                    취소
                                  </button>
                                </>
                              ) : (
                                <>
                                  <button
                                    className="text-sm mr-2"
                                    onClick={() => {
                                      setEditCommentId(item.commentId);
                                      setEditComment(item.text);
                                      setIsEdit((prev) => !prev);
                                    }}
                                  >
                                    수정
                                  </button>
                                  <button
                                    className="text-sm"
                                    onClick={
                                      () =>
                                        CommentDeleteMutation.mutate(
                                          item.commentId
                                        )
                                      // console.log("")
                                    }
                                  >
                                    삭제
                                  </button>
                                </>
                              )}
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
