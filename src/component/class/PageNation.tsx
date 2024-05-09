import React, { useState } from "react";
import { Iclassitem } from "./hook/useGetArray";
import styled from "styled-components";

interface IPagenationProps {
  listLength: number;
  postLimit: number;
  page: number;
  setPage: (index: number) => void;
}
export const PageNation = ({
  listLength,
  postLimit,
  page,
  setPage,
}: IPagenationProps) => {
  const [currPage, setCurrPage] = useState<number>(page);
  const totalPages = Math.ceil(listLength / postLimit);
  console.log(listLength);

  const renderPagenation = () => {
    const PageNationCount = 5;
    let pages = [];
    let startPage =
      Math.floor((currPage - 1) / PageNationCount) * PageNationCount + 1;

    let endPage = Math.min(startPage + PageNationCount, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          id={page === i ? "page" : ""}
          className={
            page === i
              ? "bg-blue-500/90 text-gray-50 cursor-pointer"
              : "cursor-pointer"
          }
          // 선택된 페이지네이션이 현재 화면에 출력된 페이지일때 클래스명을 주어서 스타일링을 함
          onClick={() => {
            setCurrPage(i);
            setPage(i);
          }}
        >
          {i}
        </Button>
      );
    }
    return pages;
  };
  return (
    <div className="flex justify-center items-center md:pt-14 mysm:pt-10 lg:pb-10 md:pb-18 mysm:pb-5">
      {renderPagenation()}
    </div>
  );
};

const Button = styled.div`
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 0 5px;
`;
