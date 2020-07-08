import {getAllNoteReq} from './api';
// Actions
const UPDATE = 'FIND_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const find = (state = initState, action) => {
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
export const findUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const findInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const note = await getAllNoteReq(params || {});
  dispatch(
    findUpdate({
      init: true,
      data: {
        note,
      },
    }),
  );
  callback && callback();
};
