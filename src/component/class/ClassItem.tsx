import React from "react";
import { classProp } from "../main/PreviewClass";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { selectClassinfo } from "./hook/useGetArray";

interface IclassitemProp {
  item: {
    img: string;
    title: string;
    name: string;
    price: string;
    score: string;
    id: number;
    overview: string;
  };
}
export const ClassItem = ({ item }: IclassitemProp) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/class/${item.id}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["classDeatil", item.id],
    queryFn: () => selectClassinfo(item.id),
  });

  return (
    <article
      className="flex flex-col "
      key={`${item.title}+${item.name}`}
      onClick={handleClick}
    >
      <div>
        <img src={item.img} alt="classIMG" className="h-auto w-[100%]" />
      </div>
      <div className="h-[100%] flex flex-col justify-between">
        <div className="flex justify-between  md:pb-2 mysm:flex-col pb-1">
          <h1
            className="lg:font-bold md:text-base mysm:text-[12px] font-extrabold p-[1px] whitespace-nowrap 
          lg:max-w-[200px] text-ellipsis overflow-hidden
          "
          >
            {item.title}
          </h1>
          <h3 className=" md:text-base mysm:text-[13px] p-[1px]">
            {item.name}
          </h3>
        </div>

        <div className="flex justify-between pt-2 lg:flex-row md:flex-row mysm:flex-col">
          <p className="  md:text-base mysm:text-[12px] px-[1px] font-semibold">
            {item.price}
          </p>
          <p className=" pr-2  md:text-base mysm:text-[12px] px-[1px] font-semibold">
            {item.score}점
          </p>
        </div>
      </div>
    </article>
  );
};
