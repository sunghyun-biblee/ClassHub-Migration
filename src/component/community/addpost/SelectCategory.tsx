import React from "react";

interface ICommuCategory {
  mainCategory: string | undefined;
  setMainCategory: (mainCategory: string) => void;
}

export const SelectCategory = ({
  mainCategory,
  setMainCategory,
}: ICommuCategory) => {
  const changeMainCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.value;
    setMainCategory(data);
  };
  return (
    <div className=" z-10 overflow-hidden flex mx-1 items-center">
      <div className="flex">
        <h1 className="font-semibold">카테고리</h1>
        <select
          name=""
          id=""
          value={mainCategory === null ? "1" : mainCategory}
          onChange={changeMainCategory}
          className="border-[1px] rounded-md mysm:ml-3"
        >
          <option value="1">---카테고리---</option>
          <option value="질문답변">질문답변</option>
          <option value="스터디">스터디</option>
        </select>
      </div>
    </div>
  );
};
