import {postRegisterReq} from './api';
// Actions
const UPDATE = 'REGISTER_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const register = (state = initState, action) => {
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
export const registerUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const registerInit = (params, callback) => async dispatch => {
  const res = await postRegisterReq(params || {});
  alert(res)
  dispatch(
    registerUpdate({
      data: {
        res,
      },
    }),
  );
  callback && callback();
};
