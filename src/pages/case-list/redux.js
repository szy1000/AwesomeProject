import {getDegreeReq, getCaseListReq} from './api';
// Actions
const UPDATE = 'CASE_LIST_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    note: {},
  },
};

export const caseList = (state = initState, action) => {
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
export const caseListUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const caseListInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  const degree = await getDegreeReq({});
  // params.degreeId = degree[0].id;
  if (degree.length) {
    params.degreeId = degree[0].id;
  }
  console.log('params', params);
  const caseList = await getCaseListReq(params || {});
  console.log(caseList);
  // const {note} = getState().find.data;
  // const res = await getDegreeReq(params || {});
  // console.log('res', res);
  //
  // let _res = res;
  // if (note.data) {
  //   let temp = res.data.concat(note.data);
  //   res.data = [...temp];
  //   _res = res;
  // }
  dispatch(
    caseListUpdate({
      init: true,
      data: {
        degree,
        caseList,
        // note: _res,
      },
    }),
  );
  callback && callback();
};
