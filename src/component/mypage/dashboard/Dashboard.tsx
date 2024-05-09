import React from "react";
import { LastWatch } from "./lastWatchClass/LastWatch";
import { HaveClass } from "./haveClass/HaveClass";
import { WeeklyStudy } from "./WeeklyStudy/WeeklyStudy";
import { Link } from "react-router-dom";
import { WeeklyStudyMobile } from "./WeeklyStudy/WeeklyStudyMobile";

export const Dashboard = () => {
  return (
    <div
      className="border-[1px] lg:m-0 mysm:m-1 shadow-[0px_8px_24px_rgba(149,157,165,0.3)] rounded-lg
  flex flex-col
  md:mt-2
  "
    >
      <div className="p-5 ">
        <h1 className="font-extrabold text-2xl px-2">Dashboard</h1>
        <section className="md:grid md:grid-cols-[1fr,1.5fr] gap-3 pt-3 mysm:flex mysm:flex-col">
          <article className="p-3 border-[1px] rounded-lg">
            <div className=" flex flex-col h-[100%]">
              <div className="flex justify-between items-center py-1 px-1 ">
                <strong>최근 학습강의</strong>
                <span className="cursor-pointer font-semibold text-gray-400 text-[14px]">
                  <Link to={"/mypage/management"}>이어듣기</Link>
                </span>
              </div>
              <LastWatch></LastWatch>
            </div>
          </article>
          <article className="p-3 border-[1px] rounded-lg">
            <div>
              <div className="flex justify-between items-center py-1 px-1">
                <strong>보유 강의</strong>
                <span className="cursor-pointer font-semibold text-gray-400">
                  <Link to={"/mypage/management"}>더보기</Link>
                </span>
              </div>
              <HaveClass></HaveClass>
            </div>
          </article>
          <article className="col-[1_/span_2] mt-5 border-[1px] rounded-lg mysm:mb-11">
            <div>
              <p className="pt-3 pb-1 px-4 font-extrabold">주간 학습</p>
              <WeeklyStudy></WeeklyStudy>
              <WeeklyStudyMobile></WeeklyStudyMobile>
            </div>
          </article>
        </section>
      </div>
    </div>
  );
};
