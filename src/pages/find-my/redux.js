import {getAllNoteReq} from './api';
// Actions
const UPDATE = 'FIND_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    note: {},
  },
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

export const findInit = (params, callback) => async (dispatch, getState) => {
  console.log('params', params);
  const {note} = getState().find.data;
  const res = await getAllNoteReq(params || {});
  console.log('res', res);

  let _res = res;
  if (note.data) {
    let temp = note.data.concat(res.data);
    res.data = [...temp];
    _res = res;
  }
  dispatch(
    findUpdate({
      init: true,
      data: {
        note: _res,
      },
    }),
  );
  callback && callback();
};
