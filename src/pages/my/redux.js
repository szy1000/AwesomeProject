import {getUserInfoReq} from './api';
// Actions
const UPDATE = 'MY_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const my = (state = initState, action) => {
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
export const myUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const myInit = (params, callback) => async dispatch => {
  const userInfo = await getUserInfoReq(params || {});
  dispatch(
    myUpdate({
      init: true,
      data: {
        userInfo,
      },
    }),
  );
  callback && callback();
};
