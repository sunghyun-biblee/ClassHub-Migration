import React, { useState } from "react";
import styled from "styled-components";
import { CommuCategory } from "./CommuCategory";

import { CommunityHeader } from "./CommunityHeader";
import { Outlet } from "react-router-dom";
import { useGetpathname } from "./hooks/getPathname";

import requests from "../../api/requests";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchCommuList } from "./hooks/fetchCommuArray";

export const Community = () => {
  const pathname = useGetpathname();
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["question", 1],
    queryFn: fetchCommuList,
  });

  const [category, setCategory] = useState<string>("qna");
  console.log(pathname);
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
        mysm:pt-5
        mysm:pb-10
        relative
${
  pathname === "addpost"
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
