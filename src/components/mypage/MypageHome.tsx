import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "hooks/AuthProvider";
import React from "react";

export const MypageHome = () => {
  const { userData, userIsLoading, userIsError, userError } = useAuth();
  if (userIsLoading) {
    return <div>로딩중</div>;
  }
  if (userIsError) {
    return <span>{userError?.message}</span>;
  }

  return (
    <div
      className="border-[1px] lg:m-0 mysm:mx-1 mysm:mt-3 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
    flex flex-col
    "
    >
      <div className="flex justify-between items-center lg:px-5 lg:py-4 mysm:py-3 mysm:px-4">
        <h1 className="text-xl font-semibold border-b-2 w-[100%] py-1 px-1">
          소개
        </h1>
      </div>
      <div className=" lg:min-h-[400px]  md:min-h-[50dvh] mysm:min-h-[40dvh] flex ">
        {userData && userData.introduce ? (
          <div className="w-[100%] mx-1 mb-4 ">
            <p className="text-xl font-medium lg:px-5 mysm:px-4 py-2  text-black">
              {userData.introduce}
            </p>
          </div>
        ) : (
          <div className="flex justify-center flex-col text-center w-[100%]">
            <p className="text-xl font-semibold pb-2 text-gray-950/90">
              아직 작성된 소개가 없어요
            </p>
            <p className="text-sm text-gray-400">
              자신을 소개하거나, 어필 해보는 건 어떨까요?
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
