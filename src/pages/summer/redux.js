import {queryRankingReq, queryBySelectReq, querySummerProjectReq} from './api';
// Actions
const UPDATE = 'SUMMER_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {
    allRepository: {},
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
  const {allRepository} = getState().repository._data;
  const rankArr = await queryRankingReq({});

  const res = await queryBySelectReq(params || {});

  let _res = res;
  if (allRepository.data) {
    let temp = res.data.concat(allRepository.data);
    res.data = [...temp];
    _res = res;
  }

  dispatch(
    summerUpdate({
      init: true,
      _data: {
        rankArr,
        listData: _res,
      },
    }),
  );
  callback && callback();
};
