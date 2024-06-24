import axios from "api/axios";
import requests from "api/requests";

export async function deleteOrder(classid: number, userid: number) {
  const requestBody = {
    userId: userid,
    classId: classid,
  };
  try {
    const res = await axios.post(requests.order.deletOrder, requestBody);

    return res;
  } catch (error) {
    console.log(error);
  }
}
