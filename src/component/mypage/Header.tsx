import React from "react";

interface IheaderProp {
  type: string;
}
export const Header = ({ type }: IheaderProp) => {
  return (
    <header className="flex justify-between md:px-5 mysm:px-2 pt-3 md:pb-5 mysm:pb-3">
      <h1 className="text-xl font-semibold">
        {type === "management" ? "학습관리" : "게시물 관리"}
      </h1>

      <ul className="flex">
        <li className="md:px-4 mysm:px-2 hover:cursor-pointer text-blue-950 text-md font-semibold">
          {type === "management" ? "전체" : "전체"}
        </li>
        <li className="md:px-4 mysm:px-2 hover:cursor-pointer text-blue-950 text-md font-semibold">
          {type === "management" ? "강의" : "질문 & 답변"}
        </li>

        {type === "management" ? (
          <li className="md:px-4 mysm:px-2 hover:cursor-no-drop text-gray-400">
            멘토링
          </li>
        ) : (
          <>
            <li className="md:px-4 mysm:px-2 hover:cursor-pointer text-blue-950 text-md font-semibold">
              수강평{" "}
            </li>
            <li className="md:px-4 mysm:px-2 hover:cursor-pointer text-blue-950 text-md font-semibold">
              스터디{" "}
            </li>
          </>
        )}
      </ul>
    </header>
  );
};
