import React from "react";

interface IheaderProp {
  type: string;
}
export const Header = ({ type }: IheaderProp) => {
  return (
    <header className="flex justify-between items-center md:px-2 mysm:px-0 md:pt-4 mysm:pt-2 md:pb-5 mysm:pb-2">
      <h1 className="md:text-xl font-semibold mysm:text-xl">
        {type === "management" ? "학습관리" : "게시물 관리"}
      </h1>
      <select
        id="select"
        className="md:hidden mysm:block border-[1px] border-solid px-1 py-[1px]
        rounded-sm 
        "
      >
        <option value="all">전체</option>
        <option value="qna">질문 & 답변</option>
        <option value="review">수강평</option>
        <option value="study">스터디</option>
      </select>

      <ul
        className=" md:text-base md:flex mysm:hidden
mysm:text-sm"
      >
        <li className="md:px-4 mysm:px-[5px] hover:cursor-pointer text-blue-950 text-md font-semibold">
          {type === "management" ? "전체" : "전체"}
        </li>
        <li className="md:px-4 mysm:px-[5px] hover:cursor-pointer text-blue-950 text-md font-semibold">
          {type === "management" ? "강의" : "질문 & 답변"}
        </li>

        {type === "management" ? (
          <li className="md:px-4 mysm:px-[5px] hover:cursor-no-drop text-gray-400">
            멘토링
          </li>
        ) : (
          <>
            <li className="md:px-4 mysm:px-[5px] hover:cursor-pointer text-blue-950 text-md font-semibold">
              수강평{" "}
            </li>
            <li className="md:px-4 mysm:px-[5px] hover:cursor-pointer text-blue-950 text-md font-semibold">
              스터디{" "}
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
