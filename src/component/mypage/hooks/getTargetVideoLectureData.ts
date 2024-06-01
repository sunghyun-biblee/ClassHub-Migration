import axios from "api/axios";
import requests from "api/requests";
export async function getTargetVideoLectureData(classid: number) {
  try {
    const res = await axios.get(
      `${requests.lecture.getUpdateLectrueData}/${classid}`
    );
    console.log(res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
