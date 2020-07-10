import {getDataReq} from './api';
// Actions
const UPDATE = 'MANAGE_TAB_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const manageTab = (state = initState, action) => {
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
export const manageTabUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const manageTabInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)

  const manageTab = await getDataReq(params || {});
  dispatch(
    manageTabUpdate({
      init: true,
      data: {
        manageTab,
      },
    }),
  );
  callback && callback();
};
