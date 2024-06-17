import { useQuery } from "@tanstack/react-query";
import { fetchsearchKeyWord } from "components/navigtaion/hooks/fetchsearchKeyWord";

import React from "react";
import { useLocation } from "react-router-dom";
import { IClassType } from "../ShowClass";
import { ClassItem } from "../ClassItem";

export const SearchClass = () => {
  const { pathname } = useLocation();
  const searchKeyWordstring = pathname.split("/")[2];
  const searchKeywordFormat = decodeURIComponent(searchKeyWordstring);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["searchList"],
    queryFn: () => fetchsearchKeyWord(searchKeywordFormat),
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
  return (
    <div>
      <div className="grid grid-cols-3 gap-5 pt-5">
        {data &&
          data?.map((item: IClassType, index: number) => (
            <ClassItem
              item={item}
              key={item.classId + "showClass" + index}
            ></ClassItem>
          ))}
      </div>
      <div className="py-[50px] flex justify-center items-center">
        <p>페이지네이션</p>
      </div>
      {/* <PageNation
    listLength={data ? data.length : 0}
    postLimit={postLimit}
    page={page}
    setPage={setPage}
  ></PageNation> */}
    </div>
  );
};
