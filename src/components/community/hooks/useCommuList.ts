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
export function useCommuList(
  category: string,
  page: number,
  search: string,
  searchType: number
) {
  const { data, isLoading, isError, error, refetch } = useQuery<
    CommuListType,
    Error
  >({
    queryKey: [category, page, searchType],
    queryFn: () => fetchCommuList(category, page, search, searchType),
  });
  return { data, isLoading, isError, error, refetch };
}
