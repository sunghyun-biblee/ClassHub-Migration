import { useQuery } from "@tanstack/react-query";
import { fetchsearchKeyWord } from "components/navigtaion/hooks/fetchsearchKeyWord";

import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { IClassType } from "../ShowClass";
import { ClassItem } from "../ClassItem";
import { PageNation } from "../PageNation";

export const SearchClass = () => {
  const [page, setPage] = useState(1);
  const { pathname } = useLocation();
  const searchKeyWordstring = pathname.split("/")[2];
  const searchKeywordFormat = decodeURIComponent(searchKeyWordstring);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchList"],
    queryFn: () => fetchsearchKeyWord(searchKeywordFormat, page),
  });
  console.log(pathname);
  console.log(searchKeywordFormat);
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  console.log(data);

  const renderPageNation = () => {
    if (data) {
      const pageNationData = {
        currentPage: data.currentPageNum,
        lastPage: data.totalNum,
        leftPage: data.leftEndNum,
        rightPage: data.rightEndNum,
      };
      return (
        <PageNation
          pageNationData={pageNationData}
          page={page}
          setPage={setPage}
        ></PageNation>
      );
    }
  };
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 pt-5">
        {data &&
          data.contents.map((item: IClassType, index: number) => (
            <ClassItem
              item={item}
              key={item.classId + "showClass" + index}
            ></ClassItem>
          ))}
      </div>
      <div className="py-[50px] flex justify-center items-center">
        {renderPageNation()}
      </div>
    </div>
  );
};
