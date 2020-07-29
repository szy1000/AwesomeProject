import {getBackgroundReq} from './api';
// Actions
const UPDATE = 'BACKGROUND_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    listData: {},
  },
};

export const background = (state = initState, action) => {
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
export const backgroundUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const backgroundInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  console.log('background params', params);
  const {listData} = getState().background.data;
  const res = await getBackgroundReq(params || {});
  console.log('background res', res);

  let _res = res;
  if (!params.init && listData.data) {
    let temp = res.data.concat(listData.data);
    res.data = [...temp];
    _res = res;
  }
  dispatch(
    backgroundUpdate({
      init: true,
      data: {
        listData: _res,
      },
    }),
  );
  callback && callback();
};
