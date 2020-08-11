import {getMessageReq, postReadAllReq} from './api';
// Actions
const UPDATE = 'MESSAGE_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const message = (state = initState, action) => {
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
export const messageUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const messageInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const msg = await getMessageReq(params || {});
  const all = await postReadAllReq(params || {});
  dispatch(
    messageUpdate({
      init: true,
      data: {
        msg,
      },
    }),
  );
  callback && callback();
};
