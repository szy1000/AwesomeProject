import {getDataReq} from './api';
// Actions
const UPDATE = 'PUBLISH_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const publish = (state = initState, action) => {
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
export const publishUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const publishInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const publish = await getDataReq(params || {});

  dispatch(
    publishUpdate({
      init: true,
      data: {
        publish,
      },
    }),
  );
  callback && callback();
};
