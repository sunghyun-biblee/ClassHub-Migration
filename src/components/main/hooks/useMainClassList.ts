import { useQuery } from "@tanstack/react-query";
import { fetchClassList } from "components/class/hooks/useGetArray";

export function useMainClassList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classListAll"],
    queryFn: () => fetchClassList(0, 1),
  });

  return {
    mainClassList: data,
    mainClassIsLoading: isLoading,
    mainClassIsError: isError,
    mainClassError: error,
  };
}
