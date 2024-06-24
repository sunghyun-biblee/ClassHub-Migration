import axios from "api/axios";
import requests from "api/requests";

export async function fetchsearchKeyWord(keyword: string, page: number) {
  try {
    const res = await axios.get(requests.lecture.getAllLecture, {
      params: {
        keyword: keyword,
        page: page,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
