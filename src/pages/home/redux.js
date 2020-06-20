import {
  getCountryReq,
  getHotSchoolReq,
  getHotSubjectReq,
  getCaseReq,
} from './api';
// Actions
const UPDATE = 'HOME_UPDATE';

// Reducer
const initState = {
  init: false,
  data: [],
};

export const home = (state = initState, action) => {
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
export const homeUpdate = params => ({
  payload: params,
  type: UPDATE,
});

export const homeInit = (params, callback) => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  const country = await getCountryReq(params || {});

  const countyParams = {country_id: country[0].id};
  const hotSchool = await getHotSchoolReq(countyParams);
  const hotSubject = await getHotSubjectReq(countyParams);
  const hotCase = await getCaseReq(countyParams);
  dispatch(
    homeUpdate({
      init: true,
      data: {
        country,
        hotSchool,
        hotSubject,
        hotCase,
      },
    }),
  );
  callback && callback();
};
