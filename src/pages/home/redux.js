import {getHomeReq} from './api';
// Actions
const UPDATE = 'HOME_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const home = (state = initState, action) => {
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
export const homeUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const homeInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const data = await getHomeReq(params || {});
  dispatch(
    homeUpdate({
      init: true,
      data: {
        ...data,
        name: 'shenzhiyong',
      },
    }),
  );
  callback && callback();
};
