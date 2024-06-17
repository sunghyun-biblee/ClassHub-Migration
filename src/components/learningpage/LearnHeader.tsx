import React from "react";
import { Iclassitem } from "../class/hooks/useGetArray";

type ILearnHeaderProp = {
  data: Iclassitem;
};

// className="flex lg:max-w-[1200px] md:w-[100vw] mysm:w-[100vw] lg:px-10 md:px-7  mysm:px-3  py-5 lg:justify-around md:justify-between mysm:justify-between md:gap-0 mysm:gap-1"
export const LearnHeader = ({ data }: ILearnHeaderProp) => {
  return (
    <div>
      <section className="md:w-[100vw] lg:max-w-[1200px] ">
        <article className="  bg-[#002333] text-white font-semibold ">
          <div
            className="grid grid-cols-2
          lg:max-w-[1200px] md:w-[100vw] mysm:w-[100vw] lg:px-10 md:px-7  mysm:px-3  py-5  md:gap-5 mysm:gap-2
          
          "
          >
            <div className="w-[100%] flex justify-center items-center">
              <img
                src={data.img}
                alt="classimg"
                className="lg:w-[400px] md:w-[300px] mysm:w-[200px] md:h-auto mysm:h-[200px] rounded-md"
              />
            </div>
            <div className="flex justify-between flex-col lg:px-10 md:px-6 mysm:px-2">
              <ul className="md:flex md:justify-between mysm:justify-between flex-col h-[100%] w-[100%]">
                <div>
                  <li className="lg:text-3xl mysm:text-sm py-2 md:text-2xl">
                    <span>강의 제목 : </span>
                    <span>{data.title}</span>
                  </li>
                  <li className="lg:text-xl md:text-xl mysm:text-sm py-2">
                    <span>강사 이름 : </span>
                    <span>{data.name}</span>
                  </li>
                </div>
                <div className="flex justify-between mysm:pt-8 md:pb-3 mysm:pb-0 lg:flex-row md:flex-row mysm:flex-col">
                  <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-[sm]">
                    <span>카테고리 : </span>
                    <span>개발</span>
                  </li>

                  <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-lg mysm:text-sm">
                    <span>수강평 : </span>
                    <span>{data.score}</span>
                  </li>
                </div>
              </ul>
            </div>
          </div>
        </article>
      </section>
    </div>
  );
};
