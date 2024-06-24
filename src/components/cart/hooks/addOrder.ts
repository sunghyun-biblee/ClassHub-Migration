import axios from "api/axios";
import requests from "api/requests";

export async function addOrder(orderItemIdList: number[], userId: number) {
  const requestBody = {
    userId: userId,
    classIds: orderItemIdList,
  };
  try {
    const res = await axios.post(requests.order.addOrder, requestBody);

    return res;
  } catch (error) {
    console.log(error);
  }
}
