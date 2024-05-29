import axios from "api/axios";
import requests from "api/requests";

export async function deleteCartItem(cartid: number) {
  const reuqestBody = {
    cartId: cartid,
  };
  try {
    const res = await axios.post(requests.cart.deleteCartItem, reuqestBody);
    console.log(res);
    return res;
  } catch (error) {}
}
