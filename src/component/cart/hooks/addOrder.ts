import axios from "api/axios";
import requests from "api/requests";

export async function addOrder(orderItemIdList: number[], userId: number) {
  const reuqestBody = {
    classId: orderItemIdList,
  };

  //   orderItemIdList=[76] or [76,77,78]

  try {
    const res = await axios.post(requests.order.addOrder, reuqestBody);
    console.log(res.data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
