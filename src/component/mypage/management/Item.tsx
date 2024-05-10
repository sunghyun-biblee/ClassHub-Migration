import React from "react";

interface ImanageProp {
  item: {
    id: string;
    title: string;
    name: string;
    progress: number;
    Shortcut: string;
  };
}
export const Item = ({ item }: ImanageProp) => {
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
        <li className="py-4">{item.progress} %</li>
        <li className="flex justify-center py-4 cursor-pointer">
          <img src={item.Shortcut} alt="" className="w-5" />
        </li>
      </ul>
    </div>
  );
};
