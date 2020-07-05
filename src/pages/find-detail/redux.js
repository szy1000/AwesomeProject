import {getNoteDetailReq, followNoteReq} from './api';
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
  dispatch(
    findDetailUpdate({
      init: true,
      data: {
        noteDetail,
      },
    }),
  );
  callback && callback();
};

export const followNote = (params, callback) => async dispatch => {
  const followNote = await followNoteReq(params || {});
  dispatch(
    findDetailUpdate({
      init: true,
      data: {
        followNote,
      },
    }),
  );
  callback && callback();
};
