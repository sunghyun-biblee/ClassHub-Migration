import axios from "api/axios";
import requests from "api/requests";
import { CartItemType } from "hooks/CartProvider";

type CartRes = {
  data: CartItemType[];
};
export async function getCartItemList(userId: number) {
  if (!userId) {
    alert("유저아이디가 없습니다");
    return;
  }

  try {
    const res = await axios.get(`${requests.cart.getCartList}/${userId}`);

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
