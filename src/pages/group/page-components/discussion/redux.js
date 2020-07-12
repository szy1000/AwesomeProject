import {getGroupListReq} from './api';
// Actions
const UPDATE = 'GROUP_DISCUSSION_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const groupDiscussion = (state = initState, action) => {
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
export const groupDiscussionUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const groupDisInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const {id} = params;
  delete params.id;
  const discussion = await getGroupListReq(params, id);
  dispatch(
    groupDiscussionUpdate({
      init: true,
      data: {
        discussion,
      },
    }),
  );
  callback && callback();
};
