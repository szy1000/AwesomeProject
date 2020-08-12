import {queryRankingReq, queryBySelectReq, queryCountryReq} from './api';
// Actions
const UPDATE = 'REPOSITORY_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {
    allRepository: {},
  },
};

export const repository = (state = initState, action) => {
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
export const repositoryUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const repositoryInit = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {allRepository} = getState().repository._data;
  const rankArr = await queryRankingReq({});

  const countryArr = await queryCountryReq({});
  countryArr.unshift({name: '全球', id: null});

  const res = await queryBySelectReq(params || {});

  let _res = res;
  if (!params.init && allRepository.data) {
    let temp = allRepository.data.concat(res.data);
    res.data = [...temp];
    _res = res;
  }

  console.log('allRepository', allRepository);
  dispatch(
    repositoryUpdate({
      init: true,
      _data: {
        rankArr,
        countryArr,
        allRepository: _res,
      },
    }),
  );
  callback && callback();
};
