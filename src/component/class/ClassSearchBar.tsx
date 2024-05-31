import { useQueryClient } from "@tanstack/react-query";
import { fetchsearchKeyWord } from "component/navigtaion/hooks/fetchsearchKeyWord";
import { useClassCategory } from "hooks/ClassTypeProvider";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const ClassSearchBar = () => {
  const [searchKeyWord, setSearchKeyWord] = useState("");
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const classType = useClassCategory();
  const renderCategory = () => {
    switch (classType.classCategoryType) {
      case 0:
        return "전체강의";
      case 1:
        return "개발·프로그래밍";
      case 2:
        return "게임 개발";
      case 3:
        return "인공지능";
      case 4:
        return "보안·네트워크";
      default:
        return "오류";
    }
  };
  const handleSubmitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    nav(`/class/${searchKeyWord}`);
    queryClient.prefetchQuery({
      queryKey: ["searchList"],
      queryFn: () => fetchsearchKeyWord(searchKeyWord),
    });
  };
  return (
    <div className="py-2">
      <div className="flex justify-between  items-center">
        <h1 className="font-extrabold text-lg">{renderCategory()}</h1>
        <form className="flex" onSubmit={handleSubmitSearch}>
          <Input
            type="text"
            placeholder="강의 검색"
            value={searchKeyWord}
            className="pl-2 font-semibold"
            onChange={(e) => setSearchKeyWord(e.target.value)}
          />
          <div className="p-1 bg-[#F1F3F5] border-solid border-[1px] border-[#000000]/30 rounded-r-[8px] font-semibold">
            <button className="text-[14px] px-2 py-[2px]">검색</button>
          </div>
        </form>
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
