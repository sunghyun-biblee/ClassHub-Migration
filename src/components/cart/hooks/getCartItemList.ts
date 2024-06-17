import axios from "api/axios";
import requests from "api/requests";

export async function getCartItemList(userId: number) {
  if (userId) {
    try {
      const res = await axios.get(`${requests.cart.getCartList}/${userId}`);

      console.log(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  } else {
    return null;
  }
}
