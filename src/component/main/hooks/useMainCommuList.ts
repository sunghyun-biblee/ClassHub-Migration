import { useQuery } from "@tanstack/react-query";
import { fetchMainCommuList } from "./fetchMainCommuList";

export function useMainCommuList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["MainCommuList"],
    queryFn: fetchMainCommuList,
  });

  return {
    mainCommuList: data,
    MCommuIsLoading: isLoading,
    MCommuIsError: isError,
    MCommuError: error,
  };
}
