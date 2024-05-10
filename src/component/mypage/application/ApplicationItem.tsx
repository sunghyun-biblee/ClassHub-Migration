import React from "react";
import { HeartSVG } from "./HeartSVG";
interface IApplicationItemProp {
  item: {
    id: string;
    likes: boolean;
    title: string;
    name: string;
    price: string;
    payment: boolean;
    detail: string;
  };
}

export const ApplicationItem = ({ item }: IApplicationItemProp) => {
  return (
    <div className=" border-[1px] py-2 px-1 mb-3 rounded-md ">
      <ul
        className="grid 
      md:grid-cols-[0.5fr,1.5fr,0.7fr,0.7fr,0.5fr,0.5fr]
     mysm:grid-cols-[0.5fr,1.3fr,0.7fr,0.7fr,0.5fr,0.8fr]
    
       text-center"
      >
        <li className="px-[5px] flex justify-center">
          <HeartSVG likes={item.likes}></HeartSVG>
        </li>
        <li className="whitespace-nowrap overflow-hidden text-ellipsis px-[5px]">
          <span>{item.title}</span>
        </li>
        <li className="px-[5px] flex justify-center items-center">
          <p>{item.name}</p>
        </li>
        <li className="px-[5px] md:text-base mysm:text-sm flex justify-center items-center">
          <p>{item.price}원</p>
        </li>
        <li className="px-[5px] flex justify-center items-center">
          <p>{item.payment ? "✅" : "❌"}</p>
        </li>
        <li className="px-[5px] flex justify-center items-center cursor-pointer">
          <img src={item.detail} alt="" className="w-5" />
        </li>
      </ul>
    </div>
  );
};
