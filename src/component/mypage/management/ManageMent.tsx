import React, { useState } from "react";
import right from "../../../assets/img/carousel/rigthArrow.svg";
import { Item } from "./Item";
import { PageNation } from "../../class/PageNation";
import { Header } from "../Header";
export const ManageMent = () => {
  const type = "management";
  const [page, setPage] = useState(1);
  const postLimit = 5;
  const pageOfLast = page * postLimit; // 페이지마다 마지막 포스트 위치
  const pageOfFirst = pageOfLast - postLimit; // 페이지마다 첫 포스트 위치
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
          <ul className="grid md:grid-cols-5 mysm:grid-cols-4 text-center border-[1px] rounded-md my-5 font-semibold md:text-base mysm:text-sm  text-blue-950 ">
            <li className="py-[5px] md:block mysm:hidden">강의ID</li>
            <li
              className="py-[5px] md:text-center mysm:text-left 
            md:pl-0
            mysm:pl-2"
            >
              강의 제목
            </li>
            <li className="py-[5px]">강사 이름</li>
            <li className="py-[5px]">진행률</li>
            <li className="py-[5px]">바로가기</li>
          </ul>
          <div className="flex flex-col gap-y-5">
            {examArr.slice(pageOfFirst, pageOfLast).map((item) => (
              <Item item={item} key={item.id} />
            ))}
          </div>
          <PageNation
            listLength={examArr.length}
            postLimit={postLimit}
            page={page}
            setPage={setPage}
          ></PageNation>
        </article>
      </section>
    </div>
  );
};

const examArr = [
  {
    id: "exaR1",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 10,
    Shortcut: right,
  },
  {
    id: "exaR2",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 11,
    Shortcut: right,
  },
  {
    id: "exaR3",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 12,
    Shortcut: right,
  },
  {
    id: "exaR4",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 13,
    Shortcut: right,
  },
  {
    id: "exaR5",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 15,
    Shortcut: right,
  },
  {
    id: "exaR6",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 17,
    Shortcut: right,
  },
  {
    id: "exaR7",
    title: "테스트 게시글 입니다",
    name: "admin",
    progress: 20,
    Shortcut: right,
  },
];
