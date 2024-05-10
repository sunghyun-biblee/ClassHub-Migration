import React from "react";

export const ApplicationNav = () => {
  return (
    <div className="my-5 border-[1px] rounded-md">
      <ul
        className="grid 
      
      md:grid-cols-[0.5fr,1.5fr,0.7fr,0.7fr,0.5fr,0.5fr]
      mysm:grid-cols-[0.5fr,1.3fr,0.7fr,0.7fr,0.5fr,0.8fr]
       py-[5px] text-center text-blue-950 font-semibold md:text-base mysm:text-sm"
      >
        <li className="px-[5px]">관심</li>
        <li className="px-[5px]">강의 이름</li>
        <li className="px-[5px]">강사명</li>
        <li className="px-[5px]">가격</li>
        <li className="px-[5px] md:block mysm:hidden">구매여부</li>
        <li className="px-[5px] md:hidden mysm:block">구매</li>
        <li className="px-[5px] ">상세정보</li>
      </ul>
    </div>
  );
};
