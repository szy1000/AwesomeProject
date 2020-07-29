import {getAllCaseReq, getDegreeReq, getSubjectReq} from './api';
// Actions
const UPDATE = 'CASE_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    listData: {},
  },
};

export const cases = (state = initState, action) => {
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
export const casesUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const caseInit = (params, callback) => async (dispatch, getState) => {
  console.log('params', params);
  const {listData} = getState().cases.data;
  const res = await getAllCaseReq(params || {});
  const _degree = await getDegreeReq({});
  const _subject = await getSubjectReq({});

  console.log('res', res);

  let _res = res;
  if (!params.init && listData.data) {
    let temp = res.data.concat(listData.data);
    res.data = [...temp];
    _res = res;
  }

  dispatch(
    casesUpdate({
      init: true,
      data: {
        listData: _res,
        _degree,
        _subject,
      },
    }),
  );
  callback && callback();
};
