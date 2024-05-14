import React from "react";

interface ICommuCategory {
  mainCategory: string | undefined;
  setMainCategory: (mainCategory: string) => void;
  subcategory: string | undefined;
  setSubCategory: (subCategory: string) => void;
}

export const SelectCategory = ({
  mainCategory,
  setMainCategory,
  subcategory,
  setSubCategory,
}: ICommuCategory) => {
  const changeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.value;
    setSubCategory(data);
  };
  const changeMainCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.value;
    setMainCategory(data);
  };
  return (
    <div className=" z-10 overflow-hidden flex mx-1">
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

      <div
        className={`ml-3 z-0 translate-x-[100%] transition-transform ${
          mainCategory && "translate-x-[0%]"
        } `}
      >
        {mainCategory && mainCategory === "질문답변" && (
          <select
            name=""
            id=""
            value={subcategory && subcategory}
            onChange={changeSubCategory}
            className="border-[1px] rounded-md"
          >
            <option value="1">---카테고리---</option>
            <option value="공부">공부</option>
            <option value="질문답변">고민</option>
            <option value="스터디">취미</option>
          </select>
        )}

        {mainCategory && mainCategory === "스터디" && (
          <select
            name=""
            id=""
            value={subcategory}
            onChange={changeSubCategory}
            className="border-[1px] rounded-md"
          >
            <option value="1">---카테고리---</option>
            <option value="모집중">모집중</option>
            <option value="모집완료" disabled>
              모집완료
            </option>
          </select>
        )}
      </div>
    </div>
  );
};
