import React from "react";
import { DetailProfile } from "./DetailProfile";

import { CommuInfo } from "../hooks/useTargetPost";
import { useAuth } from "hooks/AuthProvider";
import axios from "api/axios";
import requests from "api/requests";
import likes from "assets/img/likes.svg";
import { Heart } from "./Heart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { prevData } from "./CommuDetail";
import { Link } from "react-router-dom";
interface IPostProp {
  postData: CommuInfo;
}
interface updateLikeType {
  user_id: number;
  favorite_type_id: number;
}
export const CommuPost = ({ postData }: IPostProp) => {
  const { userData } = useAuth();
  const queryClient = useQueryClient();

  const handleUpdateLike = async (userId: number, favoritId: number) => {
    const requstBody: updateLikeType = {
      user_id: userId,
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
            onClick={() =>
              updateLikeMutation.mutate({
                userId: userData.userId,
                favoritId: postData.communityId,
              })
            }
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
            onClick={() =>
              updateLikeMutation.mutate({
                userId: userData.userId,
                favoritId: postData.communityId,
              })
            }
          />
        );
      default:
        return "";
    }
  };

  const updateLikeMutation = useMutation({
    mutationFn: ({
      userId,
      favoritId,
    }: {
      userId: number;
      favoritId: number;
    }) => handleUpdateLike(userId, favoritId),
    onSettled: () => {
      return queryClient.invalidateQueries({
        queryKey: ["commuDetail", postData.communityId],
      });
    },
    onMutate: async (postObj) => {
      await queryClient.cancelQueries({
        queryKey: ["commuDetail", postData.communityId],
      });
      const prevData: CommuInfo | undefined = queryClient.getQueryData([
        "commuDetail",
        postData.communityId,
      ]);

      await queryClient.setQueryData(
        ["commuDetail", postData.communityId],
        (oldData: CommuInfo | undefined) => {
          if (oldData) {
            const newData = oldData.likeUsers.includes(postObj.userId);
            if (!newData) {
              const newLikeUser = [...oldData.likeUsers, postObj.userId];
              return { ...oldData, likeUsers: newLikeUser };
            }
          }
          return oldData;
        }
      );

      return { prevData };
    },
  });
  console.log(postData);
  const handlePostDelete = () => {};
  return (
    <>
      <article className="md:pt-5 md:border-0 mysm:border-b-[1px]">
        <div className="mysm:block md:hidden px-1 md:border-0 mysm:border-b-[1px] ">
          <DetailProfile category={"학생"}></DetailProfile>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="py-5 px-5 text-2xl font-extrabold">
            {postData.title}
          </h1>
          {postData.userId === userData.userId && (
            <div className="text-gray-400 font-semibold">
              <Link to={`/community/modifyPost/${postData.communityId}`}>
                수정
              </Link>
              <button className="px-3" onClick={() => handlePostDelete}>
                삭제
              </button>
            </div>
          )}
        </div>
        <div className="flex justify-between md:px-5 mysm:pl-5 mysm:pr-10  pb-5 pt-2 text-gray-500 ">
          <p>{postData.regDate}</p>
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
      </article>
    </>
  );
};
