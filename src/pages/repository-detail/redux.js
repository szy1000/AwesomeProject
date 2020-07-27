import {queryDetailReq} from './api';
// Actions
const UPDATE = 'REPOSITORY_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {},
};

export const repositoryDetail = (state = initState, action) => {
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
export const repositoryDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const repositoryDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  const detail = await queryDetailReq(params.id);

  dispatch(
    repositoryDetailUpdate({
      init: true,
      data: {
        detail,
      },
    }),
  );
  callback && callback();
};
