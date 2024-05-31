import axios from "../../../api/axios";
import requests from "../../../api/requests";
import { Community } from "../Community";

export interface Icommuitem {
  id: number;
  title: string;
  name: string;
  likes: string;
  category: string;
  comment: string;
  overview: string;
}
export async function fetchCommuList(
  category: string,
  page: number,
  search: string
) {
  let url: string;
  console.log(category);
  console.log("fetchArray");
  if (category === "qna") {
    url = requests.community.getQuestionList;
  } else {
    url = requests.community.getStudyList;
  }
  const data = await axios.get(url, {
    params: {
      page: page,
      search: search,
      type: search ? "all" : "",
    },
  });

  return data;
}
export async function fetchPaymentedList(userid: number) {
  const data = await axios.get(`${requests.order.getOrderList}/${userid}`);
  return data;
}
export async function fetchStudyList(page: number) {
  const data = await axios.get(requests.community.getStudyList);
  return data;
}
export async function fetchQuestionList(page: number) {
  const data = await axios.get(requests.community.getQuestionList);
  return data;
}
export async function selectCommuinfo(CommunityId: number, category: string) {
  if (category === "qna") {
    const data = await axios.get(`/community/question/${CommunityId}`);

    return data.data;
  }

  if (category === "study") {
    const data = await axios.get(`/community/study/${CommunityId}`);
    return data.data;
  }
}
export async function selectCommuCommentinfo(CommunityId: number) {
  const data = await axios.get(requests.comment.getPostComment, {
    params: {
      community: CommunityId,
    },
  });
  return data;
}
export const fetchPopularList = async (category: string) => {
  if (category === "qna") {
    const res = await axios.get(requests.community.getQuestionOderByFavorite);
    console.log(res);
    return res;
  } else {
    const res = await axios.get(requests.community.getStudyOderByFavorite);
    console.log(res);
    return res;
  }
};
