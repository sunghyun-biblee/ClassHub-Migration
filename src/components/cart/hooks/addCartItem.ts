import axios from "api/axios";
import requests from "api/requests";
import { AxiosError } from "axios";

export async function addCartItem(classId: number, userId: number) {
  const reuqestBody = {
    userId: userId,
    classId: classId,
  };

  await axios
    .post(requests.cart.addCartItem, reuqestBody)
    .then((res) => {
      alert("장바구니에 추가되었습니다");
      return res.data;
    })
    .catch((error) => {
      alert(error.response.data);
      return;
    });
}
