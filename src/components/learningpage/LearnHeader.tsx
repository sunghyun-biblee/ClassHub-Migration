import React from "react";
import preview from "assets/img/preview.jpg";
import { ClassDataType } from "components/class/ClassDetail";

export type ILearnHeaderProp = {
  data: ClassDataType;
};

// className="flex lg:max-w-[1200px] md:w-[100vw] mysm:w-[100vw] lg:px-10 md:px-7  mysm:px-3  py-5 lg:justify-around md:justify-between mysm:justify-between md:gap-0 mysm:gap-1"
export const LearnHeader = ({ data }: ILearnHeaderProp) => {
  const renderCategory = (value: number) => {
    switch (value) {
      case 1:
        return "개발 · 프로그래밍";

      case 2:
        return "게임 개발";

      case 3:
        return "인공 지능";

      case 4:
        return "보안 · 네트워크";

      default:
        break;
    }
  };
  return (
    <div>
      <section className="md:w-[100vw] lg:max-w-[1200px] ">
        <article className="  bg-[#002333] text-white font-semibold ">
          <div
            className="flex lg:max-w-[1200px] w-[100vw] lg:px-10
              md:px-7
              mysm:px-3
              py-4 
              md:gap-0 
              mysm:gap-1 
              md:flex-nowrap
            mysm:flex-wrap
          
          "
          >
            <div className="flex justify-center items-center w-[100%] md:mb-0 mysm:mb-2">
              <img
                src={preview}
                //  {
                //   data.classInfo.thumnail ? data.classInfo.thumnail : preview
                // }
                alt="classimg"
                className="rounded-md lg:w-[90%] md:w-[80%] mysm:w-[300px] md:h-[100%] mysm:h-[300px]"
              />
            </div>
            <div className="flex justify-between flex-col lg:px-10 md:px-6 mysm:px-2">
              <ul className="md:flex md:justify-between mysm:justify-between flex-col h-[100%] w-[100%]">
                <div>
                  <li
                    className="lg:text-3xl mysm:text-xl py-2 md:text-2xl
                  tracking-tight"
                  >
                    <span>
                      {data.classInfo.className} 반갑습니다[JS] Phaser 게임 제작
                      - 뱀파이어 서바이벌 클론
                    </span>
                  </li>
                  <li
                    className="lg:text-xl md:text-xl mysm:text-sm py-2
                  tracking-tight
                  "
                  >
                    <span className="text-gray-300">
                      {data.classInfo.name ? data.classInfo.name : "biblee"}
                    </span>
                  </li>
                </div>
                <div
                  className="flex justify-between items-center flex-row 
                md:py-3
                mysm:pt-2
                "
                >
                  <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-md mysm:text-sm">
                    <span>
                      카테고리 : {renderCategory(data.classInfo.categoryId)}{" "}
                    </span>
                  </li>

                  <li className="py-2 lg:px-2 md:px-2 mysm:px-0 lg:text-lg md:text-md mysm:text-md">
                    <span>수강평 : </span>
                    <span>{data.classInfo.reviewScore}</span>
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
