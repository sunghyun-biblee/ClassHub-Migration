import { useQuery } from "@tanstack/react-query";

import { fetchCommuList } from "./fetchCommuArray";
import { IcommunityItem } from "../ShowCommuList";

// interface CommuListType {
//   data: {
//     contents: IcommunityItem[];
//     currentPageNum: number;
//     totalNum: number;
//     leftEndNum: number;
//     rightEndNum: number;
//   };
// }
export function useCommuList(
  category: string,
  search: string,
  searchType: number
) {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [category, searchType],
    // queryFn: () => fetchCommuList(category, page, search, searchType),
    // queryFn: () => fbPostListQuery(),
  });
  return { data, isLoading, isError, error, refetch };
}
