import React from "react";
import { TeacherHeader } from "./TeacherHeader";
import { IMyLectureItem, RegistClassItem } from "./RegistClassItem";
import { fetchMyUploadLectureList } from "../hooks/useTargetLectureData";
import { useAuth } from "hooks/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const PCTpage = () => {
  const { userId } = useAuth();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["MyuploadLecture"],
    queryFn: () => fetchMyUploadLectureList(userId),
  });

  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error?.message}</span>;
  }
  return (
    <div className="mysm:hidden lg:block">
      <div
        className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
  flex flex-col
  md:mt-2
  "
      >
        <section className="p-5">
          <TeacherHeader></TeacherHeader>

          <article>
            <ul
              className="grid 
          md:grid-cols-[0.5fr,1fr,0.7fr,0.5fr,0.35fr] 
          mysm:grid-cols-[1fr,0.7fr,0.5fr,0.5fr] text-center border-[1px] rounded-md my-5 font-semibold md:text-base mysm:text-sm  text-blue-950
          "
            >
              <li className="py-[5px] md:block mysm:hidden">강의ID</li>
              <li
                className="py-[5px] md:text-center 
            "
              >
                강의 제목
              </li>
              <li className="py-[5px]">등록날짜</li>
              <li className="py-[5px]">평점</li>
              <li className="py-[5px]">수정하기</li>
            </ul>
            <div className="flex flex-col gap-y-5">
              {data &&
                data.map((item: IMyLectureItem, index: number) => (
                  <RegistClassItem
                    item={item}
                    key={item.className + new Date().getTime() + index}
                  />
                ))}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};
