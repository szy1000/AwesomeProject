import {queryKeysReq} from './api';
// Actions
const UPDATE = 'SEARCH_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const search = (state = initState, action) => {
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
export const searchUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const searchInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const res = await queryKeysReq(params);
  dispatch(
    searchUpdate({
      init: true,
      data: {
        res,
      },
    }),
  );
  callback && callback();
};
