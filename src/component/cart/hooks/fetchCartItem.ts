import axios from "api/axios";
import requests from "api/requests";

export async function EachDeleteCart() {
  const res = axios.post(requests.cart.deleteCartItem);
}
