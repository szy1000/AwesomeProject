import {
  queryRankingReq,
  queryBySelectReq,
  getGradeReq,
  getSubjectReq,
  querySummerProjectReq,
} from './api';
// Actions
const UPDATE = 'SUMMER_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {
    listData: {},
  },
};

export const summer = (state = initState, action) => {
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
export const summerUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const summerInit = (params, callback) => async (dispatch, getState) => {
  const {listData} = getState().summer._data;
  console.log('allRepository', listData);
  const rankArr = await queryRankingReq({});
  const res = await querySummerProjectReq(params || {});
  const _subject = await getSubjectReq({});
  const _grade = await getGradeReq({});

  let _res = res;
  console.log('summer _res', _res);
  if (!params.init && listData.data) {
    let temp = listData.data.concat(res.data);
    res.data = [...temp];
    _res = res;
  }

  dispatch(
    summerUpdate({
      init: true,
      _data: {
        rankArr,
        listData: _res,
        _subject,
        _grade,
      },
    }),
  );
  callback && callback();
};
