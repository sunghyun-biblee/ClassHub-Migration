import React, { useState } from "react";
import { Iclassitem } from "./hooks/useGetArray";
import styled from "styled-components";

interface IPagenationProps {
  pageNationData: {
    currentPage: number;
    lastPage: number;
    leftPage: number;
    rightPage: number;
  };
  page: number;
  setPage: (page: number) => void;
}
export const PageNation = ({
  pageNationData,
  page,
  setPage,
}: IPagenationProps) => {
  const data = {
    currentPage: pageNationData.currentPage,
    lastPage: pageNationData.lastPage,
    leftPage: pageNationData.leftPage,
    rightPage: pageNationData.rightPage,
  };

  const renderPagenation = () => {
    let pages = [];
    let startPage = data.leftPage;
    let endPage = data.rightPage;

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          id={data.currentPage === i ? "page" : ""}
          className={
            data.currentPage === i
              ? "bg-blue-500/90 text-gray-50 cursor-pointer"
              : "cursor-pointer"
          }
          // 선택된 페이지네이션이 현재 화면에 출력된 페이지일때 클래스명을 주어서 스타일링을 함
          onClick={() => {
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
      {pageNationData && renderPagenation()}
    </div>
  );
};

const Button = styled.div`
  padding: 0 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  border-radius: 3px;
  margin: 0 5px;
`;
