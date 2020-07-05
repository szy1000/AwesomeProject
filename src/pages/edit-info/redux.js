import {getUserInfoReq} from './api';
// Actions
const UPDATE = 'EDIT_INFO_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const editInfo = (state = initState, action) => {
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
export const editInfoUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const editInfoInit = (params, callback) => async dispatch => {
  const userInfo = await getUserInfoReq(params || {});
  dispatch(
    editInfoUpdate({
      init: true,
      data: {
        ...userInfo,
      },
    }),
  );
  callback && callback();
};
