import {getDataReq} from './api';
// Actions
const UPDATE = 'JOIN_TAB_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const joinTab = (state = initState, action) => {
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
export const joinTabUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const joinTabInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)

  const joinTab = await getDataReq(params || {});
  dispatch(
    joinTabUpdate({
      init: true,
      data: {
        joinTab,
      },
    }),
  );
  callback && callback();
};
