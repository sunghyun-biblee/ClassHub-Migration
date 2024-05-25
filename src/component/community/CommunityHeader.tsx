import React from "react";

export const CommunityHeader = () => {
  return (
    <div
      className="bg-[#333B3D] lg:mt-[85px] md:mt-[70px] mysm:mt-[70px] max-w-[100vw] 
  lg:block  md:block mysm:block  "
    >
      <div className=" mysm:max-w-[100vw] lg:max-w-[1200px]  flex justify-start items-center py-3 lg:px-5 mx-auto my-0 h-[100px]">
        <h1 className="text-white/90 font-bold text-2xl   lg:py-1 lg:px-0 md:pl-5 mysm:pl-3 mysm:py-2">
          커뮤니티 페이지
          <p className="py-2 text-sm">
            다양한 의견을 나눠보고, 스터디도 구해봐요~
          </p>
        </h1>
      </div>
    </div>
  );
};
