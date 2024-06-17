import React from "react";
import { WeekItem } from "./WeekItem";
import check from "assets/img/Check.svg";

export const WeeklyStudy = () => {
  return (
    <div className="mt-3 md:block mysm:hidden">
      <div>
        <ul className="grid grid-cols-7">
          <li className="text-center rounded-sm">
            <strong className="text-sky-600 font-extrabold">월</strong>
            <div className="border-t-[1px] flex flex-col items-center">
              <div className=" bg-sky-600 rounded-3xl p-1 mt-3 w-10">
                <img src={check} alt="" className="" />
              </div>

              <p className="py-3">ReactQuery</p>
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong className="text-sky-600 font-extrabold">화</strong>
            <div className="border-t-[1px] flex flex-col items-center">
              <div className=" bg-sky-600 rounded-3xl p-1 mt-3 w-10">
                <img src={check} alt="" className="" />
              </div>

              <p className="py-3">ReactQuery</p>
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong>수</strong>
            <div className="border-t-[1px]">
              {/* <h1 className="pt-2 mysm:text-[10px]">학습한 강의</h1>
              <p className="py-3">{""}</p> */}
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong>목</strong>
            <div className="border-t-[1px]">
              {/* <h1 className="pt-2">학습한 강의</h1>
              <p className="py-3">{""}</p> */}
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong className="text-sky-600 font-extrabold">금</strong>
            <div className="border-t-[1px] flex flex-col items-center">
              <div className=" bg-sky-600 rounded-3xl p-1 mt-3 w-10">
                <img src={check} alt="" className="" />
              </div>

              <p className="py-3">ReactQuery</p>
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong>토</strong>
            <div className="border-t-[1px]">
              {/* <h1 className="pt-2">학습한 강의</h1>
              <p className="py-3">{""}</p> */}
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm">
            <strong className="text-sky-600 font-extrabold">일</strong>
            <div className="border-t-[1px] flex flex-col items-center">
              <div className=" bg-sky-600 rounded-3xl p-1 mt-3 w-10">
                <img src={check} alt="" className="" />
              </div>

              <p className="py-3">ReactQuery</p>
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
        </ul>
      </div>
    </div>
  );
};
