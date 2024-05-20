import { useQueryClient } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";

export type addCommentType = {
  userId: number;
  text: string;
  communityId: number | undefined;
};
export async function updateComment(commentId: number) {
  try {
    await axios.post(`${requests.comment.updateComment}/${commentId}`);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteComment(commentId: number) {
  try {
    await axios.delete(`${requests.comment.deleteComment}/${commentId}`);
  } catch (error) {
    console.log(error);
  }
}

export async function addComment(commentObj: addCommentType) {
  try {
    const res = await axios.post(requests.comment.addComment, commentObj);
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
