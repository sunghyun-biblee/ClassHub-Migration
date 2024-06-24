import axios from "api/axios";
import requests from "api/requests";

export async function getOrderList(userId: number) {
  try {
    const res = await axios.get(
      `${requests.order.getOrderProgressList}/${userId}`
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
