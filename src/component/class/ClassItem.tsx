import React, { ClassType } from "react";
import { classProp } from "../main/PreviewClass";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { selectClassinfo } from "./hooks/useGetArray";
import { IClassType } from "./ShowClass";
import preview from "assets/img/preview.jpg";
interface IclassitemProp {
  item: IClassType;
}
export const ClassItem = ({ item }: IclassitemProp) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/class/${item.classId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["classDeatil", item.classId],
    queryFn: () => selectClassinfo(item.classId),
  });

  return (
    <article className="flex flex-col " onClick={handleClick}>
      <div>
        <img src={preview} alt="classIMG" className="h-auto w-[100%]" />
      </div>
      <div className="h-[100%] flex flex-col justify-between">
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

        <div className="flex justify-between pt-2 lg:flex-row md:flex-row mysm:flex-col">
          <p className="  md:text-base mysm:text-[12px] px-[1px] font-semibold">
            {item.price.toLocaleString()}원
          </p>
          <p className=" pr-2  md:text-base mysm:text-[12px] px-[1px] font-semibold">
            {item.reviewScore}점
          </p>
        </div>
      </div>
    </article>
  );
};
