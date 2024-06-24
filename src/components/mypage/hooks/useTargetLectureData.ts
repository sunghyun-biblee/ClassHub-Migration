import { useQuery } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";
import { IRegistClassProp } from "../teacherPage/RegistClassItem";
async function fetchLectureList(classid: number) {
  try {
    const res: IRegistClassProp = await axios.get(
      `${requests.lecture.getTargetLecture}/${classid}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchMyUploadLectureList(userid: number) {
  try {
    const res = await axios.get(
      `${requests.lecture.getMyUploadLectureList}/${userid}`
    );
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export function useTargetLectureData(classid: number) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["targetLecture", classid],
    queryFn: () => fetchLectureList(classid),
  });

  return {
    lectureData: data,
    lectureIsLoading: isLoading,
    lectureIsError: isError,
    lectureError: error,
  };
}
