import React, { useState } from "react";
import { Header } from "../Header";
import { fetchCommuList } from "../../community/hook/fetchCommuArray";
import { Item } from "../management/Item";
import { useQuery } from "@tanstack/react-query";
import { PageNation } from "../../class/PageNation";
import { MyCommuItem } from "./MyCommuItem";

export const MyCommu = () => {
  const type = "commu";
  const [page, setPage] = useState(1);
  const postLimit = 5;
  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myCommu"],
    queryFn: fetchCommuList,
  });

  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
  flex flex-col
  md:mt-2
  "
    >
      <section className="p-5">
        <Header type={type}></Header>
        <article>
          <ul className="grid md:grid-cols-[0.5fr,1fr,1fr,1fr,0.5fr,0.5fr] mysm:grid-cols-[1fr,1fr,1fr,0.7fr,0.7fr] text-center border-[1px] rounded-md my-5 font-semibold md:text-base mysm:text-sm  text-blue-950 ">
            <li className="py-[5px] md:block mysm:hidden">게시글ID</li>
            <li
              className="py-[5px] md:text-center mysm:text-center 
            
          pl-0"
            >
              제목
            </li>
            <li className="py-[5px]">작성자</li>
            <li className="py-[5px]">카테고리</li>
            <li className="py-[5px] md:text-base mysm:text-sm">관리하기</li>
            <li className="py-[5px]">삭제</li>
          </ul>
          <div className="flex flex-col gap-y-5">
            {data?.slice(pageOfFirst, pageOfLast).map((item) => (
              <MyCommuItem item={item} key={item.id} />
            ))}
          </div>
          <PageNation
            listLength={data ? data.length : 0}
            postLimit={postLimit}
            page={page}
            setPage={setPage}
          ></PageNation>
        </article>
      </section>
    </div>
  );
};
