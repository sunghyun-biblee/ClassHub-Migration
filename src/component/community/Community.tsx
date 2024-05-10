import React, { useState } from "react";
import styled from "styled-components";
import { CommuCategory } from "./CommuCategory";
import { ShowCommuList } from "./ShowCommuList";
import { PopularList } from "./PopularList";

export const Community = () => {
  const [category, setCategory] = useState<string>("qna");

  return (
    <div>
      <div
        className="bg-[#333B3D] lg:mt-[85px] md:mt-[65px] mysm:mt-[65px] max-w-[100vw] 
  lg:block  md:block mysm:block  "
      >
        <div className=" mysm:max-w-[100vw] lg:max-w-[1200px]  flex justify-start items-center py-3 lg:px-5 mx-auto my-0">
          <h1 className="text-white/90 font-bold text-2xl    md:pl-5 mysm:pl-3 mysm:pt-2">
            커뮤니티 페이지
            <p className="py-2 text-sm">다양한 의견을 나눠봐요</p>
          </h1>
        </div>
      </div>
      <div className=" max-w-[100vw] lg:max-w-[1200px] flex flex-col  mx-auto my-0">
        <CommuContainer
          className="
        mysm:max-w-[100vw] lg:max-w-[1200px]
    
     lg:grid md:grid mysm:flex
      lg:grid-cols-[1fr,4fr,1.5fr]
       md:grid-cols-[0.9fr,4fr] 
       mysm:flex-col
        lg:px-5 
        md:px-0
        md:py-10
        mysm:pt-5
        mysm:pb-10
        relative
        "
        >
          <CommuCategory
            setCategory={setCategory}
            category={category}
          ></CommuCategory>
          <section>
            <ShowCommuList category={category}></ShowCommuList>
          </section>
          <aside>
            <PopularList></PopularList>
          </aside>
        </CommuContainer>
      </div>
    </div>
  );
};

const CommuContainer = styled.div``;
