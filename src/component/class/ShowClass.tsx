import React, { useEffect, useState } from "react";
import { ClassSearchBar } from "./ClassSearchBar";
import { classProp } from "component/main/PreviewClass";

import { fetchClass, fetchClassList } from "./hooks/useGetArray";
import { ClassItem } from "./ClassItem";
import { PageNation } from "./PageNation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useClassCategory } from "hooks/ClassTypeProvider";

export interface IClassType {
  classId: number;
  instructorsId: number;
  categoryId: number;
  className: string;
  description: string;
  summary: string;
  price: number;
  thumnail: File;
  totalVideoLength: number;
  regdate: string;
  editDate: null | string;
  reviewScore: number | undefined;
  name: string;
}
interface IShowClass {
  categoryType: number;
}
export const ShowClass = ({ categoryType }: IShowClass) => {
  // const postLimit = 9;
  // const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classListAll"],
    queryFn: () => fetchClassList(categoryType),
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 pt-5">
        {data.slice(0, 9)?.map((item: IClassType, index: number) => (
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
