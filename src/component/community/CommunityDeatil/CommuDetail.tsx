import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { selectCommuinfo } from "../hook/fetchCommuArray";

import likes from "../../../assets/img/likes.svg";
import comment from "../../../assets/img/comment.svg";
import styled from "styled-components";
import { DetailProfile } from "./DetailProfile";
export const CommuDetail = () => {
  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[3], 10);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["commuDeatil", id],
    queryFn: () => selectCommuinfo(id),
  });

  return (
    <div
      className="
  lg:w-[1200px] mysm:w-[100vw]  lg:pt-[90px] md:pt-[80px] mysm:pt-[80px] mx-auto my-0"
    >
      {data && (
        <section
          className="md:grid md:grid-cols-[4fr,1.5fr] lg:w-[1200px] 
        mysm:flex
        mysm:flex-col
        
        mysm:w-[100vw]"
        >
          <div className="lg:border-x-[1px]  md:border-r-[1px] lg:mr-5">
            <article className="md:pt-5 md:border-0 mysm:border-b-[1px]">
              <div
                className="mysm:block md:hidden px-1 md:border-0 mysm:border-b-[1px]
              
              
              "
              >
                <DetailProfile name={"admin"} category={"학생"}></DetailProfile>
              </div>
              <h1 className="py-5 px-5 text-2xl font-extrabold">
                {data.title}
              </h1>
              <div className="flex justify-between md:px-5 mysm:pl-5 mysm:pr-10  pb-5 pt-2 text-gray-500 ">
                <p>2024-05-07</p>
                <div className="flex ">
                  <img src={likes} alt="likes" className="lg:w-5 md:w-5" />
                  <p>{data.likes}</p>
                </div>
              </div>
            </article>
            <Overview className="p-5 md:border-t-[1px]  border-b-[1px] border-solid">
              <div>
                <p>{data.text}</p>
              </div>
            </Overview>
            <article className="p-5 ">
              <div className="flex items-center">
                <h4 className="font-semibold text-gray-700">댓글</h4>
                <img src={comment} alt="" className="w-5  mr-2" />
                <p className="font-bold text-blue-600 text-lg underline">
                  {data.comment} 0
                </p>
              </div>
              <div className="py-5 flex flex-col items-end">
                <textarea
                  name=""
                  id=""
                  placeholder="답변을 남겨주세요"
                  className="border-[1px] w-[100%] resize-none rounded-md focus:outline-blue-400 p-2
                  shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
                ></textarea>
                <button className=" border-[1px] p-1 mt-2 rounded-md bg-blue-400 text-white font-semibold shadow-[0px_8px_24px_rgba(149,157,165,0.2)] lg:w-20 md:w-14 text-center lg:text-base md:text-sm">
                  등록
                </button>
              </div>
            </article>
          </div>
          <div className="mysm:hidden md:block">
            <DetailProfile name={"admin"} category={"학생"}></DetailProfile>
          </div>
        </section>
      )}
    </div>
  );
};

const Overview = styled.article``;
{
  /* <Profile className="flex  lg:px-5 md:px-2 lg:py-8 md:py-5 flex-col ">
            <div
              className="flex justify-between border-[1px] lg:p-3 md:p-2 rounded-xl
            shadow-[0px_8px_24px_rgba(149,157,165,0.2)]"
            >
              <div className=" flex flex-col justify-between">
                <p className="font-bold">{data[0].name}</p>
                <p className="text-sm text-gray-400">{data[0].category}</p>
              </div>
              <img
                src={preview}
                alt=""
                className="lg:w-44 md:w-28
               h-auto object-cover rounded-2xl"
              />
            </div>
          </Profile> */
}
