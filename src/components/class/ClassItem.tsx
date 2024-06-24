import React from "react";

import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { selectClassinfo } from "./hooks/useGetArray";
import { IClassType } from "./ShowClass";
import preview from "assets/img/preview.jpg";

interface IclassitemProp {
  item: IClassType;
}
export const ClassItem = ({ item }: IclassitemProp) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/classDetail/${item.classId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["classDeatil", item.classId],
    queryFn: () => selectClassinfo(item.classId),
  });

  return (
    <article className="flex flex-col " onClick={handleClick}>
      <div>
        <img
          src={item.thumnail ? item.thumnail : preview}
          alt="classIMG"
          className="h-auto w-[100%] rounded-md"
        />
      </div>
      <div className="h-[100%] flex flex-col justify-between p-1">
        <div className="flex justify-between  md:pb-2 mysm:flex-col pb-1">
          <h1
            className="lg:font-bold md:text-base mysm:text-[12px] font-extrabold p-[1px] whitespace-nowrap 
          lg:max-w-[200px] text-ellipsis overflow-hidden
          "
          >
            {item.className}
          </h1>
          <h3 className=" md:text-base mysm:text-[13px] p-[1px]">
            {item.name}
          </h3>
        </div>

        <div className="flex justify-between pt-2 flex-row  ">
          <p className="  md:text-base mysm:text-[12px] px-[1px] font-semibold">
            {item.price.toLocaleString()}원
          </p>
          <div className="  md:text-base mysm:text-[12px] px-[1px] font-semibold flex md:items-center mysm:items-start md:py-0 mysm:py-[1px]">
            <YellowStar />
            <span>{item.reviewScore}점</span>
          </div>
        </div>
      </div>
    </article>
  );
};

const YellowStar = () => {
  return (
    <div className="md:w-5 mysm:w-4 h-[auto]">
      <svg
        data-slot="icon"
        fill="#ffd500"
        strokeWidth="1.5"
        stroke="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
        ></path>
      </svg>
    </div>
  );
};
