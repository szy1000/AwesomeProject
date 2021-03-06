import {
  getCountryReq,
  getRankReq,
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

  const subjectList = await getCountrySubjectReq({
    countryId: countryId || country[0].id,
  });

  subjectList.unshift({
    id: -1,
    name: '热门专业',
  });
  const subjectItem = await getSubjectListReq({
    countryId: countryId || country[0].id,
    hot: true,
  });

  console.log('subjectItem==>', subjectItem);
  dispatch(
    libraryUpdate({
      init: true,
      data: {
        ...data,
        country,
        subjectList,
        subjectItem,
        rank,
      },
    }),
  );
  callback && callback();
};

export const searchList = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().library;
  const country = await getCountryReq({});
  const {countryId, categoryId} = params;
  console.log('params', params);
  console.log('categoryId', categoryId);

  let hotSubject = null;
  if (categoryId === -1) {
    hotSubject = await getSubjectListReq({
      countryId: countryId || country[0].id,
      hot: true,
      query: params.query,
    });
  } else {
    hotSubject = await getSubjectListReq(params);
  }

  console.log('hotSubject', hotSubject);

  dispatch(
    libraryUpdate({
      data: {
        ...data,
        subjectItem: [...hotSubject],
      },
    }),
  );
  callback && callback();
};
