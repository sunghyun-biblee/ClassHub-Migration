import { useQuery } from "@tanstack/react-query";
import { selectCommuCommentinfo } from "./fetchCommuArray";

export function useTargetPostComment(id: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["commuDetailComment", id],
    queryFn: () => selectCommuCommentinfo(id),
  });

  return {
    commentData: data?.data,
    isCommentLoading: isLoading,
    isCommentError: isError,
    comentError: error,
  };
}
