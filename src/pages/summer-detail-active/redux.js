import {querySummerProjectReq} from './api';
// Actions
const UPDATE = 'SUMMER_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {
    listData: {},
  },
};

export const summerDetail = (state = initState, action) => {
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
export const summerDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const summerDetailInit = (params, callback) => async dispatch => {
  const res = await querySummerProjectReq(params || {});

  dispatch(
    summerDetailUpdate({
      init: true,
      data: {
        res,
      },
    }),
  );
  callback && callback();
};
