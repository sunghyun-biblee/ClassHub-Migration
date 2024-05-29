import axios from "api/axios";
import requests from "api/requests";

export async function getOrderList(userId: number) {
  console.log(userId);
  console.log(`${requests.order.getOrderProgressList}/${userId}`);
  try {
    const res = await axios.get(`${requests.order.getOrderProgressList}/3`);
    console.log(res);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
