// import { getHomePageReq } from './api'
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

export const homeInit = callback => async dispatch => {
  // const { init } = getState().home
  // console.log(init)
  // const data = await getHomePageReq({
  //   cmd: 'homePage',
  // });
  dispatch(
    homeUpdate({
      init: true,
      data: {
        name: 'shenzhiyong',
      },
    }),
  );
  callback && callback();
};
