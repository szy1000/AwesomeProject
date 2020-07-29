import {queryBackDetailReq} from './api';
// Actions
const UPDATE = 'BACKGROUND_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const backgroundDetail = (state = initState, action) => {
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
export const backgroundDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const backgroundDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const detail = await queryBackDetailReq(params || {});
  dispatch(
    backgroundDetailUpdate({
      init: true,
      data: {
        detail,
      },
    }),
  );
  callback && callback();
};
