import React from "react";
import { IcommunityItem } from "./ShowCommuList";
import { useQueryClient } from "@tanstack/react-query";
import {
  selectCommuCommentinfo,
  selectCommuinfo,
} from "./hooks/fetchCommuArray";
import { useNavigate } from "react-router-dom";

interface IpopListItem {
  item: IcommunityItem;
  category: string;
}
export const PopularListItem = ({ item, category }: IpopListItem) => {
  const nav = useNavigate();
  const handleClick = () => {
    nav(`/community/${category}/${item.communityId}`);
  };
  const queryClient = useQueryClient();
  queryClient.prefetchQuery({
    queryKey: ["commuDetail", item.communityId],
    queryFn: () => selectCommuinfo(item.communityId, category),
  });
  queryClient.prefetchQuery({
    queryKey: ["commuDetailComment", item.communityId],
    queryFn: () => selectCommuCommentinfo(item.communityId),
  });
  return (
    <div className="flex justify-between w-[100%]" onClick={handleClick}>
      <h3 className="text-sm mr-2 font-semibold">{item.title}</h3>
      <p className="text-[14px] w-[50px] overflow-hidden whitespace-nowrap text-ellipsis">
        {item.nickname}
      </p>
    </div>
  );
};
