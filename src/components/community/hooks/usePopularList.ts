import { useQuery } from "@tanstack/react-query";

import { fetchPopularList } from "./fetchCommuArray";

export function usePopularList(category: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`popular_${category}`],
    queryFn: () => fetchPopularList(category),
  });
  return {
    listData: data?.data,
    listIsLoading: isLoading,
    listIsError: isError,
    listError: error,
  };
}
