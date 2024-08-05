import React from "react";
import rightArrow from "assets/img/carousel/rigthArrow.svg";

import { IcommunityItem } from "components/community/ShowCommuList";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { selectCommuinfo } from "components/community/hooks/fetchCommuArray";

interface commnuProp {
  mainCommuList: IcommunityItem[];
  MCommuIsLoading: boolean;
  MCommuIsError: boolean;
  MCommuError: Error | null;
}

export const PreviewCommu = ({
  mainCommuList,
  MCommuIsLoading,
  MCommuIsError,
  MCommuError,
}: commnuProp) => {
  const nav = useNavigate();
  let category: string;
  const queryClient = useQueryClient();

  const renderText = (overview: string) => {
    const text = overview;
    let newText;
    if (text.length > 20) {
      newText = text.slice(0, 50) + "...";
      console.log(newText);
      return newText;
    }

    return text;
  };
  const renderCategory = (categoryType: string) => {
    switch (categoryType) {
      case "1":
        return "질문 답변";
      case "2":
        return "스터디 모집중";
      case "3":
        return "스터디 모집완료";
      default:
        return "없음";
    }
  };
  const handleShowDetail = (communityType: string, CommunityId: number) => {
    switch (communityType) {
      case "1":
        category = "qna";
        break;
      case "2" || "3":
        category = "study";
        break;
      default:
        break;
    }

    if (category) {
      queryClient.prefetchQuery({
        queryKey: ["commuDetail", CommunityId],
        queryFn: () => selectCommuinfo(CommunityId.toString(), category),
      });

      nav(`/community/${category}/${CommunityId}`);
    }
  };
  if (MCommuIsLoading) {
    return <span>로딩중</span>;
  }
  if (MCommuIsError) {
    return <span>{MCommuError?.message}</span>;
  }

  return (
    <div className=" py-10 px-5 w-[100%] md:px-3 mysm:px-2 ">
      <div className="flex justify-between lg:pb-2  mysm:pb-1">
        <h1 className=" font-extrabold ">📋 커뮤니티 </h1>
        <div className="pb-3 flex items-center cursor-pointer">
          <Link to={"/community/qna"}>더보기</Link>
          <img src={rightArrow} alt="" className="w-5 h-auto ml-2" />
        </div>
      </div>
      <section className="grid grid-cols-3 gap-3 py-3">
        {mainCommuList.slice(0, 3).map((item, index) => (
          <article
            className="flex flex-col justify-between border-[1px] p-2 rounded-md"
            key={`${item.userId + "index" + item.communityId + item.regDate}`}
            onClick={() =>
              handleShowDetail(item.communityType, item.communityId)
            }
          >
            <div className="md:px-2">
              <h1
                className="h-auto font-bold lg:text-lg  md:text-base mysm:text-sm  pt-[2px] w-[100%]
                overflow-hidden whitespace-nowrap text-ellipsis"
              >
                {item.title}
              </h1>

              <p className="h-20 pt-1  font-medium  lg:text-base   md:text-sm mysm:text-[10px] ">
                {renderText(item.text)}
              </p>
            </div>
            <div className="flex justify-between items-center px-2  mysm:px-0">
              <h3 className="p-1  md:text-sm mysm:text-[11px] text-gray-900/90 font-semibold">
                {item.nickname}
              </h3>
              <h4 className="text-zinc-500 md:text-sm mysm:text-[8px] md:pr-1">
                {renderCategory(item.communityType)}
              </h4>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};
