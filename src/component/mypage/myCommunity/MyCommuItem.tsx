import React from "react";
import { Icommuitem } from "../../community/hook/fetchCommuArray";
import del from "../../../assets/img/Trash.svg";
import right from "../../../assets/img/carousel/rigthArrow.svg";

interface IcommuProp {
  item: Icommuitem;
}

export const MyCommuItem = ({ item }: IcommuProp) => {
  return (
    <div className="border-[1px] shadow-[0px_1px_6px_rgba(149,157,165,0.3)] rounded-md">
      <ul className="grid md:grid-cols-[0.5fr,1fr,0.6fr,0.5fr,0.5fr,0.5fr] mysm:grid-cols-[1fr,1fr,1fr,0.7fr,0.7fr] text-center items-center">
        <li className="py-4 font-semibold text-indigo-950 md:block mysm:hidden">
          {item.id}
        </li>
        <li className="py-4 md:text-base mysm:text-sm md:px-1 mysm:pl-2 overflow-hidden w-[100%]  whitespace-nowrap text-ellipsis ">
          {item.title} 2024 05
        </li>
        <li className="py-4">{item.name}</li>
        <li className="py-4">{item.category} </li>
        <li className="flex justify-center py-4 cursor-pointer">
          <img src={right} alt="" className="w-5" />
        </li>
        <li className="flex justify-center py-4 cursor-pointer">
          <img src={del} alt="" className="w-5" />
        </li>
      </ul>
    </div>
  );
};
