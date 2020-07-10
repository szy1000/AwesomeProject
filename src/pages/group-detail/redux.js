import {getGroupDetailReq} from './api';
// Actions
const UPDATE = 'GROUP_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const groupDetail = (state = initState, action) => {
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
export const groupDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const groupDetail = await getGroupDetailReq(params || {});
  dispatch(
    groupDetailUpdate({
      init: true,
      data: {
        groupDetail,
      },
    }),
  );
  callback && callback();
};
