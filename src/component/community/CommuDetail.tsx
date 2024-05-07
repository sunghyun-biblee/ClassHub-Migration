import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { selectCommuinfo } from "./hook/fetchCommuArray";
import preview from "../../assets/img/preview.jpg";
import likes from "../../assets/img/likes.svg";
import comment from "../../assets/img/comment.svg";
import styled from "styled-components";
export const CommuDetail = () => {
  const [selectClass, setSelectClass] = useState();

  const { pathname } = useLocation();
  const id = parseInt(pathname.split("/")[2], 10);
  console.log(id);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["commuDeatil", id],
    queryFn: () => selectCommuinfo(id),
  });
  console.log(data);
  return (
    <div
      className="
  lg:w-[1200px] mysm:w-[100vw]  lg:pt-[90px] md:pt-[80px] mysm:pt-[80px] mx-auto my-0"
    >
      {data && (
        <section className="grid grid-cols-[4fr,1.5fr] lg:w-[1200px] mysm:w-[100vw]">
          <div className="border-r-[1px] border-solid border-l-[1px] lg:px-5">
            <article className="pt-7">
              <h1 className="py-5 px-5 text-2xl font-extrabold">
                {" "}
                {data[0].title}
              </h1>
              <div className="flex justify-between px-5 pb-5 pt-2 text-gray-500 ">
                <p>2024-05-07</p>
                <div className="flex ">
                  <img src={likes} alt="likes" className="lg:w-5 md:w-5" />
                  <p>{data[0].likes}</p>
                </div>
              </div>
            </article>
            <Overview className="p-5 border-t-[1px]  border-b-[1px] border-solid">
              <div>
                <p>{data[0].overview}</p>
              </div>
            </Overview>
            <article className="p-5 ">
              <div className="flex items-center">
                <h4 className="font-semibold text-gray-700 mr-3">댓글</h4>
                <p className="font-bold text-blue-600 text-lg underline">
                  {/* {data[0].comment} */} 0
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
          <Profile className="flex  lg:px-5 md:px-2 lg:py-8 md:py-5 flex-col ">
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
          </Profile>
        </section>
      )}
    </div>
  );
};

const Profile = styled.article``;
const Overview = styled.article``;
