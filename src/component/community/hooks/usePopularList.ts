import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";

export function usePopularList(category: string) {
  const fetchPopularList = async (category: string) => {
    if (category === "qna") {
      const res = await axios.get(requests.community.getQuestionOderByFavorite);
      console.log(res);
      return res;
    } else {
      const res = await axios.get(requests.community.getStudyOderByFavorite);
      console.log(res);
      return res;
    }
  };
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [`popular_${category}`],
    queryFn: () => fetchPopularList(category),
  });
  return {
    listData: data?.data.data,
    listIsLoading: isLoading,
    listIsError: isError,
    listError: error,
  };
}
