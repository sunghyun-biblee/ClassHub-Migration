import React from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../Header";
import { TeacherHeader } from "./TeacherHeader";
import { Item } from "../management/Item";
import { RegistClassItem } from "./RegistClassItem";
import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";
import { useTargetLectureData } from "../hooks/useTargetLectureData";

export const PCTpage = () => {
  const { lectureData, lectureIsLoading, lectureIsError, lectureError } =
    useTargetLectureData(120);
  console.log(lectureData);
  if (lectureIsLoading) {
    return <div>로딩중</div>;
  }
  if (lectureIsError) {
    return <span>{lectureError?.message}</span>;
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
              {lectureData && <RegistClassItem data={lectureData} />}
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};

const RegistItemArray = [
  {
    id: 100121,
    title: "React-Qury-TanstackQuery5",
    registDate: "2024-05-01",
    price: "9,999",
  },
  {
    id: 100122,
    title: "TypeScript - JavaScript++",
    registDate: "2024-05-02",
    price: "9,999",
  },
  {
    id: 100123,
    title: "JavaScript - 코어 자바스크립트",
    registDate: "2024-05-03",
    price: "9,999",
  },
  {
    id: 100124,
    title: "HTML5,CSS3 기초",
    registDate: "2024-05-04",
    price: "9,999",
  },
  {
    id: 100125,
    title: "Recoil - 얼굴책에서 나온 상태관리",
    registDate: "2024-05-05",
    price: "9,999",
  },
  {
    id: 100126,
    title: "Java-SpringBoot",
    registDate: "2024-05-06",
    price: "9,999",
  },
  {
    id: 100127,
    title: "Redux - 상태관리 라이브러리",
    registDate: "2024-05-07",
    price: "9,999",
  },
];
