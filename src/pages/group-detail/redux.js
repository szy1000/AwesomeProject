import {
  getGroupDetailReq,
  getCommentReq,
  makeCommentReq,
  thumbUpDiscussionReq,
  favoriteDiscussionReq,
} from './api';
// Actions
const UPDATE = 'GROUP_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const groupDetail = (state = initState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

// Action Creators
export const groupDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const groupDetail = await getGroupDetailReq(params);
  const comment = await getCommentReq(params);
  dispatch(
    groupDetailUpdate({
      init: true,
      data: {
        groupDetail,
        comment,
      },
    }),
  );
  callback && callback();
};

export const makeComment = (params, callback) => async dispatch => {
  console.log(params)
  const res = await makeCommentReq(params);
  console.log(res)
  // const {success, error} = res;
  // if (success) {
  //   callback && callback();
  // } else {
  //   alert(error);
  // }
};

export const thumbUpDis = (params, callback) => async dispatch => {
  const res = await thumbUpDiscussionReq(params);
  const {success, error} = res;
  if (success) {
    callback && callback();
  } else {
    alert(error);
  }
};

export const favoriteDis = (params, callback) => async dispatch => {
  const res = await favoriteDiscussionReq(params);
  const {success, error} = res;
  if (success) {
    callback && callback();
  } else {
    alert(error);
  }
};
