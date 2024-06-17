import React, { useEffect, useState } from "react";
import { ClassSearchBar } from "./ClassSearchBar";
import { classProp } from "components/main/PreviewClass";

import { fetchClass, fetchClassList } from "./hooks/useGetArray";
import { ClassItem } from "./ClassItem";
import { PageNation } from "./PageNation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClassCategory } from "hooks/ClassTypeProvider";

export interface IClassType {
  classId: number;
  categoryId: number;
  instructorsId: number;
  className: string;
  description: string;
  summary: string | null;
  price: number;
  thumnail: string;
  editDate: string | null;
  regdate: string | null;
  name: string;
  reviewScore: number | null;
  totalVideoLength: number;
}
interface IShowClass {
  categoryType: number;
}
export const ShowClass = ({ categoryType }: IShowClass) => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classListAll"],
    queryFn: () => fetchClassList(categoryType, page),
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  const renderPageNation = () => {
    if (data) {
      const pageNationData = {
        currentPage: data?.currentPageNum,
        lastPage: data?.totalNum,
        leftPage: data?.leftEndNum,
        rightPage: data?.rightEndNum,
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
        {data.contents?.map((item: IClassType, index: number) => (
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
