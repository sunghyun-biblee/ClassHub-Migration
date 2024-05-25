import axios from "api/axios";
import requests from "api/requests";

export async function getCartItemList(userId: number) {
  try {
    const res = await axios.get(`${requests.cart.getCartList}/${userId}`);

    console.log(res.data.data);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
}
