import {queryServiceReq, sendServiceReq} from './api';
// Actions
const UPDATE = 'SERVICE_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {},
};

export const service = (state = initState, action) => {
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
export const serviceUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const serviceInit = (params, callback) => async (dispatch, getState) => {
  const res = await queryServiceReq({pageNumber: 1, pageSize: 20});
  dispatch(
    serviceUpdate({
      init: true,
      _data: {
        ...res,
      },
    }),
  );
  callback && callback();
};

export const sendMsg = (params, callback) => async (dispatch, getState) => {
  const res = await sendServiceReq(params);
  console.log('send list', res);
  serviceInit()(dispatch, getState);
  // callback && callback();
};
