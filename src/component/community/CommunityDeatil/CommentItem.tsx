import React from "react";
import { commentType } from "./CommuDetail";
import { userType } from "hooks/fetchUserData";
import { useAuth } from "hooks/AuthProvider";

interface ICommentProp {
  item: commentType;
  isEdit: boolean;
  editComment: string;
  editCommentId: string | number;
  handleChangeEditComment: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleUpdateComment: (item: commentType) => void;
  setEditComment: (value: string) => void;
  setEditCommentId: (value: string | number) => void;
  setIsEdit: (value: boolean) => void;
  handleDeleteComment: (value: number) => void;
}

export const CommentItem = ({
  item,

  isEdit,
  editComment,
  editCommentId,
  handleChangeEditComment,
  handleUpdateComment,
  setEditComment,
  setEditCommentId,
  handleDeleteComment,
  setIsEdit,
}: ICommentProp) => {
  const { userData } = useAuth();
  return (
    <li className="border-b-[1px] py-1 px-3 flex flex-col my-1 justify-between">
      <p className="flex items-center justify-between">
        <strong className="py-2 mr-1">{item.userId}</strong>
        <span className="text-gray-600 font-semibold">{item.regDate}</span>
      </p>
      <div className="flex justify-between pt-3 pb-1 items-end">
        {isEdit &&
        userData.userId === item.userId &&
        item.commentId === editCommentId ? (
          <input
            type="text"
            value={editComment}
            onChange={handleChangeEditComment}
            className="border-[1px] py-1 px-2 rounded-md w-[70%]"
          />
        ) : (
          <span className="py-1 w-[75%]">{item.text}</span>
        )}
        <div className="text-gray-500 font-semibold">
          {userData.userId === item.userId ? (
            <>
              {isEdit ? (
                <>
                  <button
                    className="text-sm mr-2"
                    onClick={() => {
                      handleUpdateComment(item);
                    }}
                  >
                    확인
                  </button>
                  <button
                    className="text-sm"
                    onClick={() =>
                      // CommentDeleteMutation.mutate(item.commentId)

                      setIsEdit(false)
                    }
                  >
                    취소
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-sm mr-2"
                    onClick={() => {
                      setEditCommentId(item.commentId);
                      setEditComment(item.text);
                      if (isEdit) {
                        setIsEdit(false);
                      } else {
                        setIsEdit(true);
                      }
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="text-sm"
                    onClick={
                      () => handleDeleteComment(item.commentId)
                      // console.log("")
                    }
                  >
                    삭제
                  </button>
                </>
              )}
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </li>
  );
};
