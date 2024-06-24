import React from "react";
import { Header } from "../Header";
import { fetchMyCommuList } from "components/community/hooks/fetchCommuArray";

import { useQuery } from "@tanstack/react-query";

import { MyCommuItem } from "./MyCommuItem";
import { useAuth } from "hooks/AuthProvider";
import { CommuInfo } from "components/community/hooks/useTargetPost";
import like from "assets/img/likes.svg";
import { Ul } from "components/cart/CartList";

export const MyCommu = () => {
  const { userId } = useAuth();
  const type = "commu";

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["myCommu"],
    queryFn: () => fetchMyCommuList(userId),
  });
  if (isLoading) {
    return <div>로딩중</div>;
  }
  if (isError) {
    return <span>{error.message}</span>;
  }

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
          <ul className="grid md:grid-cols-[0.5fr,1fr,0.6fr,0.6fr,0.3fr] mysm:grid-cols-[1fr,1fr,1fr,0.7fr] text-center border-[1px] rounded-md my-5 font-semibold md:text-base mysm:text-sm  text-blue-950 ">
            <li className="py-[5px] md:block mysm:hidden">게시글ID</li>
            <li
              className="py-[5px] md:text-center mysm:text-center 
            
          pl-0"
            >
              제목
            </li>
            <li className="py-[5px]">작성일</li>
            <li className="py-[5px]">카테고리</li>

            <li className="py-[5px] flex justify-center items-center">
              <img src={like} alt="" className="w-5" />
            </li>
          </ul>

          <Ul className="flex flex-col gap-y-5 max-h-[500px]">
            {data &&
              data.map((item: CommuInfo, index: number) => (
                <MyCommuItem item={item} key={item.userId + index} />
              ))}
          </Ul>
        </article>
      </section>
    </div>
  );
};
