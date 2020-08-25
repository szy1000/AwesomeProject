import {
  getPosReq,
  getCountryReq,
  getHotSchoolReq,
  getHotSubjectReq,
  getCaseReq,
  queryKeywords,
  getUnreadCountReq,
} from './api';
import Tools from '../../utils/tool';
// Actions
const UPDATE = 'HOME_UPDATE';

// Reducer
const initState = {
  init: false,
  data: {
    country: [],
    hotSchool: [],
    hotSubject: [],
    hotCase: [],
  },
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

export const posInit = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().home;
  const pos = await getPosReq(params);
  const {status, result} = pos;
  if (status === 0) {
    dispatch(
      homeUpdate({
        data: {
          ...data,
          currPos: result,
          currCountry: result.address_component.nation,
        },
      }),
    );
    callback && callback();
  }
};

export const homeInit = (params, callback) => async (dispatch, getState) => {
  const {data} = getState().home;
  const {currCountry} = data;
  const country = await getCountryReq(params || {});
  console.log(country)
  let id = '';
  for (let i = 0; i < country.length; i++) {
    if (country[i].name === currCountry) {
      id = country[i].id;
    }
  }
  const countyParams = {
    country_id: params.id || id || country[0].id,
    navigation: params.navigation,
  };

  const hotSchool = await getHotSchoolReq(countyParams);
  const hotSubject = await getHotSubjectReq(countyParams);
  const hotCase = await getCaseReq(countyParams);
  let unread = 0;
  if (await Tools.isLogin()) {
    unread = await getUnreadCountReq(countyParams);
  }

  dispatch(
    homeUpdate({
      init: true,
      data: {
        ...data,
        country,
        hotSchool,
        hotSubject,
        hotCase,
        unread,
      },
    }),
  );
  callback && callback();
};

export const updateCurrCountry = (params, callback) => async (
  dispatch,
  getState,
) => {
  const {data} = getState().home;
  const {country} = data;
  let name = '';
  for (let i = 0; i < country.length; i++) {
    if (country[i].id === params.countyId) {
      name = country[i].name;
    }
  }
  dispatch(
    homeUpdate({
      data: {
        ...data,
        currCountry: name,
      },
    }),
  );
  callback && callback();
};
