import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import commentImg from "assets/img/comment.svg";
import { DetailProfile } from "./DetailProfile";
import { useTargetPost } from "../hooks/useTargetPost";
import { useTargetPostComment } from "../hooks/useTargetPostComment";
import { addComment } from "../hooks/commentFn";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/AuthProvider";
import { CommentItem } from "./CommentItem";
import { CommuPost } from "./CommuPost";

export interface commentType {
  commentId: number;
  communityId: number;
  editDate: string;
  favoriteCount: string;
  regDate: string;
  text: string;
  userId: number;
  nickname: string;
}
export interface prevData {
  data: commentType[];
}

export const CommuDetail = () => {
  const { userData, userIsLoading } = useAuth();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3], 10);
  const category = pathname.split("/")[2];
  console.log("디테일", category);
  const [comment, setComment] = useState<string>("");
  const { postData, isPostLoading, isPostError, postError } = useTargetPost(
    id,
    category
  );
  const { commentData, isCommentLoading, isCommentError, comentError } =
    useTargetPostComment(id);
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
      await queryClient.setQueryData(
        ["commuDetailComment", commentObj.communityId],
        (oldData: prevData | undefined) => {
          if (oldData) {
            const newData = [...oldData?.data, commentObj];
            console.log(newData);
            return newData;
          }
          return oldData;
        }
      );

      return { prevData };
    },
  });
  if (postData) {
    console.log(postData);
  }
  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };
  const handleCommentSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!userData) {
      alert("로그인이 필요한 서비스 입니다");
      return;
    }

    if (comment.length < 1) {
      alert("댓글 내용이 없습니다");
      return;
    }

    const commentObj = {
      userId: userData.userId,
      text: comment,
      communityId: postData?.communityId,
    };
    await ComentAddMutation.mutate(commentObj);
  };

  if (isPostLoading && isCommentLoading && userIsLoading) {
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

  return (
    <div
      className="
  lg:w-[1200px] mysm:w-[100vw]  lg:pt-[90px] md:pt-[80px] mysm:pt-[80px] mx-auto my-0"
    >
      {postData && (
        <section className="md:grid md:grid-cols-[4fr,1.5fr] lg:w-[1200px] mysm:flex mysm:flex-col mysm:w-[100vw]">
          <div className="lg:border-x-[1px]  md:border-r-[1px] lg:mr-5 mysm:pb-[50px]">
            <CommuPost postData={postData}></CommuPost>
            <article className="md:px-5 mysm:p-3">
              <div className="flex items-center">
                <h4 className="font-semibold text-gray-700">댓글</h4>
                <img src={commentImg} alt="comment" className="w-5  mr-2" />
                <p className="font-bold text-blue-600 text-lg border-b-2 border-blue-600 ">
                  {commentData?.length}
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
                  {commentData?.map((item: commentType, index: number) => (
                    <CommentItem
                      item={item}
                      id={id}
                      key={item.commentId + index}
                      postUserId={postData.userId}
                    ></CommentItem>
                  ))}
                </ul>
              </div>
            </article>
          </div>
          <div className="mysm:hidden md:block">
            {userIsLoading ? (
              ""
            ) : (
              <DetailProfile
                category={"학생"}
                postData={postData}
              ></DetailProfile>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

{
  /* <li
className="border-b-[1px] py-1 px-3 flex flex-col my-1 justify-between"
key={item.commentId + `${index}`}
>
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
</li> */
}

{
  /* <article className="md:pt-5 md:border-0 mysm:border-b-[1px]">
<div className="mysm:block md:hidden px-1 md:border-0 mysm:border-b-[1px] ">
  <DetailProfile
    name={userData.name}
    category={"학생"}
  ></DetailProfile>
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
<article className="p-5 md:border-t-[1px]  border-b-[1px] border-solid">
<div>
  <p>{postData.text}</p>
</div>
<div className="overflow-hidden">
  {postData.image.map((item: string, index: number) => (
    <div className="flex flex-col" key={index + "img"}>
      {item !== "null" && (
        <img
          src={`https://devproject.store${item}`}
          alt="postImg"
          className="pt-5"
        ></img>
      )}
    </div>
  ))}
</div>
</article> */
}
