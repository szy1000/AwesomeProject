import {querySubjectDetailReq, queryInfoItemReq} from './api';
// Actions
const UPDATE = 'LIBRARY_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const libraryDetail = (state = initState, action) => {
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
export const libraryDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const libraryDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const detail = await querySubjectDetailReq(params || {});
  const infoItem = await queryInfoItemReq({
    resource: 'subject',
    resourceId: params,
  });
  console.log('infoItem', infoItem);
  dispatch(
    libraryDetailUpdate({
      init: true,
      data: {
        detail,
        infoItem,
      },
    }),
  );
  callback && callback();
};
