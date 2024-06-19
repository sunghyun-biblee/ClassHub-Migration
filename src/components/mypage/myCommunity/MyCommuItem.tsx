import React from "react";
import {
  Icommuitem,
  selectCommuinfo,
} from "../../community/hooks/fetchCommuArray";
import del from "../../../assets/img/Trash.svg";
import right from "../../../assets/img/carousel/rigthArrow.svg";
import { CommuInfo } from "components/community/hooks/useTargetPost";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

interface IcommuProp {
  item: CommuInfo;
}

export const MyCommuItem = ({ item }: IcommuProp) => {
  const nav = useNavigate();
  const category =
    item.communityType === "1"
      ? "qna"
      : item.communityType === "2" || item.communityType === "3"
      ? "study"
      : "";
  const handleClick = () => {
    nav(`/community/${category}/${item.communityId}`);
  };
  const queryClient = useQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["commuDetail", item.communityId],
    queryFn: () => selectCommuinfo(item.communityId, category),
  });

  const renderCategory = (typeValue: number) => {
    switch (typeValue) {
      case 1:
        return "질문/답변";
      case 2:
        return "스터디 모집";
      case 3:
        return "스터디 모집완료";

      default:
        break;
    }
  };

  return (
    <div className="border-[1px] shadow-[0px_1px_6px_rgba(149,157,165,0.3)] rounded-md">
      <ul className="grid md:grid-cols-[0.5fr,1fr,0.6fr,0.6fr,0.4fr,0.3fr] mysm:grid-cols-[1fr,1fr,1fr,0.7fr,0.7fr] text-center items-center">
        <li className="py-4 font-semibold text-indigo-950 md:block mysm:hidden">
          {item.communityId}
        </li>
        <li className="py-4 md:text-base mysm:text-sm md:px-1 mysm:pl-2 overflow-hidden w-[100%]  whitespace-nowrap text-ellipsis ">
          {item.title}
        </li>
        <li className="py-4">{item.regDate}</li>
        <li className="py-4">
          {renderCategory(parseInt(item.communityType))}{" "}
        </li>
        <li
          className="flex justify-center py-4 cursor-pointer"
          onClick={handleClick}
        >
          <img src={right} alt="" className="w-5" />
        </li>
        <li className="flex justify-center py-4 cursor-pointer">
          <span>{item.favoriteCount}</span>
        </li>
      </ul>
    </div>
  );
};
