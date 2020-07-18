import {getConcernReq} from './api';
// Actions
const UPDATE = 'CONCERN_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const concern = (state = initState, action) => {
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
export const concernUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const concernInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const concern = await getConcernReq(params || {});
  dispatch(
    concernUpdate({
      init: true,
      data: {
        concern,
      },
    }),
  );
  callback && callback();
};
