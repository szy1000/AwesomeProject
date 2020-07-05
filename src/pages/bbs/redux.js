import {getAllCategoryReq, getHotGroupReq} from './api';
// Actions
const UPDATE = 'BBS_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const bbs = (state = initState, action) => {
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
export const bbsUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const bbsInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const groupCategory = await getAllCategoryReq(params || {});
  const hotGroup = await getHotGroupReq({top: 5} || {});
  dispatch(
    bbsUpdate({
      init: true,
      data: {
        groupCategory,
        hotGroup,
      },
    }),
  );
  callback && callback();
};
