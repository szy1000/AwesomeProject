import {getGroupDetailReq, joinGroupReq, unjoinGroupReq} from './api';
// Actions
const UPDATE = 'GROUP_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const group = (state = initState, action) => {
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
export const groupUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const group = await getGroupDetailReq(params || {});

  dispatch(
    groupUpdate({
      init: true,
      data: {
        group,
      },
    }),
  );
  callback && callback();
};

export const toggleJoin = (params, callback) => async (dispatch, getState) => {
  let res = null;
  const {isJoin, id} = params;
  console.log(params)
  if (isJoin) {
    res = await unjoinGroupReq({
      id,
    });
  } else {
    await joinGroupReq({
      id,
    });
  }
  console.log(res);
  callback && callback();
};
