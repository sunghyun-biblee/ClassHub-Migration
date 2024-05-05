import React from "react";
import { classProp } from "./PreviewClass";
import rightArrow from "../../assets/img/carousel/rigthArrow.svg";
import { ClassItem } from "../class/ClassItem";

export const PopularClass = ({ classList }: classProp) => {
  return (
    <div className=" pt-10 px-5 lg:max-w-[1200px] md:px-3 mysm:px-2">
      <div className="flex justify-between ">
        <h1 className="lg:pb-3  mysm:pb-2 font-extrabold">⭐ 추천 강의 ⭐ </h1>
        <div className="pb-3 flex items-center cursor-pointer">
          <p>더보기</p>
          <img src={rightArrow} alt="" className="w-5 h-auto ml-2" />
        </div>
      </div>
      <section className="grid grid-cols-5 gap-3">
        {classList.map((item) => (
          // <article
          //   className="flex flex-col "
          //   key={`${item.title}+${item.name}`}
          // >
          //   <div>
          //     <img src={item.img} alt="classIMG" className="h-auto w-[100%]" />
          //   </div>
          //   <div className="h-[100%] flex flex-col justify-between">
          //     <div className="flex justify-between pb-3 md:pb-2 mysm:flex-col pb-1">
          //       <h1 className="lg:font-bold p-1 md:text-base mysm:text-[11px] font-extrabold p-[1px]">
          //         {item.title}
          //       </h1>
          //       <h3 className="p-1 md:text-base mysm:text-[11px] p-[1px]">
          //         {item.name}
          //       </h3>
          //     </div>

          //     <div className="flex justify-between pt-2 lg:flex-row md:flex-row mysm:flex-col pt-1">
          //       <p className="px-1  md:text-base mysm:text-[11px] px-[1px] font-semibold">
          //         {item.price}
          //       </p>
          //       <p className="px-2 pr-2  md:text-base mysm:text-[11px] px-[1px] font-semibold">
          //         {item.score}점
          //       </p>
          //     </div>
          //   </div>
          // </article>
          <ClassItem item={item}></ClassItem>
        ))}
      </section>
    </div>
  );
};
