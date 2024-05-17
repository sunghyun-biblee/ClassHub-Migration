import React from "react";
import { Link } from "react-router-dom";

interface IRegistClassProp {
  item: {
    id: number;
    title: string;
    registDate: string;
    price: string;
  };
}

export const RegistClassItem = ({ item }: IRegistClassProp) => {
  return (
    <div className="border-[1px] shadow-[0px_1px_6px_rgba(149,157,165,0.3)] rounded-md">
      <ul
        className="grid md:grid-cols-[0.5fr,1fr,0.7fr,0.5fr,0.35fr]
mysm:grid-cols-[1fr,0.7fr,0.5fr,0.5fr] text-center items-center font-semibold text-gray-800"
      >
        <li className="py-4 font-semibold text-indigo-950 md:block mysm:hidden">
          {item.id}
        </li>
        <li className="py-4 md:text-base mysm:text-sm md:px-0 mysm:pl-2 overflow-hidden w-[100%]  whitespace-nowrap text-ellipsis ">
          {item.title}
        </li>
        <li className="py-4">{item.registDate}</li>
        <li className="py-4">{item.price}원</li>
        <li className="flex justify-center py-4 cursor-pointer">
          <Link to={`/learn/${1}`} className="w-[100%] flex justify-center">
            {">"}
          </Link>
        </li>
      </ul>
    </div>
  );
};
