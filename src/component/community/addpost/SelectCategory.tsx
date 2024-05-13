import React from "react";

interface ICommuCategory {
  mainCategory: string | undefined;
  setMainCategory: (mainCategory: string) => void;

  setSubCategory: (subCategory: string) => void;
}

export const SelectCategory = ({
  mainCategory,
  setMainCategory,

  setSubCategory,
}: ICommuCategory) => {
  const changeSubCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.id;
    setSubCategory(data);
  };
  const changeMainCategory = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const data = e.currentTarget.value;
    setMainCategory(data);
  };
  return (
    <div className=" z-10 overflow-hidden flex ">
      <div>
        <select
          name=""
          id=""
          value={mainCategory}
          onChange={changeMainCategory}
          className="border-[1px] rounded-md"
        >
          <option value="">---카테고리---</option>
          <option value="질문답변">질문답변</option>
          <option value="스터디">스터디</option>
        </select>
      </div>

      <div
        className={`ml-3 z-0 translate-x-[100px] transition-transform ${
          mainCategory && "translate-x-[-0%]"
        } `}
      >
        {mainCategory && mainCategory === "질문답변" && (
          <select
            name=""
            id=""
            value={mainCategory}
            onChange={changeSubCategory}
            className="border-[1px] rounded-md"
          >
            <option value="공부">공부</option>
            <option value="질문답변">고민</option>
            <option value="스터디">취미</option>
          </select>
        )}

        {mainCategory && mainCategory === "스터디" && (
          <select
            name=""
            id=""
            value={mainCategory}
            onChange={changeSubCategory}
            className="border-[1px] rounded-md"
          >
            <option value="모집중">모집중</option>
            <option value="모집완료">모집완료</option>
          </select>
        )}
      </div>
    </div>
  );
};
