import axios from "api/axios";
import requests from "api/requests";

export async function addOrder(orderItemIdList: number[], userId: number) {
  //   const reuqestBody = {
  //     classId: orderItemIdList,
  //   };

  //   //   orderItemIdList=[76] or [76,77,78]
  console.log(orderItemIdList);
  const requestBody = {
    userId: userId,
    classIds: orderItemIdList,
  };
  try {
    const res = await axios.post(requests.order.addOrder, requestBody);
    console.log(res);

    return res;
  } catch (error) {
    console.log(error);
  }
}
