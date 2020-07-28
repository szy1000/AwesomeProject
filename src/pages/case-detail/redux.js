import {queryCaseDetailReq} from './api';
// Actions
const UPDATE = 'CASE_DETAIL_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const caseDetail = (state = initState, action) => {
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
export const caseDetailUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const caseDetailInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const detail = await queryCaseDetailReq(params || {});
  dispatch(
    caseDetailUpdate({
      init: true,
      data: {
        detail,
      },
    }),
  );
  callback && callback();
};
