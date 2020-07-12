import {getGroupListReq} from './api';
// Actions
const UPDATE = 'FIX_TOP_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const fixedTop = (state = initState, action) => {
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
export const fixedTopUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const fixedTopInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const {id} = params;
  delete params.id;
  const fixedTop = await getGroupListReq(params, id);
  dispatch(
    fixedTopUpdate({
      init: true,
      data: {
        fixedTop,
      },
    }),
  );
  callback && callback();
};
