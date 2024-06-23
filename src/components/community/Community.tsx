import React, { useState } from "react";
import styled from "styled-components";
import { CommuCategory } from "./CommuCategory";
import { CommunityHeader } from "./CommunityHeader";
import { Outlet } from "react-router-dom";
import { useGetpathname } from "./hooks/getPathname";
import { useQueryClient } from "@tanstack/react-query";
import {
  fetchPopularList,
  fetchQuestionList,
  fetchStudyList,
} from "./hooks/fetchCommuArray";

export const Community = () => {
  const pathname = useGetpathname();
  const queryClient = useQueryClient();

  // queryClient.prefetchQuery({
  //   queryKey: ["qna", 1],
  //   queryFn: () => fetchQuestionList(1),
  // });
  // queryClient.prefetchQuery({
  //   queryKey: ["study", 1],
  //   queryFn: () => fetchStudyList(1),
  // });
  // queryClient.prefetchQuery({
  //   queryKey: [`popular_${pathname}`],
  //   queryFn: () => fetchPopularList(pathname),
  // });
  const [category, setCategory] = useState<string>("qna");

  return (
    <div>
      <CommunityHeader></CommunityHeader>
      <div className=" max-w-[100vw] lg:max-w-[1200px] flex flex-col  mx-auto my-0">
        <CommuContainer
          className={`
        mysm:max-w-[100vw] lg:max-w-[1200px]
        lg:px-5 
        md:px-0
        md:py-5
        mysm:py-5
        
        relative
${
  pathname === "addpost" || pathname === "modifyPost"
    ? "md:flex md:flex-col"
    : "md:grid lg:grid-cols-[1fr,4fr,1.5fr] md:grid-cols-[0.9fr,4fr] mysm:felx mysm:flex-col"
}
       `}
        >
          <CommuCategory setCategory={setCategory}></CommuCategory>
          <section>
            {/* <ShowCommuList></ShowCommuList> */}
            <Outlet></Outlet>
          </section>
        </CommuContainer>
      </div>
    </div>
  );
};

const CommuContainer = styled.div``;
