import {getCountryReq, getHotSchoolReq, getHotSubjectReq} from './api';
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
  const hotSchool = await getHotSchoolReq({
    country_id: country[0].id,
  });
  const hotSubject = await getHotSubjectReq({
    country_id: country[0].id,
  });
  dispatch(
    homeUpdate({
      init: true,
      data: {
        country,
        hotSchool,
        hotSubject,
      },
    }),
  );
  callback && callback();
};
