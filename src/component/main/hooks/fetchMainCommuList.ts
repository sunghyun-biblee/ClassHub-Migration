import axios from "api/axios";
import requests from "api/requests";

export async function fetchMainCommuList() {
  try {
    const res = await axios.get(requests.community.mainPageCommunity);
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
