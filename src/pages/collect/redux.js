import {getAllCollectReq} from './api';
// Actions
const UPDATE = 'COLLECT_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const collect = (state = initState, action) => {
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
export const collectUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const collectInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const listData = await getAllCollectReq(params || {});
  dispatch(
    collectUpdate({
      init: true,
      data: {
        listData,
      },
    }),
  );
  callback && callback();
};
