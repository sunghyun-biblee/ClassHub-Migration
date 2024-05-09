import React from "react";

export const MypageHome = () => {
  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
    flex flex-col
    "
    >
      <div className="flex justify-between items-center lg:px-5 lg:py-4 mysm:py-3 mysm:px-4">
        <h1 className="text-xl font-bold">소개</h1>
        <button
          className="border-[1px] rounded-lg lg:px-3 lg:py-2 
        mysm:px-2 mysm:py-2
        text-sm font-semibold"
        >
          작성하기
        </button>
      </div>
      <div className=" lg:min-h-[400px]  md:min-h-[50dvh] mysm:min-h-[40dvh] flex justify-center items-center">
        <div className="flex justify-center flex-col text-center">
          <p className="text-xl font-semibold pb-2 text-gray-950/90">
            아직 작성된 소개가 없어요
          </p>
          <p className="text-sm text-gray-400">
            자신을 소개하거나, 어필 해보는 건 어떨까요?
          </p>
        </div>
      </div>
    </div>
  );
};
