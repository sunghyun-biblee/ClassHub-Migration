import { useQueryClient } from "@tanstack/react-query";
import axios from "api/axios";
import requests from "api/requests";
import { commentType } from "../CommunityDeatil/CommuDetail";

export type addCommentType = {
  userId: number;
  text: string;
  communityId: number | undefined;
};
export async function updateComment(
  targetComment: commentType,
  userId: number
) {
  const requestBody = {
    userId: userId,
    text: targetComment.text,
    communityId: targetComment.communityId,
  };
  try {
    const res = await axios.post(
      `${requests.comment.updateComment}/${targetComment.commentId}`,
      requestBody
    );
    console.log("업데이트 진입");
    console.log(res.data);
  } catch (error) {
    console.log(error);
  }
}
export async function deleteComment(commentId: number) {
  try {
    await axios.delete(`${requests.comment.deleteComment}/${commentId}`);
    console.log("삭제 진입");
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
