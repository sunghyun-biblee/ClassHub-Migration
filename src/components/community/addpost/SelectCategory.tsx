import React from "react";

interface ICommuCategory {
  mainCategory: string | null;
  setMainCategory: (mainCategory: string) => void;
  createAt?: number | null;
}

export const SelectCategory = ({
  mainCategory,
  setMainCategory,
  createAt,
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
          name="categoory"
          value={mainCategory === null ? "none" : mainCategory}
          onChange={changeMainCategory}
          className="border-[1px] rounded-md mysm:ml-3"
        >
          <option value="none">---카테고리---</option>
          <option value="qna">질문답변</option>
          <option value="study">스터디</option>
          <option value="comepleted" disabled={createAt ? false : true}>
            스터디 모집완료
          </option>
        </select>
      </div>
    </div>
  );
};
