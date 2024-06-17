import { Iclassitem } from "component/class/hooks/useGetArray";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import right from "assets/img/carousel/rigthArrow.svg";

interface ImanageProp {
  item: Iclassitem;
}

export const Item = ({ item }: ImanageProp) => {
  const nav = useNavigate();
  return (
    <div className="border-[1px] shadow-[0px_1px_6px_rgba(149,157,165,0.3)] rounded-md">
      <ul
        className="grid md:grid-cols-[0.5fr,1fr,0.7fr,0.5fr,0.5fr]
mysm:grid-cols-[1fr,0.7fr,0.5fr,0.5fr] text-center items-center"
      >
        <li className="py-4 font-semibold text-indigo-950 md:block mysm:hidden">
          {item.id}
        </li>
        <li className="py-4 md:text-base mysm:text-sm md:px-0 mysm:pl-2 overflow-hidden w-[100%]  whitespace-nowrap text-ellipsis ">
          {item.title} 2024 05
        </li>
        <li className="py-4">{item.name}</li>
        <li className="py-4">10 %</li>
        <li className="flex justify-center py-4 cursor-pointer">
          <Link
            to={`/learn/${item.id}`}
            className="w-[100%] flex justify-center"
          >
            <img src={right} alt="" className="w-5" />
          </Link>
        </li>
      </ul>
    </div>
  );
};
