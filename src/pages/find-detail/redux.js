import {
  getNoteDetailReq,
  followNoteReq,
  starNoteReq,
  favoriteNoteReq,
  commentNoteReq,
  getNoteCommentReq,
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
  // console.log(init)
  const noteDetail = await getNoteDetailReq(params || {});
  const commentList = await getNoteCommentReq(params || {});
  dispatch(
    findDetailUpdate({
      init: true,
      data: {
        noteDetail,
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

export const followNote = (params, callback) => async dispatch => {
  const followNote = await followNoteReq(params || {});
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

export const starNote = (params, callback) => async dispatch => {
  const res = await starNoteReq(params || {});
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

export const favoriteNote = (params, callback) => async dispatch => {
  const followNote = await favoriteNoteReq(params || {});
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
