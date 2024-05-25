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
export async function fetchCommuList(url: string, page: number) {
  const data = await axios.get(url);
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
    console.log("질문 답변 상세조회 진입");
    const data = await axios.get(`/community/question/${CommunityId}`);
    return data.data.data;
  }

  if (category === "study") {
    const data = await axios.get(`/community/study/${CommunityId}`);
    console.log("스터디 상세조회 진입");
    return data.data.data;
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
