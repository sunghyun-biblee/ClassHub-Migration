import { useQuery } from "@tanstack/react-query";
import { selectClassinfo } from "components/class/hooks/useGetArray";
import { useGetpathname } from "components/community/hooks/getPathname";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { LearnHeader } from "./LearnHeader";
import { LectureVideoList } from "./LectureVideoList";

export const LearningPage = () => {
  const path = useGetpathname();
  const id = parseInt(path);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classDeatil", id],
    queryFn: () => selectClassinfo(id),
  });

  if (data && data[0].title) {
    document.title = data[0].title;
  }

  return (
    <LearnContainer
      className="lg:pt-[100px] md:pt-[90px] mysm:pt-[90px] max-w-[100vw] lg:max-w-[1200px]
  lg:grid grid-cols-[1fr,4fr] md:block mysm:block  "
    >
      {isLoading ? (
        <div>로딩중</div>
      ) : (
        data && (
          <div className="flex flex-col w-[100%]">
            <LearnHeader data={data[0]}></LearnHeader>
            <LectureVideoList></LectureVideoList>
          </div>
        )
      )}
    </LearnContainer>
  );
};

const LearnContainer = styled.div`
  margin: 0 auto;
`;
