import React from "react";
import check from "../../../../assets/img/Check.svg";

export const WeeklyStudyMobile = () => {
  return (
    <div className="mt-3 md:hidden mysm:block">
      <div>
        <ul className="grid grid-cols-7">
          <li className="text-center rounded-sm flex flex-col items-center">
            <strong className="text-sky-600 font-extrabold">월</strong>
            <div className="border-t-[1px] bg-sky-600 rounded-3xl p-1 my-3">
              <img src={check} alt="" className="mysm:w-6" />
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong className="text-sky-600 font-extrabold">화</strong>
            <div className="border-t-[1px] bg-sky-600 rounded-3xl p-1 my-3">
              <img src={check} alt="" className="mysm:w-6" />
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong>수</strong>
            <div className="border-t-[1px]"></div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong>목</strong>
            <div className="border-t-[1px]"></div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong className="text-sky-600 font-extrabold">금</strong>
            <div className="border-t-[1px] bg-sky-600 rounded-3xl p-1 my-3">
              <img src={check} alt="" className="mysm:w-6" />
            </div>
            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong>토</strong>

            {/* <WeekItem></WeekItem> */}
          </li>
          <li className="text-center  border-l-[1px] rounded-sm flex flex-col items-center">
            <strong className="text-sky-600 font-extrabold">일</strong>

            <div className="border-t-[1px] bg-sky-600 rounded-3xl p-1 my-3">
              <img src={check} alt="" className="mysm:w-6" />
            </div>

            {/* <WeekItem></WeekItem> */}
          </li>
        </ul>
      </div>
    </div>
  );
};
