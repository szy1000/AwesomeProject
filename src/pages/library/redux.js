import {
  getCountryReq,
  getRankReq,
  getHotSubjectReq,
  getCountrySubjectReq,
  getSubjectListReq,
} from './api';
// Actions
const UPDATE = 'LIBRARY_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    country: [],
  },
};

export const library = (state = initState, action) => {
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
export const libraryUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const libraryInit = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().library;
  const {countryId} = params;
  const country = await getCountryReq(params || {});
  const rank = await getRankReq({});
  const hotSubject = await getHotSubjectReq({
    country_id: countryId || country[0].id,
  });

  const subjectList = await getCountrySubjectReq({
    countryId: countryId || country[0].id,
  });

  subjectList.unshift({
    categoryId: -1,
    name: '热门专业',
  });

  dispatch(
    libraryUpdate({
      init: true,
      data: {
        ...data,
        country,
        subjectList,
        hotSubject,
        rank,
      },
    }),
  );
  callback && callback();
};

export const searchList = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().library;
  const subjectList = await getSubjectListReq(params);
  dispatch(
    libraryUpdate({
      data: {
        ...data,
        subjectList,
      },
    }),
  );
  callback && callback();
};
