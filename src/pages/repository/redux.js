import {queryRankingReq, queryBySelectReq, queryCountryReq} from './api';
// Actions
const UPDATE = 'REPOSITORY_UPDATE';

// Reducer
const initState = {
  init: false,
  _data: {},
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

export const repositoryInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const rankArr = await queryRankingReq({});
  const countryArr = await queryCountryReq({});
  const allRepository = await queryBySelectReq(params || {});

  countryArr.unshift({name: '全球', id: null});

  dispatch(
    repositoryUpdate({
      init: true,
      _data: {
        rankArr,
        countryArr,
        allRepository,
      },
    }),
  );
  callback && callback();
};
