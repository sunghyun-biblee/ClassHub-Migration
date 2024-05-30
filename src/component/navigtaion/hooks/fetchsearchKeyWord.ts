import axios from "api/axios";
import requests from "api/requests";

export async function fetchsearchKeyWord(keyword: string) {
  try {
    const res = await axios.get(requests.lecture.getAllLecture, {
      params: {
        keyword: keyword,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
