import {getCountryReq, getCountrySubjectReq} from './api';
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
  const country = await getCountryReq(params || {});
  const subjectList = await getCountrySubjectReq({countryId: country[0].id});
  dispatch(
    libraryUpdate({
      init: true,
      data: {
        ...data,
        country,
        subjectList,
      },
    }),
  );
  callback && callback();
};