import { useQuery } from "@tanstack/react-query";
import requests from "api/requests";
import { fetchCommuList } from "./fetchCommuArray";
import { IcommunityItem } from "../ShowCommuList";

interface CommuListType {
  data: {
    contents: IcommunityItem[];
    currentPageNum: number;
    totalNum: number;
    leftEndNum: number;
    rightEndNum: number;
  };
}
export function useCommuList(category: string, page: number, search: string) {
  const { data, isLoading, isError, error, refetch } = useQuery<
    CommuListType,
    Error
  >({
    queryKey: [category, page],
    queryFn: () => fetchCommuList(category, page, search),
  });
  return { data, isLoading, isError, error, refetch };
}
