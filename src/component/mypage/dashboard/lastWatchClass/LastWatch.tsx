import React from "react";
import preview from "../../../../assets/img/preview.jpg";
export const LastWatch = () => {
  return (
    <div className="md:grid md:grid-cols-2 h-[90%] mysm:flex md:gap-0 mysm:gap-1 md:mt-0 mysm:mt-3">
      <div className="flex items-center lg:mt-1 md:mt-0 ">
        <img
          src={preview}
          alt="prevClassImg"
          className="rounded-lg md:w-[95%] mysm:w-[100%]"
        />
      </div>
      <ul className="flex justify-around flex-col px-1 py-1">
        <li className="lg:text-base md:text-sm md:pl-0 mysm:pl-1">
          <strong className="text-sky-700">강의명</strong>
          <h1 className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap">
            React-Query TanstackQuery
          </h1>
        </li>
        <div className="flex justify-between md:px-0 mysm:px-1">
          <li className="lg:text-base md:text-sm">
            <strong className="text-sky-700">강사명</strong>
            <h2 className="font-semibold">admin</h2>
          </li>
          <li className="lg:text-base md:text-sm">
            <strong className="text-sky-700">진행률</strong>
            <h3 className="font-semibold">30%</h3>
          </li>
        </div>
      </ul>
    </div>
  );
};
