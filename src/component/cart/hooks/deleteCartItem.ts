import axios from "api/axios";
import requests from "api/requests";
import { CartItemType } from "hooks/CartProvider";

export async function deleteCartItem(cartid: number) {
  const reuqestBody = {
    cartId: cartid,
  };
  try {
    const res = await axios.post(requests.cart.deleteCartItem, reuqestBody);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}

export async function cartClear(userId: number) {
  const reuqestBody = {
    userId: userId,
  };
  try {
    console.log(userId);
    const res = await axios.post(requests.cart.clearCart, reuqestBody);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
}
