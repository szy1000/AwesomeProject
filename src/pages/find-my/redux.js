import {getAllNoteReq} from './api';
// Actions
const UPDATE = 'FIND_MY_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    note: {},
  },
};

export const findMy = (state = initState, action) => {
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
export const findMyUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const findMyInit = (params, callback) => async (dispatch, getState) => {
  console.log('params', params);
  const {note} = getState().findMy.data;
  const res = await getAllNoteReq(params || {});
  console.log('findMy', res);

  let _res = res;
  if (!params.refresh) {
    if (note.data) {
      let temp = note.data.concat(res.data);
      res.data = [...temp];
      _res = res;
    }
  }

  dispatch(
    findMyUpdate({
      init: true,
      data: {
        note: _res,
      },
    }),
  );
  callback && callback();
};
