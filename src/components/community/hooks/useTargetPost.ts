import { useQuery } from "@tanstack/react-query";
import { selectCommuinfo } from "./fetchCommuArray";

export interface CommuInfo {
  commentCount: number;
  communityId: number;
  communityType: string;
  editDate: string;
  favoriteCount: number;
  image: string[];
  imageIds: number[];
  likeUsers: number[];
  nickname: string;
  regDate: string;
  text: string;
  title: string;
  userId: number;
  role: string;
  profilePicture: string;
}
export function useTargetPost(id: string, category: string) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["commuDetail", id],
    queryFn: () => selectCommuinfo(id, category),
  });

  return {
    postData: data,
    isPostLoading: isLoading,
    isPostError: isError,
    postError: error,
  };
}
