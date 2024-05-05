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
        <div className="flex justify-between pb-3 md:pb-2 mysm:flex-col pb-1">
          <h1 className="lg:font-bold p-1 md:text-base mysm:text-[11px] font-extrabold p-[1px]">
            {item.title}
          </h1>
          <h3 className="p-1 md:text-base mysm:text-[11px] p-[1px]">
            {item.name}
          </h3>
        </div>

        <div className="flex justify-between pt-2 lg:flex-row md:flex-row mysm:flex-col pt-1">
          <p className="px-1  md:text-base mysm:text-[11px] px-[1px] font-semibold">
            {item.price}
          </p>
          <p className="px-2 pr-2  md:text-base mysm:text-[11px] px-[1px] font-semibold">
            {item.score}점
          </p>
        </div>
      </div>
    </article>
  );
};
