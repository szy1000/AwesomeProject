import {getGroupDetailReq, getGroupListReq} from './api';
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
  console.warn('params id', params)
  const group = await getGroupDetailReq(params || {});
  const groupList = await getGroupListReq(
    {
      pageNumber: 1,
      pageSize: 10,
    },
    params,
  );
  dispatch(
    groupUpdate({
      init: true,
      data: {
        group,
        groupList,
      },
    }),
  );
  callback && callback();
};
