import {
  getNoteDetailReq,
  followNoteReq,
  starNoteReq,
  favoriteNoteReq,
  commentNoteReq,
  getNoteCommentReq,
  queryActionReq,
  unFollowNoteReq,
  unStarNoteReq,
  unFavoriteNoteReq,
  queryFollowUserReq,
} from './api';
// Actions
const UPDATE = 'FIND_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const findDetail = (state = initState, action) => {
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
export const findDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const findDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  const noteDetail = await getNoteDetailReq(params || {});
  const actionAll = await queryActionReq(params || {});
  const userAll = await queryFollowUserReq(noteDetail.user.id || {});
  const commentList = await getNoteCommentReq(params || {});

  dispatch(
    findDetailUpdate({
      init: true,
      data: {
        noteDetail,
        actionAll,
        userAll,
        commentList,
      },
    }),
  );
  callback && callback();
};

export const commentNote = (params, callback) => async dispatch => {
  console.log('comment params', params);
  const comment = await commentNoteReq(params || {});
  console.log('comment', comment);
  callback && callback();
};

export const followNote = (params, callback) => async (dispatch, getState) => {
  const {userAll} = await getState().findDetail.data;
  console.log('user id', params);
  let res = '';
  if (userAll.follow) {
    res = await unFollowNoteReq(params || {});
  } else {
    res = await followNoteReq(params || {});
  }
  callback && callback();
};

export const starNote = (params, callback) => async (dispatch, getState) => {
  const {actionAll} = await getState().findDetail.data;
  let res = '';
  if (actionAll.star) {
    res = await unStarNoteReq(params || {});
    console.log('unStarNoteReq', res);
  } else {
    res = await starNoteReq(params || {});
  }
  const {success} = res;
  if (success) {
    callback && callback();
  }

  // dispatch(
  //   findDetailUpdate({
  //     init: true,
  //     data: {
  //       followNote,
  //     },
  //   }),
  // );
};

export const favoriteNote = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {actionAll} = await getState().findDetail.data;
  let res = '';
  if (actionAll.favorite) {
    res = await unFavoriteNoteReq(params || {});
  } else {
    res = await favoriteNoteReq(params || {});
  }

  const {success} = res;
  if (success) {
    callback && callback();
  }
  // dispatch(
  //   findDetailUpdate({
  //     init: true,
  //     data: {
  //       followNote,
  //     },
  //   }),
  // );
  callback && callback();
};
