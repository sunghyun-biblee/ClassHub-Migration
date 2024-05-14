import React from "react";

export const MobileTPage = () => {
  return (
    <div className=" md:hidden mysm:flex flex-col items-center p-5 h-[300px] justify-around">
      <h1>모바일 환경에서는 지원하지 않습니다</h1>
      <h2>pc환경에서 등록 부탁드립니다</h2>
      <h3 className="text-sm font-semibold">
        {"( Chrome 브라우저에서 이용하시는 것을 추천드립니다 )"}
      </h3>
    </div>
  );
};
