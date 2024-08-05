import React from "react";
import { DetailProfile } from "./DetailProfile";

import { CommuInfo } from "../hooks/useTargetPost";
import { useAuth } from "hooks/AuthProvider";
import axios from "api/axios";
import requests from "api/requests";
import likes from "assets/img/likes.svg";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { prevData } from "./CommuDetail";
import { Link, useLocation } from "react-router-dom";
import { Heart } from "./Heart";
import { CHPostData } from "../hooks/useFbPostListQuery";

interface updateLikeType {
  user_id: number;
  favorite_type_id: number;
}
export const CommuPost = (props: CHPostData) => {
  const {
    createAt,
    photos,
    postCategory,
    postText,
    postTitle,
    userId,
    userName,
    timeStamp,
    docId,
  } = props;
  const { userData, userIsLoading } = useAuth();
  const queryClient = useQueryClient();
  const { pathname } = useLocation();
  const category = pathname.split("/")[2];

  const handleUpdateLike = async (userId: number, favoritId: number) => {
    const requstBody: updateLikeType = {
      user_id: userId,
      favorite_type_id: favoritId,
    };
    try {
      await axios.post(requests.like.postLike, requstBody);
    } catch (error) {
      console.log(error);
    }
  };

  // const compareLike = (postData: CommuInfo, userId: number) => {
  //   const isUserLinked = (array: number[], userId: number): boolean => {
  //     return array.includes(userId);
  //   };
  //   const result = isUserLinked(postData.likeUsers, userId);

  //   switch (result) {
  //     case false:
  //       return (
  //         <div
  //           onClick={() => {
  //             if (userData && userData.userId) {
  //               updateLikeMutation.mutate({
  //                 userId: userData.userId,
  //                 favoritId: postData.communityId,
  //               });
  //             } else {
  //               return alert("로그인 후 이용가능합니다");
  //             }
  //           }}
  //         >
  //           <Heart></Heart>
  //         </div>
  //       );
  //     case true:
  //       return (
  //         <img
  //           src={likes}
  //           alt="like"
  //           className="lg:w-5 md:w-5 mr-1 h-5 cursor-pointer"
  //           onClick={() =>
  //             updateLikeMutation.mutate({
  //               userId: userData.userId,
  //               favoritId: postData.communityId,
  //             })
  //           }
  //         />
  //       );
  //     default:
  //       return;
  //   }
  // };

  // const updateLikeMutation = useMutation({
  //   mutationFn: ({
  //     userId,
  //     favoritId,
  //   }: {
  //     userId: number;
  //     favoritId: number;
  //   }) => handleUpdateLike(userId, favoritId),
  //   onSettled: () => {
  //     return queryClient.invalidateQueries({
  //       queryKey: ["commuDetail", postData.communityId],
  //     });
  //   },
  //   onMutate: async (postObj) => {
  //     await queryClient.cancelQueries({
  //       queryKey: ["commuDetail", postData.communityId],
  //     });
  //     const prevData: CommuInfo | undefined = queryClient.getQueryData([
  //       "commuDetail",
  //       postData.communityId,
  //     ]);

  //     await queryClient.setQueryData(
  //       ["commuDetail", postData.communityId],
  //       (oldData: CommuInfo | undefined) => {
  //         if (oldData) {
  //           const newData = oldData.likeUsers.includes(postObj.userId);
  //           if (!newData) {
  //             const newLikeUser = [...oldData.likeUsers, postObj.userId];
  //             return { ...oldData, likeUsers: newLikeUser };
  //           }
  //         }
  //         return oldData;
  //       }
  //     );

  //     return { prevData };
  //   },
  // });
  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  return (
    <>
      <article className="md:pt-5 md:border-0 mysm:border-b-[1px]">
        <div className="mysm:block md:hidden px-1 md:border-0 mysm:border-b-[1px] ">
          {/* {postData && (
            <DetailProfile role={"학생"} postData={postData}></DetailProfile>
          )} */}
        </div>
        <div className="flex justify-between items-center">
          <h1 className="py-5 px-5 text-2xl font-extrabold">{postTitle}</h1>
          {/* {!userIsLoading &&
            userData &&
            userData.userId === postData.userId && (
              <Link
                to={`/community/modifyPost/${category}/${postData.communityId}`}
                className="text-gray-400 font-semibold pr-5"
              >
                수정
              </Link>
            )} */}
        </div>
        <div className="flex justify-between md:px-5 mysm:px-5  pb-5 pt-2 text-gray-500 ">
          <p>{createAt}</p>
          <div className="flex items-center ">
            <div className="block">
              {/* {compareLike(postData, userData && userData.userId)} */}
            </div>
            <p>{1}</p>
          </div>
        </div>
      </article>
      <article className="p-5 md:border-t-[1px]  border-b-[1px] border-solid">
        <div>
          <p>{postText}</p>
        </div>
        <div className="overflow-hidden">
          {photos.map((src: string, index: number) => (
            <div className="flex flex-col" key={index + "img"}>
              {src !== "null" && (
                <img src={src} alt="postImg" className="pt-5"></img>
              )}
            </div>
          ))}
        </div>
      </article>
    </>
  );
};
