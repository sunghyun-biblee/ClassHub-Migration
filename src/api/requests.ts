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
    mainPageCommunity: "/community/mainpage",
    mypageCommunity: "/community/quest",
  },
  lecture: {
    addLectureMaterial: "/lecture/uploadAndSyncMaterials",
    addLecture: "/lecture/uploadClass",
    addFavoriteLecture: "/lecture/favoriteLecture",
    editLectureMaterial: "/lecture/editMaterial",
    editTeacher: "/lecture/editInstructor",
    editLecture: "/lecture/editClass",
    removeFavoriteLecture: "/lecture/clearFavoriteLecture",
    addInstructor: "/lecture/addInstructor",
    getLectureMaterial: "/lecture/selectMaterial",
    getCategoryLecture: "/lecture/selectByCategory",
    getAllLecture: "/lecture/selectAll",
    getTargetLecture: "/lecture/selectById",
    getTargetLectureDetail: "/lecture/selectClassDetail",
    getTargetLectureLearningData: "/lecture/selectLearningDasta",
    getLectureListCategory: "/lecture/selectByCategory",
    getUpdateLectrueData: "/lecture/responseForUpdateVideo", //${classid}
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
  order: {
    addOrder: "/order/add",
    deletOrder: "/order/delete",
    getOrderList: "/order/list",
    getOrderProgressList: "/order/in-progress",
    getTargetOrderItem: "/order/detail",
  },
  payment: {
    prepare: "/payments/prepare",
    cancel: "/payments/cancel",
    addPaymentInfo: "/payments/add",
    getPaymentItem: "/payments", //imp_uid
    getPaymentPrepare: "/payments/prepare", //  merchant_uid
    getPortOneToken: "/access-token",
  },
  like: {
    postLike: "/favorite/community",
    commentLike: "/favorite/comment",
  },
  user: {
    updateUser: "/updateUserInfo",
    updateUserImg: "/updateUserImage",
  },
};

export default requests;
