import axios from "api/axios";
import requests from "api/requests";
import { Community } from "../Community";
import { db } from "chFirebase";
import { doc, DocumentData, getDoc } from "firebase/firestore";
import { CHPostData } from "./useFbPostListQuery";

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
  search: string,
  searchType: number
) {
  let url: string;
  if (searchType >= 2 && category === "study") {
    const data = await axios.get(requests.community.getStudyListStatus, {
      params: {
        studyStatus: searchType,
        page: page,
        search: search,
        type: search ? "all" : "",
      },
    });

    return data;
  } else {
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
}
export async function fetchMyStudyList(userid: number) {
  const data = await axios.get(`${requests.lecture.MyStudyList}/${userid}`);
  return data.data;
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
export async function fetchMyCommuList(userID: number) {
  try {
    if (userID === 0) {
      alert("정상적인 접근이 아닙니다");
      return [];
    }
    const res = await axios.get(requests.community.mypageCommunity, {
      params: {
        userId: userID,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
}
export async function selectCommuinfo(CommunityId: string, category: string) {
  const docRef = doc(db, "Posts", CommunityId);
  try {
    const docSnap = await getDoc(docRef);
    const postData = { ...docSnap.data(), docId: CommunityId };
    return postData as CHPostData;
  } catch (e) {
    console.log(e);
  }
}
export async function selectCommuCommentinfo(CommunityId: number | string) {
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

    return res;
  } else {
    const res = await axios.get(requests.community.getStudyOderByFavorite);

    return res;
  }
};
