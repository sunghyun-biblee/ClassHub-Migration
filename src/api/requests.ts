const requests = {
  community: {
    addPost: "/community/post",
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
  },
  lecture: {
    lectureUpLoad: "/lecture/upload",
    lectureEdit: "/lecture/edit",
  },
  comment: {
    addComment: "/comment/post",
    editComment: "/comment/modify", // "/comment/modify/{userid}"
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
