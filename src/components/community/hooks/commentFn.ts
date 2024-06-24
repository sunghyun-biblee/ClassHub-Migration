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
    await axios.post(
      `${requests.comment.updateComment}/${targetComment.commentId}`,
      requestBody
    );
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
    await axios.post(requests.comment.addComment, commentObj);
  } catch (error) {
    console.log(error);
  }
}
