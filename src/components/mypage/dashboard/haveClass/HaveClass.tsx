import React from "react";
import { Iclassitem, fetchClass } from "components/class/hooks/useGetArray";
import { useQuery } from "@tanstack/react-query";
import { fetchMyStudyList } from "components/community/hooks/fetchCommuArray";
import { useAuth } from "hooks/AuthProvider";
import preview from "assets/img/preview.jpg";
export const HaveClass = () => {
  const { userId } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["MyStudyList"],
    queryFn: () => fetchMyStudyList(userId),
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }
  return (
    <div className="py-3">
      <div className="grid md:grid-cols-3 mysm:grid-cols-3 md:gap-3 mysm:gap-5">
        {data &&
          data?.slice(0, 3).map((item: Iclassitem) => (
            <div className="flex flex-col" key={item.classId + "ABC"}>
              <img src={preview} alt="" className="w-[100%] rounded-md mb-1" />
              <b className="whitespace-nowrap overflow-hidden text-ellipsis ">
                {item.className}
              </b>
            </div>
          ))}
      </div>
    </div>
  );
};
