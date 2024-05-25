import { useQuery } from "@tanstack/react-query";
import requests from "api/requests";
import { fetchCommuList } from "./fetchCommuArray";

export function useCommuList(category: string, page: number) {
  let type;
  let url: string;
  if (category === "qna") {
    type = "question";
    url = requests.community.getQuestionList;
  } else {
    type = "study";
    url = requests.community.getStudyList;
  }
  console.log(type);
  console.log(url);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: [type, page],
    queryFn: () => fetchCommuList(url, page),
  });
  return { data, isLoading, isError, error };
}
