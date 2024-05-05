import React from "react";
import styled from "styled-components";

interface IcategoryProp {
  category: string;
}
export const ClassSearchBar = ({ category }: IcategoryProp) => {
  return (
    <div className="py-2">
      <div className="flex justify-between  items-center">
        <h1 className="font-extrabold text-lg">{category}</h1>
        <div className="flex">
          <Input
            type="text"
            placeholder="강의 검색"
            className="pl-2 font-semibold"
          />
          <div className="p-1 bg-[#F1F3F5] border-solid border-[1px] border-[#000000]/30 rounded-r-[8px] font-semibold">
            <button className="text-[14px] px-2 py-[2px]">검색</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Input = styled.input`
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-right: none;
  font-size: 14px;
  border-radius: 8px 0 0 8px;
`;
