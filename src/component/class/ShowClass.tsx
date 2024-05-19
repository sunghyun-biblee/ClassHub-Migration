import React, { useEffect, useState } from "react";
import { ClassSearchBar } from "./ClassSearchBar";
import { classProp } from "component/main/PreviewClass";

import { fetchClass } from "./hooks/useGetArray";
import { ClassItem } from "./ClassItem";
import { PageNation } from "./PageNation";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const ShowClass = () => {
  const postLimit = 9;
  const [page, setPage] = useState(1);

  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classList", page],
    queryFn: fetchClass,
  });

  return (
    <div>
      <div className="grid grid-cols-3 gap-5 pt-5">
        {data?.slice(pageOfFirst, pageOfLast)?.map((item, index) => (
          <ClassItem
            item={item}
            key={item.id + "showClass" + index}
          ></ClassItem>
        ))}
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
