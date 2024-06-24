import React from "react";
import { classProp } from "./PreviewClass";
import rightArrow from "assets/img/carousel/rigthArrow.svg";
import { ClassItem } from "components/class/ClassItem";
import star from "assets/img/Star.svg";
import { useNavigate } from "react-router-dom";

export const PopularClass = ({
  data,
  mainClassIsLoading,
  mainClassIsError,
  mainClassError,
}: classProp) => {
  const nav = useNavigate();
  if (mainClassIsLoading) {
    return <div>로딩중</div>;
  }
  if (mainClassIsError) {
    return <span>{mainClassError?.message}</span>;
  }
  return (
    <div className=" py-10 px-5 lg:max-w-[1200px] md:px-3 mysm:px-2">
      <div className="flex justify-between ">
        <div className="lg:pb-3  mysm:pb-2 font-extrabold flex items-center">
          <img src={star} alt="" className="lg:w-7 md:w-4 mysm:w-4" />{" "}
          <span className="px-2 lg:text-[18px]">추천 강의</span>
          <img src={star} alt="" className="lg:w-7 md:w-4 mysm:w-4" />
        </div>
        <div
          className="pb-3 flex items-center cursor-pointer"
          onClick={() => nav("/class")}
        >
          <p>더보기</p>
          <img src={rightArrow} alt="" className="w-5 h-auto ml-2" />
        </div>
      </div>
      <section className=" grid-cols-4 gap-3 md:grid mysm:hidden">
        {data &&
          data.contents.slice(0, 4).map((item) => (
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
            <ClassItem item={item} key={item.classId}></ClassItem>
          ))}
      </section>
      <section className=" grid-cols-3 gap-3 md:hidden mysm:grid ">
        {data &&
          data.contents.slice(0, 3).map((item) => (
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
            <ClassItem item={item} key={item.classId}></ClassItem>
          ))}
      </section>
    </div>
  );
};
