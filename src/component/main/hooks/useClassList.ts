import { useQuery } from "@tanstack/react-query";
import { fetchClassList } from "component/class/hooks/useGetArray";

export function useClassList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["classListAll"],
    queryFn: fetchClassList,
  });
  console.log(data);
  return {
    mainClassList: data,
    mainClassIsLoading: isLoading,
    mainClassIsError: isError,
    mainClassError: error,
  };
}
