import { useQuery } from "@tanstack/react-query";
import { getTargetVideoLectureData } from "./getTargetVideoLectureData";

export function useUpdateLectureVideo(classid: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["targetLectureVideo"],
    queryFn: () => getTargetVideoLectureData(classid),
  });

  return {
    lectureVideoData: data,
    VideoDataIsLoading: isLoading,
    VideoDataIsError: isError,
    VideoDataError: error,
  };
}
