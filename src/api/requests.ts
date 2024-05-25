const requests = {
  community: {
    addPost: "/community/postBoard",
    addPostImg: "/community/postImage",
    editPost: "/community/modify", //" /community/modify/{communityId}"
    getStudyPost: "/community/study", // "/community/study/{communityId}"
    getStudyList: "/community/studies",
    getStudyListStatus: "/community/studies/status",
    getStudyOderByFavorite: "/community/studies/orderByFavorite",
    getStudyOderByComment: "/community/studies/orderByComment",
    getQuestionPost: "/community/question", // "/community/question/{communityId}
    getQuestionList: "/community/questions",
    getQuestionOderByFavorite: "/community/questions/orderByFavorite",
    getQuestionOderByComment: "/community/questions/orderByComment",
    deleteImg: "/community/delete/image",
    updatePost: "/community/modify/board",
  },
  lecture: {
    lectureUpLoad: "/lecture/upload",
    lectureEdit: "/lecture/edit",
    addInstructor: "/lecture/addInstructor",
    addLecture: "/lecture/uploadClass",
  },
  comment: {
    addComment: "/comment/post",
    updateComment: "/comment/modify", // "/comment/modify/{userid}"
    getPostComment: "/comment/list",
    getTargetComment: "/comment/id", // "/comment/id/${userid}"
    deleteComment: "/comment/delete/id", // "/comment/delete/id/${userid}"
  },
  cart: {
    addCartItem: "/cart/add",
    deleteCartItem: "/cart/delete",
    clearCart: "/cart/clear",
    getCartList: "/cart/list",
  },
  like: {
    postLike: "/favorite/community",
    commentLike: "/favorite/comment",
  },
};

export default requests;
