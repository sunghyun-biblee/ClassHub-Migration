import axios from "api/axios";
import requests from "api/requests";

export async function addCartItem(classId: number, userId: number) {
  const reuqestBody = {
    userId: userId,
    classId: classId,
  };
  try {
    const res = await axios.post(requests.cart.addCartItem, reuqestBody);
    console.log(res.data);
    alert("장바구니에 추가되었습니다");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
