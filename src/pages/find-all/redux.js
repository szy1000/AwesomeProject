import {getAllNoteReq} from './api';
// Actions
const UPDATE = 'FIND_ALL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    note: {},
  },
};

export const findAll = (state = initState, action) => {
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
export const findAllUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const findAllInit = (params, callback) => async (dispatch, getState) => {
  console.log('params', params);
  const {note} = getState().findAll.data;
  const res = await getAllNoteReq(params || {});
  console.log('res', res);

  let _res = res;
  if (!params.init && !params.refresh) {
    if (note.data) {
      let temp = note.data.concat(res.data);
      res.data = [...temp];
      _res = res;
    }
  }
  dispatch(
    findAllUpdate({
      init: true,
      data: {
        note: _res,
      },
    }),
  );
  callback && callback();
};
