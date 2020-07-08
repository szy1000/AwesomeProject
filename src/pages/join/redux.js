import {getJoinReq, getMangeGroupReq} from './api';
// Actions
const UPDATE = 'JOIN_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const join = (state = initState, action) => {
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
export const joinUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const joinInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const join = await getJoinReq(params || {});
  dispatch(
    joinUpdate({
      init: true,
      data: {
        join,
      },
    }),
  );
  callback && callback();
};
